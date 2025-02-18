import React from 'react'
import { Outlet } from 'react-router-dom'

const StudentLayout = () => {
  return (
    <div>
      Student Layout
      <main>
        <Outlet>
            
        </Outlet>
      </main>
    </div>
  )
}

export default StudentLayout
