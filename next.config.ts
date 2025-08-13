/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⚠️ This allows builds to succeed even with ESLint errors
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
}

module.exports = nextConfig





