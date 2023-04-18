import React, { useState } from 'react';
import appRoutes from '../../shared/appRoutes';
import './Footer.css';
import { Link } from 'react-router-dom'

const Footer = () =>  {
    return (
        <footer id="footer"> 
            <ul>
            <li><Link to={appRoutes.NotImplement}>Contact Us</Link></li>
            <li><Link to={appRoutes.NotImplement}>Site Map</Link></li>
            <li><Link to={appRoutes.NotImplement}>Privacy Policy</Link></li>
            <li><Link to={appRoutes.NotImplement}>Careers</Link></li>
            <li><Link to={appRoutes.NotImplement}>Reviews</Link></li>
            <li>Designed by Phoebe Wang</li>
            </ul>
        </footer>   
    )
}
export default Footer;