// next.config.js - Enhanced version
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false, // Changed this line
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com'],
  },
};

module.exports = withPWA(nextConfig);