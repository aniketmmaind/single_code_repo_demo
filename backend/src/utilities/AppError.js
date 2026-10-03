// utils/AppError.js
class AppError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message);
        this.statusCode = statusCode;
        // Standard status classification (4xx = fail, 5xx = error)
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        // Distinguishes trusted operational errors from unknown system bugs
        this.isOperational = true;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;