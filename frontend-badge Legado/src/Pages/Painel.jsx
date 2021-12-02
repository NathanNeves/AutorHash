import React,{useState,useEffect} from 'react';
import SideBar from '../components/Sidebar';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import Main from './AuthenticatedArea/Main';
import HackerCoin from './AuthenticatedArea/HackerCoin';
function Painel(){

    return(
        <div className="w-full h-full flex">
            <SideBar/>
            <div>
                <Routes>
                    <Route index element={<Main/>}  />
                    <Route path="/store" exact element={<HackerCoin/>}  />
                </Routes>
            </div>
        </div>
    );


}


export default Painel;