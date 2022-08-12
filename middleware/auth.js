import sendError from "utils/sendError";
import jwt from "jsonwebtoken";
import Users from "models/User";
import db from "lib/db";
import mongoose from "mongoose";

export default async function auth(req, res) {
  const token = req.headers.authorization;

  if (!token) sendError(res, 400, "توکن احراز هویت نامعتبر است");

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded) sendError(res, 400, "توکن احراز هویت نامعتبر است");

  db.connect();
  const user = await Users.findOne({ _id: decoded.id });
  db.disconnect();

  return { id: decoded.id, role: user.role, root: user.root };
}
