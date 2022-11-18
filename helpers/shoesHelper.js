const shoesModel = require("../models/shoes");
const { ObjectId } = require("mongodb");

async function getShoesByCompany(category = "general") {
  const items = await shoesModel.find({ category: category.toLowerCase() });
  return items;
}

async function addShoes({ name, company, size, price,quantity, photo = "" }) {
  if (!name || !price || !company || !size || !quantity) 
    throw { code: 400, message: "Shoes Must have title and price" };

  const item = await shoesModel.findOne({
    name: name.toLowerCase(),
    company: company.toLowerCase(),
  });

  if (parseFloat(price) <= 0) {
    throw { code: 400, message: "Shoes must be greater than 0" };
  }
  if (!item) {
    try {
      return new shoesModel({
        name: company.toLowerCase(),
        company: company.toLowerCase(),
        price: parseFloat(price),
        size:parseFloat(size),
        quantity:parseInt(quantity),
        image:photo,
      }).save();
    } catch (error) {
      return error;
    }
  } else {
    return { code: 400, message: "Shoes already exists" };
  }
}

async function getShoesById(id) {
  return await shoesModel.findById(ObjectId(id));
}

async function updateProduct({ shoesId, name, company, size, price,quantity, photo}) {
  try {
    const item = await shoesModel.findOneAndUpdate(
      { _id: ObjectId(shoesId) },
      {
        $set: {
          title: title.toLowerCase(),
          category: category.toLowerCase(),
          price: parseFloat(price),
          image,
        },
      }
    );

    if (item) {
      return item;
    } else {
      throw new Error();
    }
  } catch (error) {
    return null;
  }
}

async function removeShoes(shoesId) {
  try {
    const remove = await shoesModel.findOneAndDelete({
      _id: ObjectId(shoesId),
    });

    return remove;
  } catch (error) {
    throw new Error();
  }
}

module.exports = {
  getShoesByCompany,
  addShoes,
  getShoesById,
  updateProduct,
  removeShoes,
};
