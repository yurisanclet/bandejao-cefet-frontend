'use client'
import React, { ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const TemplateProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: '200px' }}
      />
      {children}
    </>
  )
}

export default TemplateProviders
