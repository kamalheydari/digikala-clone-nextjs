import db from "lib/db";
import User from "models/User";
import auth from "middleware/auth";
import sendError from "utils/sendError";

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await uploadInfo(req, res);
      break;

    case "GET":
      await getUsers(req, res);
      break;
  }
};

const uploadInfo = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { name, avatar } = req.body;

    await db.connect();
    const newUser = await User.findOneAndUpdate(
      { _id: result.id },
      { name, avatar }
    );
    await db.disconnect();

    res.status(201).json({
      msg: "اطلاعات کاربری با موفقیت به روز رسانی شد",
      user: { name, avatar, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== "admin")
      return sendError(res, 400, "توکن احراز هویت نامعتبر است");

    await db.connect();
    const users = await User.find().select("-password");
    await db.disconnect();

    res.status(200).json({ users });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
