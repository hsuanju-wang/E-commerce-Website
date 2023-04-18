import React, { useState, useEffect} from 'react';
import './NotImplement.css';
import ScottyShirtImg from '../../assets/images/scotty.png';

function SetTitle() {
    useEffect(() => {
      document.title = 'SSUI HW1 - Not Implemented';
    });
}

const NotImplement = () =>  {
    return (
        <div className="content-center not-imp-content">
            <img src={ScottyShirtImg}/>
            <p>Oops, this page doesn't exist yet... how about a shirt from the last page?</p> 
        </div>  
    )
}
export default NotImplement;