// frontend/components/Layout.tsx
import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Blog App</title>
        <meta name="description" content="A full-stack blog application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto py-6 px-4">{children}</main>
        <footer className="bg-white shadow-inner py-4 mt-auto">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Blog App. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;