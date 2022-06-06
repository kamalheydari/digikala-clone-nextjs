import db from "lib/db";
import User from "models/User";
import auth from "middleware/auth";
import sendError from "utils/sendError";
import bcrypt from "bcrypt";

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await resetPassword(req, res);
      break;
  }
};

const resetPassword = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { password } = req.body;

    const hashPassword = await bcrypt.hash(password, 12);

    await db.connect();
    await User.findOneAndUpdate({ _id: result.id }, { password: hashPassword });
    await db.disconnect();

    res.status(200).json({ msg: "رمز عبور به روزرسانی شد" });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
