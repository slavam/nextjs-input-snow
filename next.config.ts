import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["10.54.1.12"]
    },
  }
}  
module.exports = nextConfig
