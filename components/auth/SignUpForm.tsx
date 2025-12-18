"use client";

import React, { useState } from 'react';
import { User } from '@/contexts/AuthContext';

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
  onSuccess: (user: User) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToSignIn, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name) {
      newErrors.name = 'Full name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Create a temporary user object to pass to ICP selection
      // The actual user creation will happen after ICP is selected
      const tempUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        icp: 'buyer', // Temporary, will be updated
        createdAt: new Date(),
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onSuccess(tempUser);
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'Sign up failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-header-5 font-bold text-neutral-900 text-center mb-6">
        Create account
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Error */}
        {errors.general && (
          <div className="p-3 bg-cad-red/10 border border-cad-red/30 rounded-md">
            <p className="text-detail text-cad-red">{errors.general}</p>
          </div>
        )}

        {/* Full Name Field */}
        <div>
          <label className="block text-detail font-bold text-neutral-700 mb-1">
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full h-[44px] px-3 text-body-small text-neutral-900 bg-white border rounded-md focus:outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(74,58,255,0.1)] transition-all ${
              errors.name ? 'border-cad-red' : 'border-neutral-200'
            }`}
            placeholder="John Smith"
          />
          {errors.name && (
            <p className="mt-1 text-detail text-cad-red">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-detail font-bold text-neutral-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full h-[44px] px-3 text-body-small text-neutral-900 bg-white border rounded-md focus:outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(74,58,255,0.1)] transition-all ${
              errors.email ? 'border-cad-red' : 'border-neutral-200'
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-detail text-cad-red">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-detail font-bold text-neutral-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full h-[44px] px-3 text-body-small text-neutral-900 bg-white border rounded-md focus:outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(74,58,255,0.1)] transition-all ${
              errors.password ? 'border-cad-red' : 'border-neutral-200'
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-detail text-cad-red">{errors.password}</p>
          )}
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[44px] bg-blue-400 text-white text-body-small font-bold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-micro text-neutral-500">or</span>
          </div>
        </div>

        {/* Google Sign Up */}
        <button
          type="button"
          className="w-full h-[44px] bg-white border border-neutral-200 text-neutral-900 text-body-small font-bold rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92a8.78 8.78 0 002.68-6.63z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.85.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 009 18z" fill="#34A853"/>
            <path d="M3.97 10.71A5.41 5.41 0 013.68 9c0-.6.1-1.17.28-1.71V4.96H.96A9 9 0 000 9c0 1.45.35 2.82.96 4.04l3.01-2.33z" fill="#FBBC05"/>
            <path d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58A9 9 0 009 0 9 9 0 00.96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <span className="text-detail text-neutral-600">Already have an account? </span>
        <button
          onClick={onSwitchToSignIn}
          className="text-detail text-blue-400 hover:underline cursor-pointer"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};
