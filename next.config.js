// /**
//  * @type {import('next/dist/next-server/server/config').NextConfig}
//  **/
// const config = {
//   reactStrictMode: true,
//   trailingSlash: true,
//   images: {
//     loader: 'custom',
//     path: '/',
//   },
//   compress: true,
//   amp: {
//     // Configure AMP to be enabled by default
//     // Can be 'false', 'true', or 'hybrid' for hybrid AMP
//     // 'hybrid' will generate both AMP and non-AMP versions
//     // 'true' will generate only AMP versions
//     hybrid: true, // or true if you want only AMP versions
//   },
  
// }

// module.exports = config




/// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  reactStrictMode: true,
  trailingSlash: true,
  compress: true,
  images: {
    // ✅ Remove 'loader' and 'path'
    // Optionally add 'domains' if using remote images
  },
};

module.exports = withBundleAnalyzer(config);
