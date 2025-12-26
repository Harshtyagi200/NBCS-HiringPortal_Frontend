import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useAlert } from '../../context/AlertContext'
import Navbar from '../Haeder/Header';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form fields
        if (!formData.name.trim()) {
            console.log('Name is empty');
            showAlert('Please enter your full name', 'warning');
            return;
        }
        if (!formData.email.trim()) {
            console.log('Email is empty');
            showAlert('Please enter your email', 'warning');
            return;
        }
        if (!formData.password.trim()) {
            console.log('Password is empty');
            showAlert('Please enter your password', 'warning');
            return;
        }
        
        console.log('Login Form Data:', formData);
        
        // Verify account before logging in
        const result = login(formData);
        console.log('Login result:', result);
        
        if (result.success) {
            console.log('Login successful');
            showAlert('Login successful! Redirecting to apply...', 'success');
            setTimeout(() => {
                navigate('/apply');
            }, 1500);
        } else {
            console.log('Login failed, showing alert:', result.message);
            showAlert(result.message, 'warning');
        }
    };

    return (
        <>
            <div className="login-form flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-950">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-white drop-shadow-lg">Sign in to your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white drop-shadow-md">Full Name</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white drop-shadow-md">Email</label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white drop-shadow-md">Password</label>
                            <div className="mt-2 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M15.171 11.586a4 4 0 111.414-1.414l2.826 2.826a1 1 0 11-1.414 1.414l-2.826-2.826z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-400 drop-shadow-md">
                        <Link to="/signup" className="font-semibold leading-6 text-orange-400 hover:text-orange-300">
                            Don't have an account? Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login
