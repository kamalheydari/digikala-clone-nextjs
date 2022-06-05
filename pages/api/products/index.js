import sendError from "utils/sendError";
import Products from "models/Products";
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

    if (result.role !== "admin")
      sendError(res, 400, "توکن احراز هویت نامعتبر است");

    const {
      title,
      price,
      inStock,
      description,
      content,
      category,
      images,
    } = req.body;

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    )
      sendError(res, 400, "لطفا تمام فیلد ها را پر کنید");

    await db.connect();
    const newProduct = new Products({
      title,
      price,
      inStock,
      description,
      content,
      category,
      images,
    });
    await newProduct.save();
    await db.disconnect();

    res.status(201).json({ msg: "محصول جدید باموفقیت اضافه شد" });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
