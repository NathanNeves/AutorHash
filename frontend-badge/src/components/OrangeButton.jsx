import React,{useEffect,useState} from "react";

function OrangeButton({disabled,onClick,children,style,className}){
    return (
        <button type="button" disabled={disabled}  style={style} onClick={onClick} className={"py-2 px-4 inline-flex items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70 rounded-lg "}>
            {children}
        </button>
    );
}

export default OrangeButton;