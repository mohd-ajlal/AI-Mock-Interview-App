import React from 'react'
import Header from './_components/Header'

function DashboardLayout ({children}: Readonly<{children: React.ReactNode}>){
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}

export default DashboardLayout