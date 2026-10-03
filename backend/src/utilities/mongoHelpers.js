import AppError from "./AppError.js";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strict 24-hex check (mongoose.isValidObjectId also accepts any 12-char string)
export const assertValidObjectId = (id, label = "ID") => {
    if (!/^[0-9a-fA-F]{24}$/.test(String(id))) {
        throw new AppError(`Invalid ${label}.`, 400);
    }
};

export const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Whitelist fields so clients can't write _id, createdAt, etc.
export const pick = (obj = {}, fields = []) =>
    fields.reduce((acc, field) => {
        if (obj[field] !== undefined) acc[field] = obj[field];
        return acc;
    }, {});

// Case-insensitive "contains" search across several fields.
// String() prevents ?search[$ne]=x style operator injection.
export const buildSearchFilter = (search, fields) => {
    if (!search) return {};
    const text = String(search).trim();
    if (!text) return {};
    const regex = new RegExp(escapeRegex(text), "i");
    return { $or: fields.map((field) => ({ [field]: regex })) };
};

// Turns Mongoose/Mongo errors into AppError so nothing leaks as a 500
export const handleMongooseError = (error) => {
    if (error instanceof AppError) throw error;

    if (error.code === 11000) {
        const field = Object.keys(error.keyPattern || {})[0] || "value";
        throw new AppError(`A record with this ${field} already exists.`, 409);
    }
    if (error.name === "ValidationError") {
        const message = Object.values(error.errors).map((e) => e.message).join(" ");
        throw new AppError(message, 400);
    }
    if (error.name === "CastError") {
        throw new AppError(`Invalid value for ${error.path}.`, 400);
    }
    throw error;
};