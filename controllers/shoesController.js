const shoesHelper = require("../helpers/shoesHelper");
const companyHelper = require("../helpers/companyHelper");
const userHelper = require("../helpers/userHelper");
async function allShoesPage(req, res) {
  const allShoes = await shoesHelper.getAllShoes();
  console.log("allShoes",allShoes);
  if (allShoes) {
    res.render("shop", {
      userName: req.session.email,
      shoes:allShoes
    });
  } else {
    const userName = req.session.email || null;
    res.redirect( 'error',"/errorPage?code=400",userName);
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
      loggedIn: !!req.session.email,
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
      res.redirect("/shoes/shop");
      // res.json({
      //   status: "success",
      //   message: "shoes added successfully",
      //   code: 200,
      //   item,
      // });
    } else {
      throw { code: 400, message: "Couldn't add product" };
    }
  } catch (error) {
    res.json({ status: "error", code: error.code, error: error.message });
  }
}

async function getShoesById(req, res) {

  res.render("addShoe.ejs",{userName:req.session.email})
  // const { id } = req.params;
  // console.log(req.params);
  // if (id === "new") {
  //   res.render("addShoe",{userName: null});
  // } else {
  //   try {
  //     const item = await shoesHelper.getProductById(id);
  //     if (item) {
  //       res.render("addShoe.ejs", {
  //         userName: req.session.email
  //       });
  //     } else {
  //       throw new Error();
  //     }
  //   } catch (error) {
  //     res.redirect("/shoes/add/new");
  //   }
  //}
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
  console.log("1>> ",req.params);
  console.log("2>> ",req.params.shoesId);
  try {
    if (!shoesId) throw new Error();
    const remove = await shoesHelper.removeShoes(shoesId);

    if (remove) {
      return res.redirect("/shoes/shop");
      // return res.json({
      //   status: "success",
      //   code: 200,
      //   message: "Product removed successfully",
      // });
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