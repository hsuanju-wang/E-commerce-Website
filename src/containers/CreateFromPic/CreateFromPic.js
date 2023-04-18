import React, { useState } from 'react';
import './CreateFromPic.css';
import { Link } from 'react-router-dom'
import shirtBaseImg from '../../assets/images/shirt-base.png'
import {default as shirtSizes} from '../Details/ShirtSize';
import scottyImg from '../../assets/images/scotty.png';
import scottyImg2 from '../../assets/images/scotty-2.png';
import scottyImg3 from '../../assets/images/scotty-3.png';
import scottyImg4 from '../../assets/images/scotty-4.png';
import scottyImg5 from '../../assets/images/scotty-5.png';
import {useNavigate} from 'react-router-dom';
import appRoutes from '../../shared/appRoutes';

const CreateFromPic = props =>  {
    const [shirtDetail, setShirtDetail] = useState({
        shirtDetailImg: undefined,
        quantity: 1,
        size: "Size",
        price: "$20.00",
        name: "Scotty", // search name
        sizeValueSet: false, // AddToCartBtn 
    }); 

    const [searchInput, setSearchInput] = useState(undefined); 
    const [searchResult, setSearchResult] = useState(undefined); 
    const shirtPrice = "$20.00";

    const navigate = useNavigate();
    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const HandleSizeChange = (e) => {
        let sizeValueSet = false;
        if(e.target.value != "Size"){
            sizeValueSet = true;
        }
        setShirtDetail({
            ...shirtDetail,
            size: e.target.value,
            sizeValueSet: sizeValueSet
        });
    };

    const HandleQuantityChange = (e) => {
        setShirtDetail({
            ...shirtDetail,
            quantity: e.target.value
        });
    };
    
    const SelectedImg = (url) => {
        console.log(url);
        setShirtDetail({
            ...shirtDetail,
            shirtDetailImg: url
        });
    };

    const searchBtnClick = () => {
        //console.log(props.getImages(searchInput));
        props.getImages(searchInput).then((d)=>{
            setSearchResult(d);
            if(d.length == 0){
                setShirtDetail({
                    ...shirtDetail,
                    name: "scotty"
                });            
            }
            else{
                setShirtDetail({
                    ...shirtDetail,
                    name: searchInput
                });
            }
        })
    }

    const handleInputChange = (e) =>{
        setSearchInput(e.target.value);
    }


    const AddCart = (e) => {
        if(props.currentUser != undefined){
            props.addToRomoteDb(shirtDetail);
        }
        else {
            var newTotal = parseInt(props.totalQuantity) + parseInt(shirtDetail.quantity);
            props.setTotalQuantity(newTotal);
            var cartArray = JSON.parse(localStorage.getItem("cart"));
            if(cartArray == null){
                cartArray = [];
            }
            cartArray.push(shirtDetail);
            localStorage.setItem('cart', JSON.stringify(cartArray));
            props.setNewCart();
        }
        navigate(appRoutes.Cart);

    };

    return (
        <div className='content-container'>
            <div className='shirt-container'>
                <div className='shirtImgBox'>
                    <img src={shirtBaseImg} className='baseshirtImg'></img>
                    { shirtDetail.shirtDetailImg!=undefined && <img src={shirtDetail.shirtDetailImg} className='onShirt-Img'></img>}
                </div>
                <p className='price'>{shirtPrice}</p>
                <div id="quantity-div" className="product-detail-btns">
                    <p>Quantity: </p>
                    <select name="quantity" id="quantity" onChange={ (e) => HandleQuantityChange(e)} >
                        {
                            (() => {
                                let options = [];
                                for(let i = 1; i < 21; i++){
                                    options.push(<option value={i} className="quantityOption">{i}</option>);
                                }
                                return options;
                            })()
                        }
                    </select>
                </div>
                <div id="quantity-div" className="product-detail-btns">
                    <p>Size: </p>
                    <select name="size" id="size" onChange={ (e) => HandleSizeChange(e)}>
                        {
                            (() => {
                                let options = [];
                                shirtSizes.map((size, index) => {
                                    options.push(<option value={size} className="sizeOption">{size}</option>);
                                })
                                return options;
                            })()
                        }
                    </select>
                </div>
                <div id="addToCart-div2" className="product-detail-btns">
                        <div id="addToCartBtn2" className={shirtDetail.sizeValueSet && shirtDetail.shirtDetailImg!=undefined ? '' : 'greyOutBtn'} onClick = {()=> shirtDetail.sizeValueSet ? AddCart() : undefined}>Add to cart</div>
                </div>
            </div>
            <div className='search-container'>
                <input type="text" placeholder="Type something..." id="searchInput" onChange={ (e) => handleInputChange(e) }/>
                <button type="button" id='searchButton' onClick={ () => searchBtnClick()}>Search</button>
                <div id='searchResultArea'>
                    {
                        (() =>{
                            if(searchResult != undefined){

                                if(Object.keys(searchResult).length == 0){
                                    return(
                                        <div>
                                            <p>No Search results. Maybe use a scotty.</p>
                                            <img src={scottyImg} onClick={ (e) => SelectedImg(scottyImg)}></img>
                                            <img src={scottyImg2} onClick={ (e) => SelectedImg(scottyImg2)}></img>
                                            <img src={scottyImg3} onClick={ (e) => SelectedImg(scottyImg3)}></img>
                                            <img src={scottyImg4} onClick={ (e) => SelectedImg(scottyImg4)}></img>
                                            <img src={scottyImg5} onClick={ (e) => SelectedImg(scottyImg5)}></img>
                                        </div>
                                    )
                                }
                                else{
                                    let imgs = [];
                                    searchResult.map((r)=>{
                                        imgs.push(<img src={r.urls.raw} onClick={ (e) => SelectedImg(e.target.src)}></img>);
                                    });
                                    return   imgs;                                    
                                }

                            }
                        })()  
                    }
                </div>
            </div>

        </div>
    )
}
export default CreateFromPic;