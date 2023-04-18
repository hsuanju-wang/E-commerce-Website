import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import appRoutes from './shared/appRoutes';
import DefaultPages from './shared/DefaultPages';
import NoLayoutPages from './shared/NoLayoutPages';

import Products from './containers/Products/Products';
import Details from './containers/Details/Details';
import Home from './containers/Home/Home';
import NotImplement from './containers/NotImplement/NotImplement';
import Cart from './containers/Cart/Cart';
import LogIn from './containers/LogIn/LogIn';
import CreateFromPic from './containers/CreateFromPic/CreateFromPic';
import './App.css';
import { getAuth, signInWithPopup,signOut, GoogleAuthProvider} from "firebase/auth";
import { collection, getDocs, getFirestore, doc, setDoc, serverTimestamp, query, where, updateDoc, deleteDoc} from "firebase/firestore/lite";

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


const UNSPLASH_API_KEY = process.env.REACT_APP_API_KEY_UNSPLASH_API_KEY;
function App(props) {

  const navigate = useNavigate();

  //let cart = JSON.parse(localStorage.getItem("cart"));
  const [totalQuantity, setTotalQuantity] = useState();
  const [Subtotal, setSubtotal] = useState();

  // Backend stuff
  const [currentUser, setCurrentUser] = useState(undefined); 
  const [cart, setCart] = useState();
  const db = getFirestore(props.app);
  const auth = getAuth(props.app);

  useEffect(() => {
    document.title = 'SSUI';
    setNewCart();
  }, []);

  useEffect(() => {
    setNewCart();
  }, [currentUser]);

  useEffect(() => {
    console.log(cart);
    console.log(totalQuantity)
  }, [cart]);

  const provider = new GoogleAuthProvider();

  async function getShoppingCartItem(prop){
    const col = collection(db, "ShoppingCartItems");
    const q = query(col, where("userId", "==", prop.uid));
    return await getDocs(q);
  }

  function logIn(){
    signInWithPopup(auth, provider)
      .then((result) => {
        setCurrentUser(auth.currentUser);
        navigate(appRoutes.Home);
        setNewCart();
      })
      .catch((error)=> {})
  }

  function logOut(){
    signOut(auth).then(() => {
      setCurrentUser(undefined);
    }).catch((error) => {
      // An error happened.
    });
  }

  function setNewCart(){
    console.log("set new cart");
    //let cartItem;
    //console.log("currentUser: " + currentUser.uid);
    //console.log("authcurrentUser: " + auth.currentUser.uid);
    if(currentUser != undefined){
      getShoppingCartItem(auth.currentUser).then((d) => {
          let cartItem = d.docs.map((d) =>{
          const data = d.data();
          const id = d.id;
          return { id, ...data };
        });
        console.log(cartItem);
        setCart(cartItem);
        countTotalQuantity(cartItem);
        countSubTotal(cartItem);
      })
    }
    else {
      let localCartItem = JSON.parse(localStorage.getItem("cart"));
      setCart(localCartItem);
      countTotalQuantity(localCartItem);
      countSubTotal(localCartItem);
    }
  }

  function countTotalQuantity(cartItem){
    if(cartItem != null){
      setTotalQuantity(cartItem.reduce((sum, product) =>  sum = sum + parseInt(product.quantity), 0 ));
    }
    else{
      setTotalQuantity(0);
    }
  }

  function countSubTotal(cartItem){
    if(cartItem != null){
      setSubtotal(cartItem.reduce((sum, product) =>  sum = sum + parseFloat(product.price.slice(1)) * parseInt(product.quantity), 0 ).toFixed(2));
    }
    else{
      setSubtotal(0);
    }
  }

  let cartItemRef = doc(collection(db, "ShoppingCartItems")); 

  async function addToRomoteDb(cartItem){
    let newCartItem = {
      ...cartItem,
      userId: currentUser.uid,
      timeStamp: serverTimestamp()
    }
    await setDoc(cartItemRef, newCartItem);
    setNewCart();
  }

  async function updateDbCart(id, newCart){
    console.log(newCart);
    const ref = doc(db, "ShoppingCartItems", id);
    await updateDoc(ref, newCart);
    setNewCart();
  }

  async function removeDbCart(id){
    const ref = doc(db, "ShoppingCartItems", id);
    await deleteDoc(ref);
    setNewCart();
  }

  async function getImages(input){
    console.log(UNSPLASH_API_KEY.toString());
    let res = await fetch(
      "https://api.unsplash.com/search/photos?page=1&query="+input+"&client_id=" + UNSPLASH_API_KEY.toString()
    )
    let data = await res.json();
    console.log(data.results);
    return data.results;
  }
 
  return (
    <div className='App'>
        <Routes>
          <Route element={<DefaultPages totalQuantity = {totalQuantity} currentUser = {currentUser}/>}>
            <Route path={appRoutes.NotImplement} element={<NotImplement />} />
            <Route path={appRoutes.Home} element={<Home />} />
            <Route path={appRoutes.TShirts} element={<Products />} />
            <Route path={appRoutes.Details} 
                   element={<Details 
                                setTotalQuantity = {setTotalQuantity} 
                                totalQuantity = {totalQuantity}
                                Subtotal = {Subtotal} 
                                addToRomoteDb = {addToRomoteDb}
                                setNewCart = {setNewCart}
                                currentUser = {currentUser} />} />
            <Route path={appRoutes.Cart} 
                   element={<Cart 
                                setTotalQuantity = {setTotalQuantity} 
                                totalQuantity = {totalQuantity} 
                                cart = {cart}
                                setCart = {setCart}
                                Subtotal = {Subtotal} 
                                currentUser = {currentUser}
                                updateDbCart = {updateDbCart}
                                setNewCart = {setNewCart}
                                removeDbCart = {removeDbCart}/>} />
            <Route path={appRoutes.LogIn} element={<LogIn logIn = {logIn} logOut = {logOut} currentUser = {currentUser}/>} />
            <Route path={appRoutes.CreateFromPicture} 
                   element={<CreateFromPic
                                setTotalQuantity = {setTotalQuantity} 
                                totalQuantity = {totalQuantity}
                                Subtotal = {Subtotal} 
                                addToRomoteDb = {addToRomoteDb}
                                setNewCart = {setNewCart}
                                currentUser = {currentUser} 
                                getImages ={getImages}/>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
