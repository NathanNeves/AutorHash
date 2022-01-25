import React from 'react';

function Select({options,onChange,value}){
    
    
    return(
        <select onChange={onChange} value={value} class="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="animals">
            {options.map((option)=>(
                <option value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}

export default Select;