module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
}
/**
// next.config.js
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
*/