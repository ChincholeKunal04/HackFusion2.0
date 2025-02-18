import React from 'react'
import { Outlet } from 'react-router-dom'

const DoctorLayout = () => {
  return (
    <div>
      doctor Layout
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default DoctorLayout
