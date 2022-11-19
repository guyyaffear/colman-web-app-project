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
    const product = await cartHelper.addShoeToCart(
      req.session.username,
      req.body
    );
    if (product) {
      res.json({ status: "success", code: 200, product });
    } else {
      res.json({
        status: "error",
        code: 400,
        error: "Couldn't add product to cart",
      });
    }
  } catch (err) {
    res.json({ status: "error", code: err.code, error: err.message });
  }
}

async function removeShoeFromCart(req, res) {
  try {
    const cart = await cartHelper.removeShoeFromCart(
      req.session.username,
      req.body
    );

    if (cart) {
      res.json({ status: "success", code: 200, cart });
    } else {
      res.json({
        status: "error",
        code: 400,
        error: "Couldn't remove product from cart",
      });
    }
  } catch (err) {
    res.json({ status: "error", code: err.code, error: err.message });
  }
}

async function updateShoeQuantity(req, res) {
  const { productId, quantity } = req.body;
  const user = req.session.username || "ido@gmail.com";
  try {
    const update = await cartHelper.updateShoeQuantity(
      user,
      productId,
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
      error: "Couldn't update product quantity",
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
