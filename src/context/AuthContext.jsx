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
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    
    const storedAccounts = localStorage.getItem('registeredAccounts');
    if (storedAccounts) {
      setRegisteredAccounts(JSON.parse(storedAccounts));
    }
  }, []);

  const login = (userData) => {
   
    const storedAccounts = localStorage.getItem('registeredAccounts');
    const accountsToCheck = storedAccounts ? JSON.parse(storedAccounts) : registeredAccounts;
    
    console.log('===== LOGIN ATTEMPT =====');
    console.log('Login attempt with:', userData);
    console.log('Stored accounts:', accountsToCheck);
    console.log('Number of accounts:', accountsToCheck.length);
    
    
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
   
    const storedAccounts = localStorage.getItem('registeredAccounts');
    const accountsToCheck = storedAccounts ? JSON.parse(storedAccounts) : [];
    
    console.log('===== SIGNUP ATTEMPT =====');
    console.log('Signup data:', userData);
    console.log('Current accounts in localStorage:', accountsToCheck);
    
    
    const emailExists = accountsToCheck.some(account => account.email.toLowerCase() === userData.email.toLowerCase());
    if (emailExists) {
      console.log('EMAIL ALREADY EXISTS');
      return { success: false, message: 'Email already registered. Please login or use a different email.' };
    }

    
    const updatedAccounts = [...accountsToCheck, userData];
    console.log('Updated accounts list:', updatedAccounts);
    
    setRegisteredAccounts(updatedAccounts);
    localStorage.setItem('registeredAccounts', JSON.stringify(updatedAccounts));

    
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
