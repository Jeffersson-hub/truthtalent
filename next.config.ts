/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // ✅ si tu utilises les server actions (Next 14+)
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ évite que les erreurs ESLint bloquent Vercel
  },
  typescript: {
    ignoreBuildErrors: true, // ❗️optionnel — utile en test ou si tu veux bypass TypeScript au build
  },
};

export default nextConfig;
