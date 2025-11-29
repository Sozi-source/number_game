/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {}, // <-- fixes the error
};

module.exports = nextConfig;
