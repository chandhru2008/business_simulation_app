
import { useSidebar } from '../../lib/sidebar-context'
import React from 'react';
import { useSimulation } from '../simulation/simulation-context';
import { useAuth } from '@/lib/auth-context';


interface SidebarProps {
  children: React.ReactNode;
}



export function Sidebar({ children }: SidebarProps) {
  const { showSidebar } = useSidebar();
  const { simulation } = useSimulation();
  const { user} = useAuth();


  if (!simulation) {
    return (
      <div className={`w-64 bg-gray-900 text-white ${showSidebar ? 'flex' : 'hidden'} flex-col h-screen justify-between`}>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2">Business Simulation</h1>
          <p className="text-sm text-gray-400 mb-4">You have no simulation to show</p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-sm py-2 rounded-md mb-6">
            Create Simulation
          </button>
        </div>

        <SidebarFooter className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                {user?.name?.[0]}
              </div>
              <div>
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-gray-400">{user?.role}</div>
              </div>
            </div>
          </div>
        </SidebarFooter>
      </div>
    )
  }



  return (
    <div className={`w-64 bg-gray-900 text-white ${showSidebar ? 'flex' : 'hidden'} flex-col h-screen`}>
      {children}
    </div>
  );
}

interface SidebarLogoProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarLogo({ children, className = '' }: SidebarLogoProps) {
  return (
    <div className={`flex items-center p-6 ${className}`}>
      {children}
    </div>
  );
}

interface SidebarNavProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarNav({ children, className = '' }: SidebarNavProps) {
  return (
    <nav className={`flex-1 px-4 ${className}`}>
      {children}
    </nav>
  );
}

interface SidebarNavGroupProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SidebarNavGroup({ title, children, className = '' }: SidebarNavGroupProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

interface SidebarNavItemProps {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export function SidebarNavItem({
  href,
  icon,
  children,
  active = false,
  className = ''
}: SidebarNavItemProps) {
  return (
    <a
      href={href}
      className={`
        flex items-center px-3 py-2 text-sm font-medium rounded-md
        ${active
          ? 'bg-indigo-600 text-white'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
        ${className}
      `}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </a>
  );
}

interface SidebarFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarFooter({ children, className = '' }: SidebarFooterProps) {
  return (
    <div className={`p-4 border-t border-gray-700 ${className}`}>
      {children}
    </div>
  );
}