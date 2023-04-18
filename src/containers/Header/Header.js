import React, { useEffect, useState } from 'react';
import appRoutes from '../../shared/appRoutes';
import './Header.css';
import LogoImg from '../../assets/images/logo.png';
import CartImg from '../../assets/images/cart.png';
import { Link } from 'react-router-dom'

const Header = props =>  {
    return (
        <header id="header">
            <div id="headline-div">
            <Link to={appRoutes.Home} id="logo"><img src={LogoImg} id="logo-img"/></Link>
            <h1 id="headline">Scotty Shirts U Illustrate (SSUI)</h1>
            <Link to={appRoutes.Cart} id="cart">
                <div id="cart-btn">
                    <img src={CartImg} id="cart-logo"/>
                    <span id="cart-count">{props.totalQuantity}</span>  
                </div>       
            </Link>
            </div>
        </header>    
    )
}
export default Header;