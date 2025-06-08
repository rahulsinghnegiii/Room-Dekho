/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'], // Add any image domains you'll use
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig; 