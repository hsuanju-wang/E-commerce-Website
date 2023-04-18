import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import appRoutes from '../../shared/appRoutes';
import './Cart.css';

const CartSummary = props => {
    const navigate = useNavigate();

    return (
        <div className='summary-div'>
            <div className='summary-box'>
                <h2>Order Summary</h2>

                <div className='summary-detail-box'>
                    <div className='summary-detail'>
                        <p className='summary-detail-title'>Subtotal: </p>
                        <p className='summary-detail-number'>${ props.subtotal == 0 ? "0.00" : props.subtotal}</p>
                    </div>
                    <div className='summary-detail'>
                        <p className='summary-detail-title'>Est. Shipping: </p>
                        <p className='summary-detail-number'>${ props.subtotal == 0 ? "0.00" : 6.25}</p>
                    </div>
                    <div className='summary-detail'>
                        <p className='summary-total'>Total </p>
                        <p className='summary-total-number'>${ props.subtotal == 0 ? "0.00" : (parseFloat(props.subtotal) + 6.95).toFixed(2)}</p>
                    </div>
                </div>                         
                <div className="cart-button summary-button" onClick={() => navigate(appRoutes.NotImplement)}>
                            Log in and Checkout
                </div>
            </div>
            <div className='summary-bottom-div'>
                <div className="cart-button summary-button" onClick={() => navigate(appRoutes.TShirts)}>
                                Continue Shopping
                </div>
            </div>

        </div>
    )
}

export default CartSummary;