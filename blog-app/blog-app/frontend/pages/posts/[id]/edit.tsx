// frontend/pages/posts/[id]/edit.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import PostEditor from '../../../components/PostEditor';
import { useAuth } from '../../../context/AuthContext';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  author_id: number;
  created_at: string;
  updated_at: string;
}

const EditPostPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated, user } = useAuth();

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      if (!id || !isAuthenticated) {
        return;
      }

      try {
        const response = await axios.get(`/api/posts/${id}`);
        const fetchedPost = response.data;
        
        // Check if the current user is the author
        if (user && fetchedPost.author_id !== user.id) {
          setError('You can only edit your own posts');
          return;
        }
        
        setPost(fetchedPost);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data || 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, isAuthenticated, user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Post | Blog App</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        {post && <PostEditor post={post} isEditing={true} />}
      </div>
    </>
  );
};

export default EditPostPage;