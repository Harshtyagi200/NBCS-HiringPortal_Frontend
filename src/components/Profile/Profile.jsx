import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../context/AlertContext'
import { createPortal } from 'react-dom'

function Profile() {
  const authContext = useAuth();
  const { showAlert } = useAlert();
  const buttonRef = useRef(null);
  
 
  if (!authContext) {
    return null;
  }

  const { isAuthenticated, user, logout } = authContext;
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  
  if (!isAuthenticated || !user) {
    return null;
  }

  
  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 10,
        left: rect.right - 384 
      });
    }
  }, [isDropdownOpen]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        
        const dropdown = document.getElementById('profile-dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Logout clicked');
    logout();
    setIsDropdownOpen(false);
    showAlert('Logged out successfully!', 'success');
    
    
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 300);
  };

  return (
    <>
      
      <button
        ref={buttonRef}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition duration-200 shadow-md"
      >
        <div className="w-10 h-10 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-lg">
          {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <span className="text-white font-semibold hidden sm:inline text-base">
          {user && user.name ? user.name : 'User'}
        </span>
        <svg className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      
      {isDropdownOpen && createPortal(
        <div 
          id="profile-dropdown"
          className="fixed w-96 bg-slate-900 rounded-xl shadow-2xl border border-orange-500"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            zIndex: 9999,
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          
          <div className="px-6 py-6 bg-linear-to-r from-orange-500 to-orange-600">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-2xl shadow-lg">
                {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <p className="font-bold text-white text-lg">{user && user.name ? user.name : 'User'}</p>
                <p className="text-orange-100 text-sm">{user && user.email ? user.email : 'No email'}</p>
              </div>
            </div>
          </div>

          
          <div className="px-6 py-6 space-y-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-orange-400 font-semibold text-xs uppercase tracking-wider mb-1">Full Name</p>
              <p className="text-white text-lg">{user && user.name ? user.name : 'N/A'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-orange-400 font-semibold text-xs uppercase tracking-wider mb-1">Email Address</p>
              <p className="text-gray-200 text-sm wrap-break-word">{user && user.email ? user.email : 'N/A'}</p>
            </div>
            {user && user.phone && (
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-orange-400 font-semibold text-xs uppercase tracking-wider mb-1">Phone Number</p>
                <p className="text-white text-lg">{user.phone}</p>
              </div>
            )}
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-orange-400 font-semibold text-xs uppercase tracking-wider mb-1">Account Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-green-400 font-semibold">Active</p>
              </div>
            </div>
          </div>

          
          <div className="border-t border-slate-700"></div>

          
          <div className="px-6 py-4">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg text-base"
            >
              🚪 Logout
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default Profile;
