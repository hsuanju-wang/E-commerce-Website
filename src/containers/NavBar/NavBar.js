import React, { useState } from 'react';
import appRoutes from '../../shared/appRoutes';
import './NavBar.css';
import { Link } from 'react-router-dom'

const NavBar = (props) =>  {


    return (
        <nav className="nav-menu">
            <ul>
            <li><Link to={appRoutes.TShirts}>T-Shirts</Link></li>
            <li><Link to={appRoutes.CreateFromPicture}>Create From Picture</Link></li>
            <li><Link to={appRoutes.NotImplement}>Create Your Own</Link></li>
            <li><Link to={appRoutes.NotImplement}>About Us</Link></li>
            {props.currentUser == undefined
                ? <li><Link to={appRoutes.LogIn}>Log In</Link></li>
                : <li><Link to={appRoutes.LogIn}>{props.currentUser.displayName}</Link></li>
            }
            </ul>
        </nav>      
    )
}
export default NavBar;