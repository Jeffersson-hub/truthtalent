const nextConfig = {
  env: {
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  },
  experimental: {
    serverActions: true,
    allowedDevOrigins: [
      "https://3000-jeffersson-hub-truthtale-vsrpzxnz3a.app.codeanywhere.com", // ton URL exacte
    ],
  },
};

export default nextConfig;
