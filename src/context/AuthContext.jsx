import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [registeredAccounts, setRegisteredAccounts] = useState([]);

  useEffect(() => {
    // Load current user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    // Load all registered accounts
    const storedAccounts = localStorage.getItem('registeredAccounts');
    if (storedAccounts) {
      setRegisteredAccounts(JSON.parse(storedAccounts));
    }
  }, []);

  const login = (userData) => {
    // Load accounts from localStorage directly to ensure we have latest data
    const storedAccounts = localStorage.getItem('registeredAccounts');
    const accountsToCheck = storedAccounts ? JSON.parse(storedAccounts) : registeredAccounts;
    
    console.log('===== LOGIN ATTEMPT =====');
    console.log('Login attempt with:', userData);
    console.log('Stored accounts:', accountsToCheck);
    console.log('Number of accounts:', accountsToCheck.length);
    
    // Check if account exists in registered accounts (email is case-insensitive)
    const accountExists = accountsToCheck.some(
      account => {
        console.log(`Checking account: name="${account.name}", email="${account.email}"`);
        const emailMatch = account.email.toLowerCase() === userData.email.toLowerCase();
        const nameMatch = account.name === userData.name;
        const passwordMatch = account.password === userData.password;
        const match = emailMatch && nameMatch && passwordMatch;
        console.log(`  Email match: ${emailMatch} (${account.email} vs ${userData.email})`);
        console.log(`  Name match: ${nameMatch} (${account.name} vs ${userData.name})`);
        console.log(`  Password match: ${passwordMatch}`);
        console.log(`  Overall match: ${match}`);
        return match;
      }
    );

    console.log('Account exists:', accountExists);

    if (!accountExists) {
      // Account doesn't exist or wrong credentials
      console.log('LOGIN FAILED: Account not found');
      return { success: false, message: 'Account not found. Please check your details or sign up.' };
    }

    console.log('LOGIN SUCCESS: Logging in user');
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const signup = (userData) => {
    // Load accounts from localStorage directly to ensure we have latest data
    const storedAccounts = localStorage.getItem('registeredAccounts');
    const accountsToCheck = storedAccounts ? JSON.parse(storedAccounts) : [];
    
    console.log('===== SIGNUP ATTEMPT =====');
    console.log('Signup data:', userData);
    console.log('Current accounts in localStorage:', accountsToCheck);
    
    // Check if email already exists (case-insensitive)
    const emailExists = accountsToCheck.some(account => account.email.toLowerCase() === userData.email.toLowerCase());
    if (emailExists) {
      console.log('EMAIL ALREADY EXISTS');
      return { success: false, message: 'Email already registered. Please login or use a different email.' };
    }

    // Add to registered accounts
    const updatedAccounts = [...accountsToCheck, userData];
    console.log('Updated accounts list:', updatedAccounts);
    
    setRegisteredAccounts(updatedAccounts);
    localStorage.setItem('registeredAccounts', JSON.stringify(updatedAccounts));

    // Auto-login after signup
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    
    console.log('SIGNUP SUCCESS: Account created and logged in');
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup, registeredAccounts }}>
      {children}
    </AuthContext.Provider>
  );
};
