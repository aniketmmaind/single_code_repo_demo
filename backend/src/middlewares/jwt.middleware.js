import jwt from "jsonwebtoken";

export const generateToken = (userData) => {
    // Note: Kept process.env.JWT_SECREAT matching your typo, but ensure your .env matches this spelling
    return jwt.sign(userData, process.env.JWT_SECREAT, { expiresIn: '1d' });
};

export const jwtAuthMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ error: "Authorization header not found" });
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Token not found" }); // Fixed comma to dot (.)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECREAT);
        req.user = decoded;
        next();
    } catch (error) {
        // Pass the error directly to the Express error handler instead of throwing it
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

// Exporting both individually and as a bundle for maximum compatibility
// export default { generateToken, jwtAuthMiddleware };
