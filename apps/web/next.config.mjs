/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // @commet/shared ships TypeScript source (main -> src/index.ts), so Next must transpile it.
  transpilePackages: ['@commet/shared'],
};

export default nextConfig;
