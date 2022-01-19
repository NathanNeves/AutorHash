import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Pages/App';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Login from './Pages/Login';
import Painel from './Pages/Painel';
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/painel/*" element={<Painel/>} />
    </Routes>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
