import { Outlet } from "react-router-dom";
import React from 'react'

const AuthLayout = () => {
  return (
      <div className="flex min-h-screen">
            {/* Left Side - Welcome Message (Hidden on small screens) */}
            <div className="hidden lg:flex items-center justify-center 
                bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 
                w-1/2 p-10 shadow-2xl relative overflow-hidden">

                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-20 blur-2xl"></div>

                <div className="relative text-center text-white z-10">
                    <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
                        Automated Paperless Transparent College System
                    </h1>
                    <p className="mt-6 text-lg opacity-90">
                        Manage your academic journey with ease.
                    </p>
                </div>
            </div>


            {/* Right Side - Outlet for Login/Register */}
            <div className="flex flex-1 items-center justify-center bg-gray-100 p-4 sm:p-8">
                <Outlet />
            </div>
      </div>
  )
}

export default AuthLayout
