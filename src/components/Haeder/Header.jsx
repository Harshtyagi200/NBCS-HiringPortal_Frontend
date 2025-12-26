import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Profile from '../Profile/Profile'

export default function Header() {
    const { isAuthenticated } = useAuth();
    return (
        <header className="shadow sticky z-50 top-0 overflow-visible">
            <nav className="bg-slate-900/80 backdrop-blur-sm border-gray-700 px-4 lg:px-6 py-2.5 overflow-visible">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-7xl overflow-visible">
                    <Link to="/" className="flex items-center">
                        <img src="/logo.jpg" alt="NBCS Logo" className="h-12 w-auto mr-3" />
                        <h1 className="text-orange-500 text-lg hidden sm:inline"><strong>NBCS TECHNOLOGIES</strong></h1>
                    </Link>

                    <div className="flex items-center lg:order-2">
                        {isAuthenticated ? (
                            <Profile />
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-white hover:bg-slate-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-300"} border-b border-gray-700 hover:bg-slate-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-300"} border-b border-gray-700 hover:bg-slate-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-300"} border-b border-gray-700 hover:bg-slate-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/apply"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-300"} border-b border-gray-700 hover:bg-slate-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                    }
                                >
                                    Apply
                                </NavLink>
                            </li>
                             <li>
                                <NavLink
                                    to="/placementprocess"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-300"} border-b border-gray-700 hover:bg-slate-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                    }
                                >
                                    Placement Process
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}


