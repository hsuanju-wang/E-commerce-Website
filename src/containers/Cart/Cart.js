
import React, { useState, useEffect} from 'react';
import './Cart.css';
import ImageTest from '../../assets/shirt_images/beepboop-blue-front.png';
import {default as Shirts} from '../../shared/shirts';
import {default as shirtSizes} from '../Details/ShirtSize';
import CartSummary from './CartSummary';
import shirtBaseImg from '../../assets/images/shirt-base.png'

const Cart = props => {

    const HandleQuantityChange = (e, index) => {
        let newCart = props.cart;
        newCart[index].quantity = e.target.value;
        if(props.currentUser == undefined){
            SetLocalStorage(newCart);
        }
        else{
            props.updateDbCart(props.cart[index].id, Object.assign({}, newCart[index]));
        }
    }

    const HandleSizeChange = (e, index) => {
        let newCart = props.cart;
        newCart[index].size = e.target.value;

        if(props.currentUser == undefined){
            SetLocalStorage(newCart);
        }
        else{
            props.updateDbCart(props.cart[index].id, Object.assign({}, newCart[index]));
        }

    };

    const HandleColorChange = (e, index) => {
        let newCart = props.cart;
        newCart[index].shirtColor = e.target.value;
        newCart[index].shirtDetailImg = Shirts[props.cart[index].productIndex].colors[e.target.value]["front"];
        if(props.currentUser == undefined){
            SetLocalStorage(newCart);            
        }
        else{
            props.updateDbCart(props.cart[index].id, Object.assign({}, newCart[index]));
        }
    };

    const HandleRemove = (index) => {
        let newCart = props.cart;
        if(newCart.length == 1){
            newCart = null;
        }
        else{
            newCart.splice(index, 1);
        }
        if(props.currentUser == undefined){
            SetLocalStorage(newCart);           
        }
        else{
            console.log(props.cart);
            console.log(index);
            props.removeDbCart(props.cart[index].id);
        }
        //props.setTotalQuantity(CountQuantity());
    }

    const SetLocalStorage = (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        props.setNewCart(); 
    }

    return (
        <div className="product-container products-section" >
            <h1 id="product-name">My Cart (<span id='titleCartCount'>{props.totalQuantity}</span>)</h1>
            <div className='cart-content-box'>
                <div className='cart-product-div'>
                    { 
                        (() => {
                            if (props.totalQuantity === 0 ) {
                                return( <h2 id='cartEmptyTxt'>Your Cart is Empty.</h2>);
                            }
                            else {
                                let products = [];
                                return props.cart.map((product, index) => {
                                    return (
                                        <div className='cart-product-box'>
                                            <h2 className='cart-product-name'>{product.name}</h2>
                                            <div className='cart-detail-content'>
                                                {
                                                    (() => {
                                                        if(product.hasOwnProperty('shirtColor')){
                                                            return(
                                                                <img src={product.shirtDetailImg} className='cart-product-img'></img>                                                   
                                                            )
                                                        }
                                                        else{
                                                            return(
                                                                <div className='shirtImgBox'>
                                                                    <img src={shirtBaseImg} className='baseshirtImg2'></img>
                                                                    <img src={product.shirtDetailImg} className='onShirt-Img2'></img>
                                                                </div>                                               
                                                            )
                                                        }
                                                    })()
                                                }                                                
                                                <div className='cart-detail-box'>
                                                    <div className='cart-detail'>
                                                        <p>Quantity: </p>
                                                        <select name="quantity" className="quantity" value={product.quantity} onChange={ (e) => HandleQuantityChange(e, index)} >
                                                        {
                                                            (() => {
                                                                let options = [];
                                                                for(let i = 1; i < 21; i++){
                                                                    options.push(<option value={i}>{i}</option>);
                                                                }
                                                                return options;
                                                            })()
                                                        }
                                                        </select>
                                                    </div>
                                                    {
                                                        (() => {
                                                            if(product.hasOwnProperty('shirtColor')){
                                                                return(
                                                                    <div className='cart-detail'>
                                                                        <p>Color:</p>
                                                                        <select name="color" className="color" value={product.shirtColor} onChange={ (e) => HandleColorChange(e, index)} >
                                                                        {
                                                                            Object.entries(Shirts[product.productIndex].colors).map(([key, val]) => {
                                                                                return (
                                                                                    <option value={key}>{key}</option>
                                                                                )     
                                                                            })
                                                                        }
                                                                        </select>
                                                                    </div>                                                    
                                                                )
                                                            }
                                                        })()
                                                    }

                                                    <div className='cart-detail'>
                                                        <p>Size:</p>
                                                        <select name="size" className="size" value={product.size} onChange={ (e) => HandleSizeChange(e, index)}>
                                                        {
                                                            shirtSizes.map((size, index) => {
                                                                return (<option value={size} className="sizeOption">{size}</option>);
                                                            })
                                                        }
                                                        </select>
                                                    </div>
                                                    <div className='cart-detail'>
                                                        <p>Price (each):</p>
                                                        <p className='price'>{product.price}</p>
                                                    </div>
                                                    <div className="cart-button cart-product-button" onClick={ () => HandleRemove(index)}>
                                                        Remove
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })

                                return products;
                            }                                
                        })()                       
                    } 

                </div>

                {
                    <CartSummary subtotal = {props.Subtotal}/>
                }
            </div>
        </div>
    );
};
 
export default Cart;