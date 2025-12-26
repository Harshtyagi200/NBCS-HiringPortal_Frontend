import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Haeder/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contactus/Contact.jsx'
import Login from './components/Loginform/Login.jsx'
import Signup from './components/Signupform/Signup.jsx'
import Apply from './components/Apply/Apply.jsx'
import ErrorPage from './components/Errorpage/ErrorPage.jsx'
import PlacementProcess from './components/Placement process/PlacementProcess.jsx'
import Submit from './components/Submit confirmation/Submit.jsx'
import Submit2 from './components/Submit2/Submit2.jsx'
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="apply" element={<Apply />} />
          <Route path="placementprocess" element={<PlacementProcess />} />
          <Route path="submit" element={<Submit />} />
          <Route path="submit2" element={<Submit2 />} />
          <Route path="particles" element={<ParticlesBackground />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
