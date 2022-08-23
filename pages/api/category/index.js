import Category from "models/Category";
import db from "lib/db";

import auth from "middleware/auth";
import sendError from "utils/sendError";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;

    case "GET":
      await getCategories(req, res);
      break;

    default:
      break;
  }
};

const createCategory = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (!result.root)
      return sendError(res, 403, "شما اجازه انجام این عملیات را ندارید");

    const { name } = req.body;
    if (!name) return sendError(res, 204, "نام دسته بندی نباید خالی باشد");

    await db.connect();
    const newCategory = new Category({ ...req.body });
    await newCategory.save();
    await db.disconnect();

    res
      .status(201)
      .json({ msg: "ساخت دسته بندی جدید موفقیت آمیز بود", newCategory });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const getCategories = async (req, res) => {
  try {
    await db.connect();
    const categories = await Category.find();
    await db.disconnect();

    res.status(200).json({ categories });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
