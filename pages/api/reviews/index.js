import db from "lib/db";
import auth from "middleware/auth";
import Review from "models/Review";
import sendError from "utils/sendError";

export default async function (req, res) {
  switch (req.method) {
    case "GET":
      getReviews(req, res);
      break;

    default:
      break;
  }
}

const getReviews = async (req, res) => {
  try {
    const result = await auth(req, res);

    let reviews;

    await db.connect();

    if (!result.root) {
      reviews = await Review.find({ user: result.id })
        .populate("product", "images")
        .populate("user", "name");
    } else {
      reviews = await Review.find()
        .populate("product", "images")
        .populate("user", "name");
    }

    await db.disconnect();

    res.status(200).json({ reviews });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
