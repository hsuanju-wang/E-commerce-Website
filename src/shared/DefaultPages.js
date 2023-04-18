import React from 'react';
import NavBar from '../containers/NavBar/NavBar';
import Header from '../containers/Header/Header';
import Footer from '../containers/Footer/Footer';
import { Outlet } from 'react-router';

export default props => {
  return (
    <>
      <Header totalQuantity = {props.totalQuantity}/>
      <NavBar currentUser = {props.currentUser}/>
      <Outlet />

      <Footer />
    </>
  );
};