/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.js
const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  reactStrictMode: false,
  experimental: { esmExternals: "loose" },
});
