import React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Haeder/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contactus from './components/Contactus/Contact.jsx'
import ErrorPage from './components/Errorpage/ErrorPage.jsx'
import Apply from './components/Apply/Apply.jsx'
import Login from './components/Loginform/Login.jsx'
import Signup from './components/Signupform/Signup.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AlertProvider } from './context/AlertContext.jsx'
import PlacementProcess from './components/Placement process/PlacementProcess.jsx'
import Submit from './components/Submit confirmation/Submit.jsx'
import Submit2 from './components/Submit2/Submit2.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contactus />
      },
      {
        path: "apply",
        element: <Apply />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "placementprocess",
        element: <PlacementProcess />
      },
      {
        path: "submit",
        element: <Submit />
      },
      {
        path: "submit2",
        element: <Submit2 />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AlertProvider>
  </StrictMode>,
)
