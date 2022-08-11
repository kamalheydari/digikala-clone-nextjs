module.exports = {
  env: {
    // NEXT_PUBLIC_BASE_URL: "https://digikala-clone-heydari.iran.liara.run",
    // MONGODB_URL:
    //   "mongodb://root:3F6NVtZZctS0lfIzeWUJsjuT@finn.iran.liara.ir:34423/digikala-clone-nexjs?authSource=admin",
    NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
    MONGODB_URL: "mongodb://localhost:27017/digikala-clone-nextjs",
    NEXT_PUBLIC_ACCESS_TOKEN_SECRET:
      "h1n0U6LHJtCZuWitwjn3oLd5qCRIgUFtemnjTrpfZLzVZ3ff0f",
    ACCESS_TOKEN_SECRET: "h1n0U6LHJtCZuWitwjn3oLd5qCRIgUFtemnjTrpfZLzVZ3ff0f",
    NEXT_PUBLIC_CLOUD_UPDATE_PRESET: "nextjs_store",
    NEXT_PUBLIC_CLOUD_NAME: "djvgq77b0",
    NEXT_PUBLIC_CLOUD_API:
      "https://api.cloudinary.com/v1_1/djvgq77b0/image/upload",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    outputStandalone: true,
  },
};
