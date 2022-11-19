const cartModel = require("../models/cart");
const { ObjectId } = require("mongodb");

async function getCart(email) {
  const userCart = await cartModel
    .findOne({ email })
    .populate("shoes.shoesId");
  console.log("useCart",userCart)
  if(userCart){
    return userCart.shoes.map((item) => ({
      shoes: item.productId,
      quantity: item.quantity,
    }))
  } else {
    return []
  }
}

async function clearCart(email) {
  try {
    return await cartModel.findOneAndUpdate({ email }, { shoes: [] });
  } catch (error) {
    throw { code: 400, message: "Couldn't clear cart" };
  }
}

async function addShoeToCart(email, { productId, amount = 1 }) {
  try {
    const parsedAmount = parseInt(amount);

    const cart = await cartModel.findOne({ email });

    if (cart) {
      let exist = false;
      for (let i = 0; i < cart.shoes.length && !exist; i++) {
        if (cart.shoes[i].productId.toString() == productId) {
          exist = true;
          if (cart.shoes[i].quantity + parsedAmount <= 0) {
            cart.shoes.splice(i, 1);
          } else {
            cart.shoes[i].quantity += parsedAmount;
          }
        }
      }

      return await cartModel.findOneAndUpdate(
        { email },
        exist
          ? { shoes: cart.shoes }
          : { $push: { shoes: { productId, quantity: parsedAmount } } }
      );
    }

    return await new cartModel({
      email,
      shoes: [{ productId, quantity: parsedAmount }],
    }).save();
  } catch (err) {
    throw { code: 400, message: "Couldn't add product to cart" };
  }
}

async function removeShoeFromCart(email, { itemId }) {
  try {
    if (!email || !itemId) {
      throw { code: 400, message: "Couldn't remove product from cart" };
    }
    const cart = await cartModel.findOneAndUpdate(
      { email },
      { $pull: { shoes: { productId: ObjectId(itemId) } } }
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateShoeQuantity(email, productId, quantity) {
  try {
    const update = await cartModel
      .findOneAndUpdate(
        { email, "shoes.productId": ObjectId(productId) },
        { $set: { "shoes.$.quantity": quantity } },
        { new: true }
      )
      .populate("shoes.productId");
    return update;
  } catch (error) {
    throw new Error();
  }
}

module.exports = {
  getCart,
  clearCart,
  addShoeToCart,
  removeShoeFromCart,
  updateShoeQuantity,
};
