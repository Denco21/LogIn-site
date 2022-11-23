/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "script-src 'self';frame-ancestors 'none';style-src 'self';img-src 'none';connect-src 'self' http://127.0.0.1:8090 'unsafe-inline' ;frame-src 'none';font-src 'none';media-src 'none';object-src 'none';manifest-src 'none';prefetch-src 'none';form-action 'none';",
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  }
]

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      }
    ]
  }
}

module.exports = nextConfig

