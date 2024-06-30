import { jwtVerify } from "jose";

const SECRET_KEY = "SECRET_KEY";
export default function POST(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwtVerify(token, SECRET_KEY);
    return res.status(200).json({ message: "Protected Data", user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
