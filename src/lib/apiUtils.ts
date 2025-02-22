import jwt from "jsonwebtoken";

type GenerateTokenPayload = {
    id: string;
    email: string;
}

type TokenDecodedResp = {
    userId: string;
    email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateToken = ({id, email}: GenerateTokenPayload): string => {
    return jwt.sign(
        {
            userId: id,
            email: email,
        },
        JWT_SECRET,
        {
            // ~10 ans (365 jours * 10)
            expiresIn: "3650d",
        }
    );
}

export const extractToken = (request: Request) => {
    const authHeader = request.headers.get("Authorization") || "";

    if (!authHeader.startsWith("Bearer ")) {
        return false
    }
    const token = authHeader.substring(7)

    const decoded = jwt.verify(token, JWT_SECRET) as TokenDecodedResp;

    return decoded
}