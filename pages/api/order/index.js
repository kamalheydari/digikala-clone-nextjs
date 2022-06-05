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

    if (result.role !== "admin") {
      await db.connect();
      orders = await Order.find({ user: result.id }).populate(
        "user",
        "-password"
      );
    } else {
      orders = await Order.find().populate("user", "-password");
    }

    res.status(200).json({ orders });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res);

    const { address, mobile, cart, total } = req.body;

    await db.connect();
    const newOrder = new Order({
      user: result.id,
      address,
      mobile,
      cart,
      total,
    });

    //? update product beside on new order
    // cart.forEach((item) =>
    //   sold(item._id, item.quantity, item.inStock, item.sold)
    // );

    await newOrder.save();
    await db.disconnect();

    res.status(200).json({ msg: "سفاش شما ثبت شد ", newOrder });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

// const sold = async (id, quantity, oldStock, oldSold) => {
//   await Product.findOneAndUpdate(
//     { _id: id },
//     {
//       inStock: oldStock - quantity,
//       sold: quantity + oldSold,
//     }
//   );
// };
