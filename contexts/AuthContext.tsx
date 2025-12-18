"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  icp: 'buyer' | 'seller' | 'maker';
  createdAt: Date;
}

// Pending action for auth gate
export interface PendingAction {
  type: 'save-project' | 'other';
  data?: unknown;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  pendingAction: PendingAction | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<User>;
  setICP: (icp: 'buyer' | 'seller' | 'maker') => void;
  signOut: () => void;
  setPendingAction: (action: PendingAction | null) => void;
}

// Local storage key
const AUTH_STORAGE_KEY = 'buildvision_auth_user';

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'contexts/AuthContext.tsx:41',message:'AuthProvider mount',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'contexts/AuthContext.tsx:47',message:'AuthProvider state initialized',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
  // #endregion

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert createdAt back to Date
        parsed.createdAt = new Date(parsed.createdAt);
        setUser(parsed);
      }
    } catch (error) {
      console.error('Failed to load auth state:', error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  // Sign in with email and password (mock implementation)
  const signIn = useCallback(async (email: string, password: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // For mock, just check if password is not empty
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Check if we have stored user data for this email
    // In production, this would be a real API call
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.email === email) {
        parsed.createdAt = new Date(parsed.createdAt);
        setUser(parsed);
        return;
      }
    }

    // For demo purposes, create a returning user with buyer ICP
    const mockUser: User = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
      icp: 'buyer',
      createdAt: new Date(),
    };
    setUser(mockUser);
  }, []);

  // Sign up with name, email, and password (mock implementation)
  // Returns user without ICP set - caller must then call setICP
  const signUp = useCallback(async (name: string, email: string, password: string): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate inputs
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }

    // Create new user without ICP (will be set in next step)
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      icp: 'buyer', // Temporary, will be updated by setICP
      createdAt: new Date(),
    };

    // Don't set user yet - wait for ICP selection
    return newUser;
  }, []);

  // Set ICP for user (called after sign up)
  const setICP = useCallback((icp: 'buyer' | 'seller' | 'maker') => {
    setUser(currentUser => {
      if (currentUser) {
        return { ...currentUser, icp };
      }
      return currentUser;
    });
  }, []);

  // Complete sign up by setting user with ICP
  const completeSignUp = useCallback((newUser: User, icp: 'buyer' | 'seller' | 'maker') => {
    const userWithICP = { ...newUser, icp };
    setUser(userWithICP);
  }, []);

  // Sign out
  const signOut = useCallback(() => {
    setUser(null);
    setPendingAction(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    pendingAction,
    signIn,
    signUp,
    setICP,
    signOut,
    setPendingAction,
  };

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/098c92ed-a44b-4fe3-bd76-b15f37e46396',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'contexts/AuthContext.tsx:175',message:'AuthProvider rendering context',data:{hasValue:!!value,isAuthenticated:value.isAuthenticated},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
  // #endregion

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export completeSignUp helper for AuthWindow
export const useCompleteSignUp = () => {
  const { signUp, setICP } = useAuth();
  
  const completeSignUp = useCallback(async (
    name: string, 
    email: string, 
    password: string, 
    icp: 'buyer' | 'seller' | 'maker'
  ) => {
    const user = await signUp(name, email, password);
    setICP(icp);
    return { ...user, icp };
  }, [signUp, setICP]);

  return completeSignUp;
};
