import Order from "models/Order";
import db from "lib/db";

import auth from "middleware/auth";
import sendError from "utils/sendError";

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await deliveredOrder(req, res);
      break;
  }
};

const deliveredOrder = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (!result.root) return sendError(res, 400, "توکن احراز هویت نامعتبر است");

    const { id } = req.query;

    await db.connect();
    await Order.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    await db.disconnect();

    res.status(200).json({
      msg: "وضعیت سفارش بروزرسانی شد",
    });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
