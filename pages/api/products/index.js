import sendError from "utils/sendError";
import Products from "models/Product";
import auth from "middleware/auth";
import db from "lib/db";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;

    case "POST":
      await createProduct(req, res);
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    await db.connect();
    const products = await Products.find();
    await db.disconnect();

    res.status(200).json({
      result: products.length,
      products,
    });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (!result.root) return sendError(res, 400, "توکن احراز هویت نامعتبر است");

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
    const newProduct = new Products({
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
    });
    await newProduct.save();
    await db.disconnect();

    res.status(201).json({ msg: "محصول جدید با موفقیت اضافه شد" });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
