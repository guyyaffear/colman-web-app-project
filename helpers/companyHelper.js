const companyModel = require("../models/company");
const { ObjectId } = require("mongodb");
const shoesModel = require("../models/shoes");

async function getCompany(title) {
  return title
    ? await companyModel.findOne({ title: title.toLowerCase() })
    : await companyModel.find({}).sort({ title: -1 });
}

async function addCompany({ title }) {
  if (!title) return false;
  if (await companyModel.findOne({ title: title.toLowerCase() })) return false;
  try {
    return await new companyModel({ title: title.toLowerCase() }).save();
  } catch (error) {
    return error;
  }
}

async function removeCompany({ company }) {
  try {
    if (!company)
      throw { status: "error", code: 400, message: "id is required" };
    const companyItem = await companyModel.findOne({
      _id: ObjectId(company),
    });
    if (!companyItem || companyItem.name === "general")
      throw { status: "error", code: 400, message: "company not found" };

    await shoesModel.updateMany(
      { company: companyItem.title },
      { $set: { company: "general" } }
    );
    return await companyItem.delete();
  } catch (error) {
    console.error("error on remove company: ", error);
    return false;
  }
}

async function updateCompany(id, { title }) {
  if (!title) return false;
  if (!id) return await addCompany({ title });

  try {
    return await companyModel.findOneAndUpdate(
      { _id: ObjectId(id) },
      { title: title.toLowerCase() },
      { new: true }
    );
  } catch (error) {
    return false;
  }
}

module.exports = { getCompany, addCompany, removeCompany, updateCompany };
