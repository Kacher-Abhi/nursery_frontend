'use client'
import { useState } from "react"

export const LoginFormInput =({label, inputField, setInputField,name, type, requiredField=false})=>{
    const {erros, setErrors} = useState(null);


    
    return(
        <>
            <label className="block mb-2">
                {label}:
                <input
                    type={type}
                    value={inputField}
                    name={name}
                    onChange={(e) => handleFieldChange(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
            </label>
            {errors && <div>{errors.map((error)=>(<div key={error.id}>{error.message}</div>))}</div>}
        </>
    )
}