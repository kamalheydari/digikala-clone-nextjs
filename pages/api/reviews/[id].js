import db from "lib/db";
import Product from "models/Product";
import Review from "models/Review";

import auth from "middleware/auth";
import sendError from "utils/sendError";

export default async function (req, res) {
  switch (req.method) {
    case "POST":
      await createReview(req, res);
      break;
    case "GET":
      await getReview(req, res);
      break;
    case "DELETE":
      await deleteReview(req, res);
      break;
    case "PATCH":
      await updateReview(req, res);
      break;

    default:
      break;
  }
}

const createReview = async (req, res) => {
  try {
    const result = await auth(req, res);

    await db.connect();

    const newReview = new Review({
      user: result.id,
      product: req.query.id,
      ...req.body,
    });

    await newReview.save();
    await db.disconnect();

    res.status(201).json({
      msg: "نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده میشود",
    });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const getReview = async (req, res) => {
  try {
    await db.connect();

    const review = await Review.findOne({ _id: req.query.id })
      .populate("product", "images")
      .populate("user", "name");

    await db.disconnect();

    res.status(200).json({ review });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const deleteReview = async (req, res) => {
  try {
    await db.connect();

    await Review.findByIdAndDelete(req.query.id);

    await db.disconnect();

    res.status(200).json({ msg: "دیدگاه با موفقیت حذف شد" });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const updateReview = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (!result) return sendError(res, 400, "توکن احراز هویت نامعتبر است");

    await db.connect();

    const review = await Review.findOneAndUpdate(
      { _id: req.query.id },
      { ...req.body }
    );

    const product = await Product.findOne({ _id: review.product });
    const reviews = await Review.find({ product: product._id });

    let { totalRating, totalReviews } = await reviews.reduce(
      (total, item) => {
        if (item.status === 2) {
          total.totalRating += item.rating;
          total.totalReviews += 1;
        }
        return total;
      },
      { totalRating: 0, totalReviews: 0 }
    );

    product.numReviews = totalReviews;
    product.rating = totalRating / totalReviews;
    await product.save();

    await db.disconnect();

    res.status(201).json({
      msg: "وضعیت دیدگاه با موفقیت به روز رسانی شد",
    });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
