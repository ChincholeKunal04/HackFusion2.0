import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      adminLayout
      <main>
        <Outlet >
        </Outlet>
      </main>
    </div>
  )
}

export default AdminLayout
