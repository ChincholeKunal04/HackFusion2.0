import jwt from "jsonwebtoken";

const verifyAdmin = async (req, res, next) => {
    const token = req.headers['authorization']?.replace("Bearer ", "");
    // console.log("Token Received:", token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded Token:", decoded);

        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Unauthorized user. Admins only"
            });
        }
        req.user = decoded;
        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Invalid or expored token."
        });
    }
};

export { verifyAdmin };