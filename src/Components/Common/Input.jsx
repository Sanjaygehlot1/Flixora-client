import React, { useId } from 'react'

function Input({
    placeholder,
    label,
    className = "",
    type = "text",
    onchange=()=>{},
    ...props
},ref) {
    const id = useId()
    return (
        <div className="w-full flex flex-col items-start">
            {label && (
                <label className="inline-block mb-1 pl-1 text-gray-300" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                
                type={type}
                placeholder={placeholder}
                className={`px-3 py-2 bg-[#0E0F0F] text-white outline-none focus:bg-[#222222] duration-200 border border-slate-600 w-full ${className}`}
                {...props}
                ref={ref}
                id={id}
                onChange={onchange}
            />
        </div>
    );
}

export default React.forwardRef(Input)
