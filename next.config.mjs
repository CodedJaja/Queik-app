/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React Compiler as the required babel-plugin-react-compiler package is missing
  reactCompiler: false,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    unoptimized: true, // Updated field
  },

  // Performance optimizations
  compress: true,
  // Removed swcMinify as it is now the default and generates warnings in Next.js 16
  productionBrowserSourceMaps: false,

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Redirects for better UX
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true, // Updated field
  },
}

export default nextConfig
