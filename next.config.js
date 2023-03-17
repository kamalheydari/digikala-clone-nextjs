module.exports = {
  env: {
    // local
    // MONGODB_URL: 'mongodb://127.0.0.1:27017/digikala-clone-nextjs',
    // atlas
    // MONGODB_URL:
    //   "mongodb+srv://digikala-clone-nextjs:digikala-clone-nextjs123456@cluster0.k5i8lxq.mongodb.net/?retryWrites=true&w=majority",
    // liara
    MONGODB_URL:
      "mongodb://root:9ngLaLUZFjnpylPPd85w98i0@esme.iran.liara.ir:31506/digikala-clone-nextjs?authSource=admin",
    NEXT_PUBLIC_ACCESS_TOKEN_SECRET:
      'h1n0U6LHJtCZuWitwjn3oLd5qCRIgUFtemnjTrpfZLzVZ3ff0f',
    ACCESS_TOKEN_SECRET: 'h1n0U6LHJtCZuWitwjn3oLd5qCRIgUFtemnjTrpfZLzVZ3ff0f',
    NEXT_PUBLIC_CLOUD_UPDATE_PRESET: 'nextjs_store',
    NEXT_PUBLIC_CLOUD_NAME: 'djvgq77b0',
    NEXT_PUBLIC_CLOUD_API:
      'https://api.cloudinary.com/v1_1/djvgq77b0/image/upload',
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'digikala-clone-heydari-db.storage.iran.liara.space',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: '@svgr/webpack',
    })
    return config
  },
}
