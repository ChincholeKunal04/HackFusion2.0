import React from 'react'
import { Outlet } from 'react-router-dom'

const DoctorLayout = () => {
  return (
    <div>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default DoctorLayout
