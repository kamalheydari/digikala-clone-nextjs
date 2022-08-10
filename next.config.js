module.exports = {
  env: {
    NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
    MONGODB_URL: "mongodb://localhost:27017/digikala-clone-nextjs",
    // MONGODB_URL: "mongodb+srv://digikala-clone-nextjs:digikala-clone-nextjs123456@cluster0.k5i8lxq.mongodb.net/digikala-clone-nextjs?retryWrites=true&w=majority",
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
