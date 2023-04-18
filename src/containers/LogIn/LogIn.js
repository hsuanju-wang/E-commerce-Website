import React, { useState, useEffect } from 'react';
import appRoutes from '../../shared/appRoutes';

import GoogleImg from '../../assets/images/google-logo.png';
import app from '../../index';
import './LogIn.css';

const LogIn = (props) =>  {
    function LogInButton() {
        return (
            <button className='logInBtn' id='logInBtn' onClick={() => props.logIn()}>
                <img src={GoogleImg} id="google-logo"/>
                <p>Log In with Google</p>
            </button>
        );
    }

    function LogOutButton() {
        return (
            <button className='logInBtn' id='logOutBtn' onClick={() => props.logOut()}>
                <img src={GoogleImg} id="google-logo"/>
                <p>Log Out as {props.currentUser.displayName}</p>
            </button>  
        );
    }

    return (
        <div className='logInContainer'>
            {props.currentUser!= undefined
                ? <LogOutButton />
                : <LogInButton />
            }
        </div>     
    )
}
export default LogIn;
