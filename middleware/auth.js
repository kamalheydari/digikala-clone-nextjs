import sendError from "utils/sendError";
import jwt from "jsonwebtoken";
import Users from "models/User";
import db from "lib/db";

export default async function auth(req, res) {
  const token = req.headers.authorization;

  if (!token) sendError(res, 400, "توکن احراز هویت نامعتبر است");

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded) sendError(res, "توکن احراز هویت نامعتبر است", 400);

  db.connect();
  const user = await Users.findOne({ _id: decoded.id });
  db.disconnect();

  return { id: user._id, role: user.role, root: user.root };
}
