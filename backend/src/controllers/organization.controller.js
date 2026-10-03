import OrganizationServices from "../services/organization.services.js";

class OrganizationController {

    static create = async (req, res, next) => {
        try {
            console.log("req: ", req.body);
            const organization = await OrganizationServices.create(req.body);
            res.status(201).json({ status: true, data: organization });
        } catch (error) {
            next(error);
        }
    }

    static getAll = async (req, res, next) => {
        try {
            const { data, pagination } = await OrganizationServices.getAll(req.query);
            res.status(200).json({ status: true, data, pagination });
        } catch (error) {
            next(error);
        }
    }

    static getById = async (req, res, next) => {
        try {
            const organization = await OrganizationServices.getById(req.params.id);
            res.status(200).json({ status: true, data: organization });
        } catch (error) {
            next(error);
        }
    }

    //controller to get org by name
    static getByOrganizationName = async (req, res, next) => {
        try {
            const orgName = req.params.name;
            console.log("orgName: ", orgName);
            const organization = await OrganizationServices.getByOrgnizationName(orgName);
            res.status(200).json({ status: true, data: organization });
        } catch (error) {
            next(error);
        }
    }

    static update = async (req, res, next) => {
        try {
            const organization = await OrganizationServices.update(req.params.id, req.body);
            res.status(200).json({ status: true, data: organization });
        } catch (error) {
            next(error);
        }
    }


}

export default OrganizationController;