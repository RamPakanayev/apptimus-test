// frontend/pages/posts/index.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  author_id: number;
  created_at: string;
  updated_at: string;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [isAuthenticated]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  const handleDeletePost = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/api/posts/${id}`);
        setPosts(posts.filter(post => post.id !== id));
      } catch (err: any) {
        setError(err.response?.data || 'Failed to delete post');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Posts | Blog App</title>
      </Head>

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Posts</h1>
          <Link
            href="/posts/new"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create New Post
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">No posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="text-sm text-gray-600 mb-4">
                    <span>By {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <div 
                    className="prose prose-sm mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content.substring(0, 150) + '...' 
                    }}
                  />
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Read more →
                    </Link>
                    {user && post.author_id === user.id && (
                      <div className="flex space-x-2">
                        <Link
                          href={`/posts/${post.id}/edit`}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PostsPage;