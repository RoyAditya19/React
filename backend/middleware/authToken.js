const jwt = require("jsonwebtoken");
const cookie = require("cookie");

async function authToken(req, res, next) {
    try {
        // Access cookie header and parse it to extract the token
        const cookieHeader = req.headers.cookie;
        const cookies = cookie.parse(cookieHeader || '');
        const token = cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized! Please Login...!",
                success: false,
                error: true
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                console.error("Error verifying token:", err);
                return res.status(401).json({
                    message: "Unauthorized",
                    success: false,
                    error: true
                });
            }

            req.userId = decoded._id;

            next();
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}

module.exports = authToken;
