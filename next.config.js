/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@nextui-org/react", "@nextui-org/theme"],
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
