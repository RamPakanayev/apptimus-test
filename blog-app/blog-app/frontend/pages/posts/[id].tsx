// frontend/pages/posts/[id].tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  author_id: number;
  created_at: string;
  updated_at: string;
}

const PostDetailPage: React.FC = () => {
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
        setPost(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data || 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, isAuthenticated]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  const handleDeletePost = async () => {
    if (!post) return;
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/api/posts/${post.id}`);
        router.push('/posts');
      } catch (err: any) {
        setError(err.response?.data || 'Failed to delete post');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Link
          href="/posts"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Posts
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Post not found
        </div>
        <Link
          href="/posts"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Blog App</title>
      </Head>

      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <Link
            href="/posts"
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Posts
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <span>By {post.author}</span>
              <span className="mx-2">•</span>
              <span>Published on {new Date(post.created_at).toLocaleDateString()}</span>
              {post.updated_at !== post.created_at && (
                <>
                  <span className="mx-2">•</span>
                  <span>Updated on {new Date(post.updated_at).toLocaleDateString()}</span>
                </>
              )}
            </div>
            
            <div 
              className="prose max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {user && post.author_id === user.id && (
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Edit Post
                </Link>
                <button
                  onClick={handleDeletePost}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
};

export default PostDetailPage;