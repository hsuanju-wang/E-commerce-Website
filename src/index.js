import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { getAuth} from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2PNA0p4vrNkBi1jSA9__eRfXmot6vQcA",
  authDomain: "ssui-hw6-60c72.firebaseapp.com",
  projectId: "ssui-hw6-60c72",
  storageBucket: "ssui-hw6-60c72.appspot.com",
  messagingSenderId: "110596676401",
  appId: "1:110596676401:web:c87c77c6ddb9f3bec6ee10"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();
//const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App app = {app}/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
