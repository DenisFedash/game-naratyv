/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          port: "",
          pathname: "/dq2k7fjmw/**",
        },
      ],
      // domains: ['api-backend.naratyv-creative.fun'],
    },
  };
  
  module.exports = nextConfig;


