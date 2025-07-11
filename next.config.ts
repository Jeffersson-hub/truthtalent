/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;


export default nextConfig;
module.exports = {
  env: {
        AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
        AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
        AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME,
    },

    reactStrictMode: true,
};
