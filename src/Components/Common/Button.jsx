import React from 'react'

function Button({
  type="button",
  children,
  className="",
  bgColor,
}) {
  return (
   <button className={`h-8 ${className} ${bgColor}`} type={type} >
    {children}
   </button>
  )
}

export default Button
