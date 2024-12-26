/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};


export default {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
}

// export default nextConfig;
