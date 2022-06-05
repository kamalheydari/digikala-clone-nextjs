export default function sendError(res, status, msg) {
  res.status(status).json({ err: msg });
}
