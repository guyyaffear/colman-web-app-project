const shoesHelper = require("../helpers/shoesHelper");
const companyService = require("../helpers/companyHelper");

async function allShoesPage(req, res) {
  const company = await companyService.getCompany();
  
  if (company) {
    res.render("shop", {
      userName:"Mosh",
      company,
      loggedIn: !!req.session.username,
      isAdmin: !!req.session.isAdmin,
    });
  } else {
    res.redirect("/error?code=400");
  }
}

async function getShoesByCompany(req, res) {
  const { company } = req.params;

  const items = await shoesHelper.getShoesByCompany(company);
  if (items) {
    res.json({
      status: "success",
      code: 200,
      items,
      loggedIn: !!req.session.username,
      isAdmin: !!req.session.isAdmin,
    });
  } else {
    res.json({
      status: "error",
      code: 400,
      message: "No items found ",
    });
  }
}

async function addShoes(req, res) {
  try {
    const item = await shoesHelper.addShoes(req.body);
    if (item) {
      res.json({
        status: "success",
        message: "shoes added successfully",
        code: 200,
        item,
      });
    } else {
      throw { code: 400, message: "Couldn't add product" };
    }
  } catch (error) {
    res.json({ status: "error", code: error.code, error: error.message });
  }
}

async function getShoesById(req, res) {
  const { id } = req.params;

  if (id === "new") {
    res.render("addShoes", {
      item: null,
      Company: await companyService.getCompany(),
    });
  } else {
    try {
      const item = await shoesHelper.getProductById(id);
      if (item) {
        res.render("addShoes", {
          item,
          company: await companyService.getCompany(),
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.redirect("/shoes/add/new");
    }
  }
}

async function updateShoes(req, res) {
  const { shoesId } = req.params;
  const { title, category, price, image } = req.body;

  console.log({ shoesId, title, category, price, image });
  try {
    const item = await shoesHelper.updateProduct({
      shoesId,
      title,
      category,
      price,
      image,
    });
    if (item) {
      res.json({
        status: "success",
        code: 200,
        message: "Shoes updated successfully",
        item,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.json({
      status: "error",
      code: 400,
      message: "Error updating product",
    });
  }
}

async function removeShoes(req, res) {
  const shoesId = req.params.shoesId;

  try {
    if (!shoesId) throw new Error();
    const remove = await shoesHelper.removeProduct(shoesId);

    if (remove) {
      return res.json({
        status: "success",
        code: 200,
        message: "Product removed successfully",
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.json({
      status: "error",
      code: "400",
      message: "Error Removing Product",
    });
  }
}

module.exports = {  
  allShoesPage,
  getShoesByCompany,
  addShoes,
  getShoesById,
  updateShoes,
  removeShoes,
}