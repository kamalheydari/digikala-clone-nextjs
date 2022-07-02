import db from "lib/db";
import Products from "models/Product";
import auth from "middleware/auth";
import sendError from "utils/sendError";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;

    case "PUT":
      await updateProduct(req, res);
      break;

    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;

    db.connect();
    const product = await Products.findById(id);
    db.disconnect();

    if (!product) return sendError(res, 500, "این محصول موجود نمیباشد");

    res.status(200).json({ product });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (!result.root) return sendError(res, 400, "توکن احراز هویت نامعتبر است");

    const { id } = req.query;

    const {
      title,
      price,
      discount,
      description,
      images,
      sizes,
      colors,
      category,
      inStock,
      info,
      specification,
    } = req.body;

    if (
      !title ||
      !price ||
      !inStock ||
      !category ||
      images.length === 0 ||
      info.length === 0 ||
      specification.length === 0
    )
      return sendError(res, 400, "لطفا تمام فیلد ها را پر کنید");

    await db.connect();
    await Products.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    await db.disconnect();

    res.status(200).json({ msg: "اطلاعات محصول با موفقیت بروزرسانی شد" });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (!result.root) return sendError(res, 400, "توکن احراز هویت نامعتبر است");

    const { id } = req.query;

    await db.connect();
    await Products.findByIdAndDelete(id);
    await db.disconnect();

    res.status(200).json({ msg: "محصول با موفقیت حذف شد" });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
