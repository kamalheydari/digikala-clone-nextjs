import sendError from "utils/sendError";
import jwt from "jsonwebtoken";
import Users from "models/User";
import db from "lib/db";

export default async function auth(req, res) {
  const token = req.headers.authorization;

  if (!token) sendError(res, 403, "توکن احراز هویت نامعتبر است");

  const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded) sendError(res, 403, "توکن احراز هویت نامعتبر است");

  await db.connect();
  const user = await Users.findOne({ _id: decoded.id });
  await db.disconnect();

  return { id: decoded.id, role: user.role, root: user.root };
}
