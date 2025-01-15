import React from 'react'

function Button({
  type="button",
  children,
  className="",
  bgColor,
  disabled,
  onClick = ()=>{}
}) {
  return (
   <button className={`h-8 ${className} ${bgColor}`} type={type} onClick={onClick}
   disabled={disabled}>
    {children}
   </button>
  )
}

export default Button
