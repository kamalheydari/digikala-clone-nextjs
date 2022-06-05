import Order from "models/Order";
import auth from "middleware/auth";
import db from "lib/db";
import sendError from "utils/sendError";

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await deliveredOrder(req, res);
      break;
  }
};

const deliveredOrder = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== "admin")
      sendError(res, 400, "توکن احراز هویت نامعتبر است");

    const { id } = req.query;

    await db.connect();
    await Order.findOneAndUpdate(
      { _id: id },
      {
        paid: true,
        dateOfPayment: new Date().toISOString(),
        method: "پرداخت در محل",
        deliverd: true,
      }
    );
    await db.disconnect();

    res.status(200).json({
      msg: "وضعیت سفارش بروزرسانی شد",
      paid: true,
      dateOfPayment: new Date().toISOString(),
      method: "پرداخت در محل",
      deliverd: true,
    });
    
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
