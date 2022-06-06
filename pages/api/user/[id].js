import db from "lib/db";
import User from "models/User";
import auth from "middleware/auth";
import sendError from "utils/sendError";

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateRole(req, res);
      break;

    case "DELETE":
      await deleteUser(req, res);
      break;
  }
};

const updateRole = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== "admin")
      sendError(res, 400, "توکن احراز هویت نامعتبر است");

    const { id } = req.query;
    const { role } = req.body;

    await db.connect();
    await User.findOneAndUpdate({ _id: id }, { role });
    await db.disconnect();

    res.status(200).json({ msg: "اطلاعات کاربری با موفقیت به روز رسانی شد" });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== "admin" || !result.root)
      sendError(res, 400, "توکن احراز هویت نامعتبر است");

    const { id } = req.query;

    await db.connect();
    await User.findByIdAndDelete( id );
    await db.disconnect();

    res.status(200).json({ msg: "کاربر با موفقیت حذف شد" });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

