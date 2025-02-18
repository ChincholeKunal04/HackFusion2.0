import React from 'react'
import { Outlet } from 'react-router-dom'

const TeacherLayout = () => {
  return (
    <div>
        teacher Layout
        <main>
            <Outlet>
                
            </Outlet>
        </main>
    </div>
  )
}

export default TeacherLayout
