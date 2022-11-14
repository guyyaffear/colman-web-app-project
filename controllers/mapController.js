const Map = require("../models/map");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.addressById = (req, res, next, id) => {
  Map.findById(id).exec((err, map) => {
    if (err || !map) {
      return res.status(400).json({
        error: "address not found",
      });
    }
    const id = map.id;
    console.log(id);
    req.map = map;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.map);
};

exports.create = (req, res) => {
  console.log("create map with req: ", req.body);
  const map = Map(req.body);
  map.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.update = (req, res) => {
  const map = req.map;
  map.name = req.body.name;
  map.longitude = req.body.longitude;
  map.latitude = req.body.latitude;
  map.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const map = req.map;
  map.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "adresss deleted",
    });
  });
};

exports.list = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Map.find()
    .limit(limit)
    .exec((err, addresses) => {
      if (err) {
        return res.status(400).json({
          error: "addresses not found",
        });
      }
      res.json(addresses);
    });
};
