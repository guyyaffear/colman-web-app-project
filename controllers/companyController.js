const Company = require("../models/company");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.companyById = (req, res, next, id) => {
    Company.findById(id).exec((err, company) => {
        if (err || !company) {
            return res.status(400).json({
                error: "Company does not exist"
            });
        }
        req.company = company;
        next();
    });
};

exports.create = (req, res) => {
    const company = new Company(req.body);
    company.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.read = (req, res) => {
    return res.json(req.category);
};


exports.update = (req, res) => {
    const company = req.company;
    company.name = req.body.name;
    company.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const company = req.category;
    company.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Category deleted"
        });
    });
};

exports.list = (req, res) => {
    Company.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
