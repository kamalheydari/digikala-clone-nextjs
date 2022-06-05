import Categories from "models/Category";
import Product from "models/Product";
import auth from "middleware/auth";
import db from "lib/db";
import sendError from "utils/sendError";

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateCategory(req, res);
      break;

    case "DELETE":
      await deleteCategory(req, res);
      break;
  }
};
const updateCategory = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== "admin")
      sendError(res, 400, "توکن احراز هویت نامعتبر است");

    const { id } = req.query;
    const { name } = req.body;

    await db.connect();
    const newCategory = await Categories.findOneAndUpdate(
      { _id: id },
      { name }
    );
    await db.disconnect();

    res.status(200).json({ msg: "دسته بندی با موفقیت بروزرسانی شد" });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
const deleteCategory = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== "admin")
      sendError(res, 400, "توکن احراز هویت نامعتبر است");

    const { id } = req.query;

    await db.connect();
    const products = await Product.findOne({ category: id });
    if (products)
      sendError(
        res,
        400,
        "لطفا تمام محصولات مربوط به این دسته بندی را حذف کنید"
      );
    await Categories.findByIdAndDelete(id);
    await db.disconnect();

    res.status(200).json({ msg: "دسته بندی با موفقیت حذف شد" });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
