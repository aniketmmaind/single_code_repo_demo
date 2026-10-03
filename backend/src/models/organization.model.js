import mongoose from "mongoose";
import { EMAIL_REGEX } from "../utilities/mongoHelpers.js";

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Organization name is required."],
            trim: true,
            maxlength: 150,
        },
        addressLines: [{ type: String, trim: true }],
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },   // String: keeps leading zeros, UK/CA formats
        country: { type: String, trim: true },
        isCash: { type: Boolean, default: false },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            match: [EMAIL_REGEX, "Please provide a valid email address."],
            set: (value) => value || undefined,   // "" becomes "not set" so sparse unique works
            unique: true,
            sparse: true,
        },
        telephone: { type: String, trim: true, maxlength: 30 },
        contactName: { type: String, trim: true },
        legalBasisForProcessingData: { type: String, trim: true },
    },
    { timestamps: true }
);

organizationSchema.index({ name: 1 });

const OrganizationModel = mongoose.model("Organization", organizationSchema);

export default OrganizationModel;