
/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 
      'firebasestorage.googleapis.com'
    ],
    minimumCacheTTL: 1500000,
  },
}

module.exports = { nextConfig }

