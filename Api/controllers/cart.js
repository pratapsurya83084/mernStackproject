import { Cart } from "../models/Cart.js";

export const addTocart = async (req, res) => {
  // take input to added product into card
  const { title, price, qty, imgsrc, productid } = req.body;

  const userId = "66819439a7c6bd0f8c6426ca";

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] }); //userdeatil , items is model
  }

  const itemIndex = cart.items.findIndex(
    (index) => index.productid.toString() === productid
  );
  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[items].price += price * qty;
  } else {
    cart.items.push({ title, price, qty, imgsrc, productid });
  }

  await cart.save(); //save into the db
  res.json({ message: "product added to cart", cart });
};
