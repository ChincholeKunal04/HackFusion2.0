import { Outlet } from "react-router-dom";
import React from 'react'

const AuthLayout = () => {
  return (
      <div className="flex min-h-screen">
            {/* Left Side - Welcome Message (Hidden on small screens) */}
            <div className="hidden lg:flex items-center justify-center bg-blue-500 w-1/2 p-8">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold">Automated Paperless Transparent College System</h1>
                    <p className="mt-8 text-lg">Manage your academic journey with ease.</p>
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
