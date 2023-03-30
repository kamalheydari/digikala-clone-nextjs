/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  images: {
    domains: [
      'res.cloudinary.com',
      'digikala-clone-heydari-db.storage.iran.liara.space',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: '@svgr/webpack',
    })
    return config
  },
}
