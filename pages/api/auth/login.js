import db from "lib/db";
import User from "models/User";
import bcrypt from "bcrypt";
import sendError from "utils/sendError";
import { createAccessToken, } from "utils/generateToken";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        db.connect();

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return sendError(res, 400, "کاربری با این ایمیل یافت نشد");

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
          return sendError(res, 400, "آدرس ایمیل یا کلمه عبور اشتباه است");

        const access_token = createAccessToken({ id: user._id });

        res.json({
          msg: "ورود موفقیت آمیز بود",
          data: {
            access_token,
            user: {
              name: user.name,
              email: user.email,
              mobile: user.mobile,
              role: user.role,
              root: user.root,
            },
          },
        });
      } catch (error) {
        sendError(res, 500, error.message);
      }
      break;
  }
};
