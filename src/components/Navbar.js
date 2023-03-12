import { useRouter } from 'next/router'
import React, { useState } from 'react'




const Navbar = (nama,signOut) => {
  
  return (
    <>
    <h1>Hello, {nama}</h1>
      <button onClick={signOut} className="transition-all duration-250 hover:text-red-500">
        Sign Out
      </button>
    </>
    
    )
}