"use client";

import React from 'react';
import { AuthProvider } from '../lib/auth-context';
import { DatabaseProvider } from '../lib/database-context';
import { AuthPage } from '../components/auth/auth-page';
import { SimulationProvider } from '../components/simulation/simulation-context';
import { AppLayout } from '../components/layout/app-layout';
import { Dashboard } from '../components/dashboard/dashboard';
import { useAuth } from '../lib/auth-context';
import { SideBarContextProvider } from '@/lib/sidebar-context';

// Main app component that handles authentication state
function AppContent() {
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <div className='flex justify-center pb-1'>
            <svg viewBox="0 0 240 240" height="240" width="240" className="loader">
              <circle strokeLinecap="round" strokeDashoffset="-330" strokeDasharray="0 660" strokeWidth="20" stroke="#000" fill="none" r="105" cy="120" cx="120" className="loader-ring loader-ring-a"></circle>
              <circle strokeLinecap="round" strokeDashoffset="-110" strokeDasharray="0 220" strokeWidth="20" stroke="#000" fill="none" r="35" cy="120" cx="120" className="loader-ring loader-ring-b"></circle>
              <circle strokeLinecap="round" strokeDasharray="0 440" strokeWidth="20" stroke="#000" fill="none" r="70" cy="120" cx="85" className="loader-ring loader-ring-c"></circle>
              <circle strokeLinecap="round" strokeDasharray="0 440" strokeWidth="20" stroke="#000" fill="none" r="70" cy="120" cx="155" className="loader-ring loader-ring-d"></circle>
            </svg>
          </div>
          <p className="mt-2 text-gray-600">Please wait while we set up your simulation</p>
        </div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage />;
  }

  // Show main app if logged in
  return (
    <SimulationProvider>
      <SideBarContextProvider>
        <AppLayout>
          <Dashboard />
        </AppLayout>
      </SideBarContextProvider>
    </SimulationProvider>
  );
}

// Root component with all providers
export default function App() {
  return (
    <DatabaseProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </DatabaseProvider>
  );
}
