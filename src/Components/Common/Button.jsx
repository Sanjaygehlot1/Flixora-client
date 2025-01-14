import React from 'react'

function Button({
  type="button",
  children,
  className="",
  bgColor,
  onClick = ()=>{}
}) {
  return (
   <button className={`h-8 ${className} ${bgColor}`} type={type} onClick={onClick}>
    {children}
   </button>
  )
}

export default Button
