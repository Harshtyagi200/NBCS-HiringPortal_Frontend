import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useAlert } from '../../context/AlertContext'
import OTPInput from '../OTPInput/OTPInput'
import Navbar from '../Haeder/Header';

function Apply() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [isChecking, setIsChecking] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const hasShownAlertRef = React.useRef(false);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    number: '',
    resume: null,
  });

  const [verificationStatus, setVerificationStatus] = React.useState({
    emailVerified: false,
    mobileVerified: false,
  });

  const [otpInputs, setOtpInputs] = React.useState({
    emailOtp: '',
    mobileOtp: '',
  });

  const [showOTPModal, setShowOTPModal] = React.useState(false);
  const [otpType, setOtpType] = React.useState(null); // 'email' or 'mobile'

  useEffect(() => {
    // Small delay to ensure AuthContext has loaded from localStorage
    const timer = setTimeout(() => {
      console.log('Checking auth status:', isAuthenticated);
      
      if (!isAuthenticated) {
        // Only show alert once
        if (!hasShownAlertRef.current) {
          hasShownAlertRef.current = true;
          console.log('User not authenticated, redirecting to login');
          showAlert('Account Required! Please sign up or login to apply for a position.', 'warning');
          // Use a longer delay to let alert show before navigating
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 1500);
        }
      } else {
        console.log('User is authenticated, allowing access');
        setShouldRender(true);
      }
      setIsChecking(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate, showAlert]);

 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEmailVerification = () => {
    if (!formData.email) {
      showAlert('Please enter your email address first!', 'warning');
      return;
    }
    showAlert('OTP sent to your email: ' + formData.email, 'info');
    setOtpType('email');
    setShowOTPModal(true);
  };

  const handleOTPVerify = (otpValue) => {
    if (otpType === 'email') {
      setVerificationStatus(prevState => ({
        ...prevState,
        emailVerified: true,
      }));
      setOtpInputs(prevState => ({
        ...prevState,
        emailOtp: otpValue,
      }));
    } else if (otpType === 'mobile') {
      setVerificationStatus(prevState => ({
        ...prevState,
        mobileVerified: true,
      }));
      setOtpInputs(prevState => ({
        ...prevState,
        mobileOtp: otpValue,
      }));
    }
  };

  const handleMobileVerification = () => {
    if (!formData.number) {
      showAlert('Please enter your mobile number first!', 'warning');
      return;
    }
    showAlert('OTP sent to your mobile: ' + formData.number, 'info');
    setOtpType('mobile');
    setShowOTPModal(true);
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      
      // Double-check authentication before submission
      if (!isAuthenticated) {
        showAlert('Session Error! Your session has expired. Please login again.', 'error');
        navigate('/login');
        return;
      }
      
      // Check if email and mobile are verified
      if (!verificationStatus.emailVerified) {
        showAlert('Please verify your email address first!', 'warning');
        return;
      }
      
      if (!verificationStatus.mobileVerified) {
        showAlert('Please verify your mobile number first!', 'warning');
        return;
      }

      // Check if resume is uploaded
      if (!formData.resume) {
        showAlert('Please upload your resume!', 'warning');
        return;
      }

      // Check if name is filled
      if (!formData.name.trim()) {
        showAlert('Please enter your name!', 'warning');
        return;
      }

      // All validations passed - submit form
      console.log('Form submitted with verification:', formData);
      
      // Navigate to confirmation page
      navigate('/submit');
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          number: '',
          resume: null,
        });
        setVerificationStatus({
          emailVerified: false,
          mobileVerified: false,
        });
      }, 100);
    } catch (error) {
      console.error('Error submitting form:', error);
      showAlert('An error occurred while submitting your application. Please try again.', 'error');
    }
  };

  return (
    <>
      {showOTPModal && (
        <OTPInput
          phoneOrEmail={otpType === 'email' ? formData.email : formData.number}
          type={otpType}
          onVerify={handleOTPVerify}
          onClose={() => setShowOTPModal(false)}
        />
      )}
      {isChecking && (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white drop-shadow-lg">Loading...</h2>
          </div>
        </div>
      )}
      
      {!isChecking && !shouldRender && (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white drop-shadow-lg">❌ Access Denied</h2>
            <p className="text-center text-gray-300 mt-4 drop-shadow-md">Please login or create an account to apply for positions.</p>
          </div>
        </div>
      )}

      {!isChecking && shouldRender && (
        <div className="apply-form flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-950">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-white drop-shadow-lg">Apply for a Position</h2>
            <p className="text-center text-sm text-gray-300 mt-2 drop-shadow-md">Please verify your email and mobile to continue</p>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-white drop-shadow-md">Name:</label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white drop-shadow-md">
                  Email: {verificationStatus.emailVerified && <span className="text-green-400">✅ Verified</span>}
                </label>
                <div className="mt-2 relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={verificationStatus.emailVerified}
                    className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 pr-24 disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleEmailVerification}
                    disabled={verificationStatus.emailVerified}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-xs font-semibold ${
                      verificationStatus.emailVerified
                        ? 'bg-green-600 text-white hover:bg-green-500'
                        : 'bg-orange-600 text-white hover:bg-orange-500'
                    }`}
                  >
                    {verificationStatus.emailVerified ? 'Verified' : 'Verify Email'}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="number" className="block text-sm font-medium leading-6 text-white drop-shadow-md">
                  Mobile Number: {verificationStatus.mobileVerified && <span className="text-green-400">✅ Verified</span>}
                </label>
                <div className="mt-2 relative">
                  <input
                    type="tel"
                    name="number"
                    id="number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                    disabled={verificationStatus.mobileVerified}
                    className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 pr-24 disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleMobileVerification}
                    disabled={verificationStatus.mobileVerified}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-xs font-semibold ${
                      verificationStatus.mobileVerified
                        ? 'bg-green-600 text-white hover:bg-green-500'
                        : 'bg-orange-600 text-white hover:bg-orange-500'
                    }`}
                  >
                    {verificationStatus.mobileVerified ? 'Verified' : 'Verify Phone'}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium leading-6 text-white drop-shadow-md">Resume:</label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                    required
                    disabled={!verificationStatus.emailVerified || !verificationStatus.mobileVerified}
                    className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  {(!verificationStatus.emailVerified || !verificationStatus.mobileVerified) && (
                    <p className="text-red-400 text-xs mt-1 drop-shadow-md">⚠️ Verify email and mobile first to upload resume</p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={!verificationStatus.emailVerified || !verificationStatus.mobileVerified}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    verificationStatus.emailVerified && verificationStatus.mobileVerified
                      ? 'bg-orange-600 text-white hover:bg-orange-500 focus-visible:outline-orange-600'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {verificationStatus.emailVerified && verificationStatus.mobileVerified ? 'Apply' : 'Verify Email & Mobile to Apply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Apply;
