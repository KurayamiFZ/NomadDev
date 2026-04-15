/**
 * Authentication utilities and hooks
 * 
 * Exports the useAuth hook from AuthProvider for easy importing
 * across the application.
 * 
 * @fileoverview Authentication utilities
 */

"use client";

import { useContext } from "react";
import { AuthContext } from "../app/components/AuthProvider";

/**
 * Authentication hook
 * 
 * Provides access to the current user, loading state, and signOut function
 * from the AuthProvider context.
 * 
 * @returns {Object} Authentication context
 * @returns {Object|null} user - Current authenticated user or null
 * @returns {boolean} loading - Whether authentication is loading
 * @returns {Function} signOut - Function to sign out the user
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * Export AuthContext for advanced usage
 */
export { AuthContext } from "../app/components/AuthProvider";
