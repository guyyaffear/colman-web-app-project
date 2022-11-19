const companyModel = require("../models/company");
const { ObjectId } = require("mongodb");
const shoesModel = require("../models/shoes");

async function getCompany(companyName) {
  return companyName
    ? await companyModel.findOne({ name: companyName.toLowerCase() })
    : await companyModel.find({}).sort({ title: -1 });
}

async function addCompany({ companyName }) {
  if (!companyName) return false;
  if (await companyModel.findOne({ name: companyName.toLowerCase() })) return false;
  try {
    return await new companyModel({ name: companyName.toLowerCase() }).save();
  } catch (error) {
    return error;
  }
}

async function removeCompany({ companyName }) {
  try {
    if (!companyName)
      throw { status: "error", code: 400, message: "id is required" };
    const companyItem = await companyModel.findOne({
      _id: ObjectId(companyName),
    });
    if (!companyItem || companyItem.name === "general")
      throw { status: "error", code: 400, message: "company not found" };

    await shoesModel.updateMany(
      { company: companyItem.name },
      { $set: { company: "general" } }
    );
    return await companyItem.delete();
  } catch (error) {
    console.error("error on remove company: ", error);
    return false;
  }
}

async function updateCompany(id, { companyName }) {
  if (!companyName) return false;
  if (!id) return await addCompany({ companyName });

  try {
    return await companyModel.findOneAndUpdate(
      { _id: ObjectId(id) },
      { name: companyName.toLowerCase() },
      { new: true }
    );
  } catch (error) {
    return false;
  }
}

module.exports = { getCompany, addCompany, removeCompany, updateCompany };
