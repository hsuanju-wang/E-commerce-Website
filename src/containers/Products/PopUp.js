
import React, { useState } from 'react';
import './PopUp.css';
 
const Popup = props => {
  return (
        <div id="quick-view" className="quick-view">
            <div className="quick-view-box">
            <span className="close-btn" onClick={props.handleClose}>&times;</span>
            <div className="quick-view-imgs" id="quick-view-imgs">
                <img src={props.imgFrontUrl} id="quick-view-imgF"/>
                <img src={props.imgBackUrl} id="quick-view-imgB"/>        
            </div> 
            <div className="quick-view-content">
                <h1 id="quick-view-product-name">{props.productName}</h1>
                <h2 id="quick-view-price"> {props.price} </h2>
                <p id="quick-view-description"> {props.description}</p>         
            </div>              
            </div>
        </div>
  );
};
 
export default Popup;