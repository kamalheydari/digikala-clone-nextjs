import Order from "models/Order";
import auth from "middleware/auth";
import db from "lib/db";
import sendError from "utils/sendError";
import Product from "models/Product";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;

    case "GET":
      await getOrders(req, res);
      break;
  }
};

const getOrders = async (req, res) => {
  try {
    const result = await auth(req, res);

    let orders;

    await db.connect();
    if (!result.root) {
      orders = await Order.find({ user: result.id }).populate(
        "user",
        "-password -address"
      );
    } else {
      orders = await Order.find().populate("user", "-password -address");
    }
    await db.disconnect();

    res.status(200).json({ orders });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { cart } = req.body;

    await db.connect();
    const newOrder = new Order({
      user: result.id,
      ...req.body,
    });

    //? update product beside on new order
    cart.forEach((item) =>
      sold(item.productID, item.quantity, item.inStock, item.sold)
    );

    await newOrder.save();
    await db.disconnect();

    res.status(200).json({ msg: "سفاش شما ثبت شد " });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const sold = async (id, quantity, oldStock, oldSold) => {
  await Product.findOneAndUpdate(
    { _id: id },
    {
      inStock: oldStock - quantity,
      sold: quantity + oldSold,
    }
  );
};
