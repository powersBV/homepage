"use client";

import React, { useState, useCallback } from 'react';
import { User, useAuth } from '@/contexts/AuthContext';
import { SignInForm } from '../auth/SignInForm';
import { SignUpForm } from '../auth/SignUpForm';
import { ICPSelector } from '../auth/ICPSelector';

type AuthView = 'signin' | 'signup' | 'icp-selection';

interface AuthWindowProps {
  onLoginSuccess: (user: User) => void;
  initialView?: AuthView;
}

export const AuthWindowContent: React.FC<AuthWindowProps> = ({ 
  onLoginSuccess,
  initialView = 'signin' 
}) => {
  const { user } = useAuth();
  const [view, setView] = useState<AuthView>(initialView);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle successful sign in
  const handleSignInSuccess = useCallback(() => {
    // User is set in AuthContext, we need to get the latest value
    // Since signIn updates the context, we'll read from localStorage
    const stored = localStorage.getItem('buildvision_auth_user');
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored);
        parsedUser.createdAt = new Date(parsedUser.createdAt);
        onLoginSuccess(parsedUser);
      } catch (e) {
        console.error('Failed to parse user:', e);
      }
    }
  }, [onLoginSuccess]);

  // Handle successful sign up - transition to ICP selection
  const handleSignUpSuccess = (tempUser: User) => {
    setPendingUser(tempUser);
    setView('icp-selection');
  };

  // Handle ICP selection
  const handleICPSelect = async (icp: 'buyer' | 'seller' | 'maker') => {
    if (!pendingUser) return;
    
    setIsLoading(true);
    try {
      // Create the final user with the selected ICP
      const finalUser: User = {
        ...pendingUser,
        icp,
      };
      
      // Store in localStorage directly since we're bypassing normal signUp flow
      localStorage.setItem('buildvision_auth_user', JSON.stringify(finalUser));
      
      // Call onLoginSuccess with the new user
      onLoginSuccess(finalUser);
    } catch (error) {
      console.error('Failed to complete signup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-white">
      {view === 'signin' && (
        <SignInForm
          onSwitchToSignUp={() => setView('signup')}
          onSuccess={handleSignInSuccess}
        />
      )}
      
      {view === 'signup' && (
        <SignUpForm
          onSwitchToSignIn={() => setView('signin')}
          onSuccess={handleSignUpSuccess}
        />
      )}
      
      {view === 'icp-selection' && (
        <ICPSelector
          onSelect={handleICPSelect}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

// Helper to get window dimensions based on view
export const getAuthWindowDimensions = (view: AuthView = 'signin'): { width: number; height: number } => {
  if (view === 'icp-selection') {
    return { width: 560, height: 420 };
  }
  return { width: 420, height: 480 };
};
