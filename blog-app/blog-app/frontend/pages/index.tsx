// frontend/pages/index.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Blog App</title>
        <meta name="description" content="A simple blog application" />
      </Head>

      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Blog App</h1>
            <p className="text-lg mb-6">
              A full-stack application built with Go, Next.js, and MySQL
            </p>

            {user && (
              <p className="mb-2">
                Logged in as <span className="font-semibold">{user.username}</span>
              </p>
            )}

            <div className="flex gap-4">
              <Link 
                href="/posts" 
                className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-50"
              >
                View Posts
              </Link>
              <Link 
                href="/posts/new" 
                className="bg-blue-700 text-white px-4 py-2 rounded font-medium hover:bg-blue-800"
              >
                Create Post
              </Link>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>User authentication and management</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Create, edit, and view blog posts with a WYSIWYG editor</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Responsive design for desktop and mobile devices</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Static site generation for blog content</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/users"
                className="flex items-center p-3 bg-white rounded border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Manage Users</span>
              </Link>
              <Link
                href="/posts"
                className="flex items-center p-3 bg-white rounded border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span>View All Posts</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;