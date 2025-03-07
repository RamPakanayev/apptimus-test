// frontend/pages/posts/new.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PostEditor from '../../components/PostEditor';
import { useAuth } from '../../context/AuthContext';

const NewPostPage: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Create New Post | Blog App</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <PostEditor />
      </div>
    </>
  );
};

export default NewPostPage;