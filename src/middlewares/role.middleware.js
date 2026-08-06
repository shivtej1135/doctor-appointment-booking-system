const authorizeRoles = (...roles) => {
    // ...roles collects all allowed roles into an array.
    // Example:
    // authorizeRoles("admin")
    // roles = ["admin"]
    //
    // authorizeRoles("doctor", "admin")
    // roles = ["doctor", "admin"]

    return (req, res, next) => {
        // req.user was added by verifyToken middleware.
        // It contains the authenticated user's details.
        // Example:
        // req.user = {
        //     id: 1,
        //     name: "Mayank",
        //     role: "patient"
        // }

        // Check whether the logged-in user's role
        // is present in the allowed roles array.
        const verify = roles.includes(req.user.role);

        // If the role is not allowed,
        // return 403 (Authenticated but not Authorized).
        if (!verify) {
            return res.status(403).json({
                message: "Not Authorized"
            });
        }

        // User has the required role.
        // Continue to the next middleware/controller.
        next();
        
    };
};

module.exports = authorizeRoles;