/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ypescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://cms-centropool.vercel.app/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
