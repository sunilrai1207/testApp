import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; 
import "./assets/css/header.css";
import "./assets/css/footer.css";
import "./assets/css/common.css" 
import { Provider } from 'react-redux';
import store from "./components/redux/store"
ReactDOM.render(
   
    <Provider store={store}> 
    <App />
    </Provider>
 ,
  document.getElementById('root')
);
reportWebVitals();
