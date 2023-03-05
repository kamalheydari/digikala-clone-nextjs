export default function sendError(res, statusCode, msg) {
  res.status(statusCode).json({ err: msg })
}
