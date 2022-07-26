import Review from "models/Review";

export default async function (req, res) {
  switch (req.method) {
    case "GET":
      await getReviews(req, res);
      break;

    default:
      break;
  }
}

const getReviews = async (req, res) => {
  const reviews = await Review.find({
    product: req.query.id,
    status: 2,
  }).populate("user", "name");

  res.status(200).json({ reviews });
};
