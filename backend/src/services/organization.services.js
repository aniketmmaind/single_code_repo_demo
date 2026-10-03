import OrganizationModel from "../models/organization.model.js";
import AppError from "../utilities/AppError.js";
import { paginate } from "../utilities/pagination.js";
import {
    assertValidObjectId,
    buildSearchFilter,
    handleMongooseError,
    pick,
} from "../utilities/mongoHelpers.js";

const ALLOWED_FIELDS = [
    "name", "addressLines", "city", "state", "zipCode", "country",
    "isCash", "email", "telephone", "contactName", "legalBasisForProcessingData",
];

class OrganizationServices {


    static async create(data) {
        try {
            console.log("data: ", data);
            return await OrganizationModel.create(pick(data, ALLOWED_FIELDS));
        } catch (error) {
            handleMongooseError(error);
        }
    }

    static async getAll(query) {
        console.log("inside getAll");
        const filter = buildSearchFilter(query.search, ["name", "email"]);

        if (query.isCash === "true" || query.isCash === "false") {
            filter.isCash = query.isCash === "true";
        }

        return paginate(OrganizationModel, filter, query);
    }

    static async getById(id) {
        assertValidObjectId(id, "organization ID");

        const organization = await OrganizationModel.findById(id);
        if (!organization) {
            throw new AppError("Organization not found.", 404);
        }
        return organization;
    }

    //get org by it name
    static async getByOrgnizationName(name) {
        // Add a helper function or inline regex escaping to prevent RegExp injection
        const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        if (!name) {
            throw new AppError("Organization name query parameter is required.", 400);
        }

        const safeName = escapeRegex(name);
        // SQL equivalent: WHERE name LIKE '%name%' (case-insensitive)
        const organizations = await OrganizationModel.find({
            name: { $regex: name, $options: "i" }
        },
            { _id: 1, name: 1 }
        ).lean();

        if (!organizations || organizations.length === 0) {
            throw new AppError("No organizations found matching the given name.", 404);
        }
        return organizations;
    }

    static async update(id, data) {
        const organization = await this.getById(id);

        const updates = pick(data, ALLOWED_FIELDS);
        if (!Object.keys(updates).length) {
            throw new AppError("No valid fields provided to update.", 400);
        }

        try {
            organization.set(updates);
            return await organization.save();   // save() runs all validators
        } catch (error) {
            handleMongooseError(error);
        }
    }


}

export default OrganizationServices;