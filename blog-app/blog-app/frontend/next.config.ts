/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Configure turbopack correctly
    turbo: {
      // Optional turbo settings
    }
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:8080/api/:path*',
      },
    ];
  }
};

export default nextConfig;