import React, { useState, useEffect } from 'react';
import './Products.css';
import appRoutes from '../../shared/appRoutes';
import {default as Shirts} from '../../shared/shirts';
import PopUp from './PopUp';
import { Link } from 'react-router-dom'



const Products = () =>  {
    // const [popUpisOpen, setIsOpen] = useState(false);
    let shirtIndex = 0;
    let popUpisOpen = false;
    const [popUpValues, setPopUpValues] = useState({
        popUpisOpen: popUpisOpen,
        shirtFrontImgUrl: "",
        shirtBackImgUrl: "",
        productName: "",
        price: "",
        description: "",
    });

    const togglePopup = () => {
        popUpisOpen = !popUpisOpen;
        setPopUpValues({
            popUpisOpen:!popUpisOpen
        });
    }

    const imgBtnClicked = (productIndex) =>  {
        localStorage.setItem("productIndex", productIndex);
        document.location.href = appRoutes.Details;
    }

    const detailClicked = (productIndex) =>  {
        localStorage.setItem("productIndex", productIndex);
        console.log(productIndex);
    }

    const SetPopUpValues = (index) => {
        shirtIndex =  parseInt(index);
        setPopUpValues({
            popUpisOpen: !popUpisOpen,
            shirtFrontImgUrl: Shirts[shirtIndex].colors["white"]["front"],
            shirtBackImgUrl: Shirts[shirtIndex].colors["white"]["back"],
            productName: Shirts[shirtIndex].name,
            price: Shirts[shirtIndex].price,
            description: Shirts[shirtIndex].description,
        });
    }

    return (
        <div className="product-container products-section" id="products">
            <h1>Our T-Shirts</h1>
            {
                Shirts.map((shirt, index) => {
                    return (
                        <div className="product-box" key={shirt.id}>
                            <Link to={appRoutes.Details} onMouseOver={() => detailClicked(index)}>
                                <img src={shirt.colors.white.front} className="product-img"/>
                            </Link>
                            <h2 className="product-name">{shirt.name}</h2>
                            <p className="product-color">Available in {Object.keys(shirt.colors).length} colors</p>
                            <div className="product-btn-div">
                                <div className="product-btn" onClick = {() => SetPopUpValues(index)} >
                                    <p>Quick View</p>
                                </div>
                                <div className="product-btn">
                                    <Link to={appRoutes.Details} onMouseOver={() => detailClicked(index)}>See Page</Link>
                                </div>
                            </div>
                        </div>
                    ) 
                })
            }

            {popUpValues.popUpisOpen && <PopUp
                imgFrontUrl = {popUpValues.shirtFrontImgUrl}
                imgBackUrl = {popUpValues.shirtBackImgUrl}
                productName = {popUpValues.productName}
                price = {popUpValues.price}
                description = {popUpValues.description}
                handleClose={togglePopup}
            />}
        </div>    
    );
};
export default Products;