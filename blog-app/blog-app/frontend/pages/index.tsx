import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Blog App</title>
        <meta name="description" content="A full-stack blog application" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-4">Welcome to the Blog App</h1>
        <p className="mb-4">
          This is a full-stack application built with:
        </p>
        <ul className="list-disc pl-5 mb-6">
          <li>Next.js (Frontend)</li>
          <li>Go (Backend)</li>
          <li>MySQL (Database)</li>
        </ul>
        <div className="mt-4">
          <a href="/api/health" className="text-blue-600 hover:underline">
            Check API Health
          </a>
        </div>
      </main>
    </div>
  );
}