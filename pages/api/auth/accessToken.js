import db from "lib/db";
import User from "models/User";
import sendError from "utils/sendError";
import { createAccessToken } from "utils/generateToken";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) sendError(res, 400, "لطفا ابتدا وارد وبسایت شوید");

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result)
      sendError(res, 400, "توکن احراز هویت نادرست است یا منقضی شده است");

    await db.connect();
    const user = await User.findById(result.id);
    if (!user) sendError(res, 400, "این کاربر وجود ندارد");
    await db.disconnect();

    const access_token = createAccessToken({ id: user._id });

    res.status(200).json({
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};
