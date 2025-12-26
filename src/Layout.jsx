import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Haeder/Header.jsx'
import Footer from './components/Haeder/Footer/Footer.jsx'
import AlertBox from './components/AlertBox/AlertBox.jsx'
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground.jsx'


function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">

     
      <ParticlesBackground />

     
      <div className="sticky top-0" style={{ zIndex: 100 }}>
        <Header />
      </div>

      
      <div className="relative grow" style={{ zIndex: 50 }}>
        <Outlet />
      </div>

     
      <div className="relative" style={{ zIndex: 50 }}>
        <Footer />
      </div>

      
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999, pointerEvents: 'none' }}>
        <AlertBox />
      </div>
    </div>
  )
}

export default Layout
