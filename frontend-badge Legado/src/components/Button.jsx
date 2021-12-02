import React,{useEffect,useState} from "react";

function Button({disabled,onClick,children,style,className,type}){
    return (
        <button type={type ? type : "button"} disabled={disabled}  style={style} onClick={onClick} className={"py-2 px-4 inline-flex items-center dark:bg-purple-800 bg-blue-600 hover:bg-blue-700 dark:hover:bg-purple-900 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70 rounded-lg "}>
            {children}
        </button>
    );
}

export default Button;