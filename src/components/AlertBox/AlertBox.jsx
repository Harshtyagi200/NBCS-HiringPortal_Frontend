import React from 'react'
import { useAlert } from '../../context/AlertContext'

export default function AlertBox() {
  const { alerts, removeAlert, showAlert } = useAlert()

  const getAlertStyles = (type) => {
    const baseStyles = 'px-6 py-4 rounded-lg shadow-lg font-medium flex items-center justify-between animate-slideDown'
    
    const typeStyles = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-white',
      info: 'bg-blue-500 text-white',
    }

    return `${baseStyles} ${typeStyles[type] || typeStyles.info}`
  }

  const getIcon = (type) => {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    }
    return icons[type] || icons.info
  }

  return (
    <div 
      className="w-full flex justify-center pointer-events-none pt-4"
    >
      <div className="w-full max-w-md mx-auto px-4 space-y-2">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={getAlertStyles(alert.type)}
            style={{
              pointerEvents: 'auto',
            }}
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xl">{getIcon(alert.type)}</span>
              <span>{alert.message}</span>
            </div>
            <button
              onClick={() => removeAlert(alert.id)}
              className="ml-4 text-lg hover:opacity-70 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
