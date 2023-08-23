import React from 'react'
import { createPortal } from 'react-dom'
import {AiOutlineClose} from "react-icons/ai"

export const Modal = ({onClose,isOpen,children}) => {
  return createPortal(
    <>
    {isOpen&&(
      <div className='grid place-items-center backdrop-blur h-screen w-screen z-40 absolute top-0'>
      <div className='relative z-50 p-4 bg-white min-h-[200px] rounded-lg mx-auto min-w-[80%] '>
      <div className='flex justify-end'>
        <AiOutlineClose className='text-2xl' onClick={onClose}/>
      </div>
      {children}
      </div>
     

     
      </div>
    )}</>
  ,document.getElementById("modal-root"))
}
