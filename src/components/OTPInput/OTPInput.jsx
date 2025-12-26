import React, { useState } from 'react'
import { useAlert } from '../../context/AlertContext'

export default function OTPInput({ phoneOrEmail, type = 'email', onVerify, onClose }) {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const { showAlert } = useAlert()

  const handleVerify = (e) => {
    e.preventDefault()
    
    if (!otp.trim()) {
      showAlert('Please enter the OTP', 'warning')
      return
    }

    setLoading(true)
    
    
    setTimeout(() => {
      setLoading(false)
      showAlert(`${type === 'email' ? 'Email' : 'Mobile'} verified successfully!`, 'success')
      onVerify(otp)
      onClose()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-md">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Verify {type === 'email' ? 'Email' : 'Phone'}</h2>
          <p className="text-gray-600 text-sm mt-2">
            We sent an OTP to <span className="font-semibold">{phoneOrEmail}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-black text-center text-2xl tracking-widest"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-orange-600 text-black rounded-lg hover:bg-orange-700 font-medium transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Didn't receive OTP? <span className="text-orange-600 cursor-pointer hover:underline">Resend</span></p>
        </div>
      </div>
    </div>
  )
}
