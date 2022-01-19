import React,{useState,useEffect, Children} from 'react';
function Card({head,children,style,fullImage,className}){
    return(
        <div style={style} className={className ? "h-28 flex flex-col rounded shadow-sm w-80 h-56 mt-40 dark:bg-gray-900 "+className : "h-28 flex flex-col rounded shadow-sm w-80 h-56 mt-40 dark:bg-gray-900"}>
            <div className="p-5 head">
                <span className="text-white font-bold">{head}</span>
            </div>
            <span className={fullImage ? "text-center body"  : " p-5 text-center body" }>
                {children}
            </span>
        </div>
   
    );
}

export default Card;