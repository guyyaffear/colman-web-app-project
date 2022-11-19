const cartHelper = require("../helpers/cartHelper");

async function getCart(req, res) {
  const items = await cartHelper.getCart(req.session.email);
  res.render("cart", {
    userName:req.session.email,
    items,
  });
}
async function clearCart(req, res) {
  try {
    await cartHelper.clearCart(req.session.username);
    res.json({
      status: "success",
      code: 200,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.json({ status: "error", code: error.code, error: error.message });
  }
}

async function addShoeToCart(req, res) {
  try {
    const shoesAdded = await cartHelper.addShoeToCart(
      req.session.username,
      req.body
    );
    if (shoesAdded) {
      res.json({ status: "success", code: 200, shoesAdded });
    } else {
      res.json({
        status: "error",
        code: 400,
        error: "Couldn't add shoe to cart",
      });
    }
  } catch (err) {
    res.json({ status: "error", code: err.code, error: err.message });
  }
}

async function removeShoeFromCart(req, res) {
  try {
    const cart = await cartHelper.removeShoeFromCart(
      req.session.email,
      req.body
    );

    if (cart) {
      res.json({ status: "success", code: 200, cart });
    } else {
      res.json({
        status: "error",
        code: 400,
        error: "Couldn't remove shoe from cart",
      });
    }
  } catch (err) {
    res.json({ status: "error", code: err.code, error: err.message });
  }
}

async function updateShoeQuantity(req, res) {
  const { shoeId, quantity } = req.body;
  const user = req.session.username || "ido@gmail.com";
  try {
    const update = await cartHelper.updateShoeQuantity(
      user,
      shoeId,
      quantity
    );

    if (update) {
      res.json({ status: "success", code: 200, item: update });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({
      status: "error",
      code: 400,
      error: "Couldn't update shoe quantity",
    });
  }
}

module.exports = {
  getCart,
  clearCart,
  addShoeToCart,
  removeShoeFromCart,
  updateShoeQuantity,
};
