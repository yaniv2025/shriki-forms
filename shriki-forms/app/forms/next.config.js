/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/forms',
          permanent: true,
        },
      ]
    },
  }
  
  module.exports = nextConfig
  