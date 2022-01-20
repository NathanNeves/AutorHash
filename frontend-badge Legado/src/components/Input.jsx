import React,{useState,useEffect} from 'react';
function Input({value,onChange,placeholder}){
    return(
        <div className=" relative ">
            <input type="text"  className=" flex-1 rounded appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" value={value} onChange={onChange} placeholder={placeholder}/>
        </div>
   
    );
}

export default Input;