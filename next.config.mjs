/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.gr-assets.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
