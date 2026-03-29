import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    const token = request.cookies.get("token")?.value;
    if (!token) throw new Error("No authentication token provided");

    const jwtSecret = process.env.TOKEN_SECRET as string || "dev-secret";
    const decodedToken: any = jwt.verify(token, jwtSecret);
    // token payload uses `id` (set during login), return that id
    if (!decodedToken || !decodedToken.id) throw new Error("Invalid token payload");
    return decodedToken.id;
};