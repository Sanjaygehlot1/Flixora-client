import React from 'react'

function Logo() {
  return (
    <div>
    <svg width="150" height="60" viewBox="0 0 150 60" xmlns="http://www.w3.org/2000/svg" fill="none">
  <rect width="150" height="60" fill="#1f2937"/>
  
  <path d="M26 15 h50 v6 a5 5 0 0 1 -5 5 h-40 a5 5 0 0 1 -5 -5 v-6 Z" fill="red"/>
  
  <path d="M50 30 v20 a4 4 0 0 1 -4 4 h-6 v-24 Z" fill="red"/>
  
  <polygon points="53,32 67,32 53,48" fill="red"/>
  
  <text x="80" y="45" fill="white" font-family="Poppins" font-size="20" font-weight="bold">Flixora</text>
</svg>



    </div>
  )
}

export default Logo
