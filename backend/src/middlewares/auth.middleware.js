import AppError from "../utilities/AppError.js";

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return next(new AppError("Access denied. You do not have permission to perform this action.", 403));
        }
        next();
    };
};

// middlewares/authMiddleware.js 
export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let userMessage = err.message || "Something went wrong, please try again later.";
    let internalErrorDetails = err.details || null;

    // Log full error details on the server for debugging
    console.error("💥 SYSTEM LOG ERROR:", {
        name: err.name,
        message: err.message,
        stack: err.stack,
        isOperational: err.isOperational,
    });

    // Handle Mongoose Validation / Duplicate Key Errors automatically
    if (err.name === "ValidationError") {
        statusCode = 400;
        userMessage = "Invalid input data provided.";
        internalErrorDetails = Object.values(err.errors).map((e) => e.message);
    }

    if (err.code === 11000) {
        statusCode = 400;
        userMessage = "A record with that value already exists.";
        internalErrorDetails = err.keyValue;
    }

    // Hide internal server details in production unless explicitly operational
    const isProduction = process.env.NODE_ENV === "production";

    if (isProduction && !err.isOperational) {
        userMessage = "Something went wrong, please try again later.";
        internalErrorDetails = null; // Clean output for end-users
    }

    res.status(statusCode).json({
        status: false,
        message: userMessage, // Clean, user-friendly message
        ...(internalErrorDetails && { errorDetails: internalErrorDetails }),
        ...(!isProduction && { rawError: err.message, stack: err.stack }), // Stack traces for dev only
    });
};


