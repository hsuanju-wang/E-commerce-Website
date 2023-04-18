import React, { useState } from 'react';
import './Home.css';
import BannerImg from '../../assets/images/banner.png';

const Home = () =>  {
    return (
        <div id='home'>
            <div id="hero">
                <img src={BannerImg} id="hero-img"/>
            </div> 
            
            <div className="home-container">
                <div className="home-contentBox">
                <h2>We don't ship. We're not real.</h2>
                <p>We sell shirts. We are passionate about selling shirts. 
                    But keep in mind we have no infrastructure, supply chain, 
                    or mechanism to actually produce these shirts or fullfill the orders.
                    But the shirts will always be real in your imagination. </p>
                </div>
                <div className="home-contentBox">
                <h2>Design your own shirt! But help us do that...</h2>
                <p>Not only do we not sell shirts, but we let you design your own! 
                    Eventually. We actually kinda need your help implementing that. 
                    If you could build an actual paint-style interface that you can make design in 
                    that would be great :)</p>
                </div>
            </div> 
        </div> 
    )
}
export default Home;