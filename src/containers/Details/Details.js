import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './Details.css';
import '../Products/Products.css';
import appRoutes from '../../shared/appRoutes';
import {default as Shirts} from '../../shared/shirts';
import {default as shirtSizes} from './ShirtSize';


const Details = props => {
    let productIndex =  localStorage.getItem("productIndex");
    const [shirtDetail, setShirtDetail] = useState({
        productIndex: productIndex,
        shirtDetailImg: Shirts[productIndex].colors["white"]["front"],
        shirtColor:  "white",
        shirtSide: "front",
        quantity: 1,
        size: "Size",
        price: Shirts[productIndex].price,
        name: Shirts[productIndex].name,
        sizeValueSet: false, // AddToCartBtn 
    });   


    const navigate = useNavigate();

    useEffect(() => {
    },[]);

    const SideBtnClicked = (side) => {
        setShirtDetail({ 
            ...shirtDetail,
            shirtSide: side,
            shirtDetailImg: Shirts[productIndex].colors[shirtDetail.shirtColor][side]
        });
    }
    
    const ColorBtnClicked = (color) => {
        console.log(color);
        setShirtDetail({
            ...shirtDetail,
            shirtColor: color,
            shirtDetailImg: Shirts[productIndex].colors[color][shirtDetail.shirtSide]
        });
    }

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
        <div className="product-container products-section" id="products">
            <h1 id="product-name">{Shirts[productIndex].name}</h1>
            <div id="product-detail-container">
                <img src={shirtDetail.shirtDetailImg} id="shirt-img"/>

                <div id="product-detail-content">
                    <h2 id="price">{Shirts[productIndex].price}</h2>
                    <p id="product-description"> {Shirts[productIndex].description}</p>
                    <div id="side-btns" className="product-detail-btns">
                        <p>Side: </p>
                        <div id="front-btn" onClick={() => SideBtnClicked("front")}>Front</div>
                        <div id="back-btn" onClick={() => SideBtnClicked("back")}>Back</div>
                    </div>
                    <div id="color-btns-div" className="product-detail-btns">
                        <p>Color: </p>
                        {
                            Object.entries(Shirts[productIndex].colors).map(([key, val]) => {
                                return (
                                    <div className="color-btn" style={{"backgroundColor": key}} key={key.id} onClick={() => ColorBtnClicked(key)}>{Capitalize(key)}</div>
                                )
                                    
                            })
                        }
                    </div>
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
                    <div id="addToCart-div" className="product-detail-btns">
                        <div id="addToCartBtn" className={shirtDetail.sizeValueSet ? '' : 'greyOutBtn'} onClick = {()=> shirtDetail.sizeValueSet ? AddCart() : undefined}>Add to cart</div>
                    </div>
                </div> 
            </div>  
        </div>
    );
};
 
export default Details;