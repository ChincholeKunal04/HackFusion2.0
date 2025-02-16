
const verifyStudent = async (req, res, next) => {
    if(req.user.role !== "student") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Unauthorized user. Admins only"
        });
    }
    naxt();
}

export { verifyStudent };