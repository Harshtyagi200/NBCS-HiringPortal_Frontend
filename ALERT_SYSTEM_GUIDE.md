# Custom Alert System - Usage Guide

## How to Use in Your Components

### 1. Import the hook
```jsx
import { useAlert } from '../../context/AlertContext'
```

### 2. Get the showAlert function
```jsx
function MyComponent() {
  const { showAlert } = useAlert()
  
  // Your component code
}
```

### 3. Use it in your code
Replace all `alert()` calls with `showAlert()`:

```jsx
// OLD (browser alert)
alert('Success!')

// NEW (beautiful custom alert)
showAlert('Success!', 'success')
showAlert('Error occurred!', 'error')
showAlert('Warning message', 'warning')
showAlert('Info message', 'info')
```

## Alert Types

- **'success'** - Green background ✅
- **'error'** - Red background ❌
- **'warning'** - Yellow background ⚠️
- **'info'** - Blue background ℹ️

## Examples from Apply.jsx

```jsx
// Account required
showAlert('Account Required! Please sign up or login to apply.', 'warning')

// Email verification
showAlert('Email verified successfully!', 'success')

// Error handling
showAlert('An error occurred while submitting your application.', 'error')

// OTP sent
showAlert('OTP sent to your email', 'info')
```

## Optional: Custom Duration

```jsx
// Auto-dismiss after 2 seconds (default is 4 seconds)
showAlert('Quick message', 'info', 2000)

// Keep alert forever (user must click X)
showAlert('Important message', 'warning', 0)
```

## Features

✅ Appears below navbar automatically
✅ Smooth slide-down animation
✅ Multiple alerts can stack
✅ Auto-dismiss after 4 seconds (configurable)
✅ Manual close button (X)
✅ Color-coded by type
✅ Works globally across all pages

## Next Steps

Replace all `alert()` calls in these files:
- [ ] Apply.jsx (already started)
- [ ] Login.jsx
- [ ] Signup.jsx
- [ ] Contact.jsx (if needed)
