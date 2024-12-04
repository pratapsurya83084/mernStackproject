import { Cart } from "../models/Cart.js";

export const addTocart = async (req, res) => {
  // take input to added product into card
  const { title, price, qty, imgsrc, productid } = req.body;

  const userId = "668a30a38084015a34b38fcf";  //this userId stored its own cart items ,suppose useid change according to stored cartitem in db

  
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] }); // userId, items is model array to store the items detail
  }
  
  const itemIndex = cart.items.findIndex(
    (index) => index.productid && index.productid.toString() === productid  // Check for undefined productid
  );
  
  if (itemIndex === -1) {
    // Item does not exist in cart, add new item
    cart.items.push({ title, price, qty, imgsrc, productid });
  } else {
    // Item exists in cart, update its quantity
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].qty*qty;
  }
  
  await cart.save(); // Ensure the changes are saved to the database
  
  res.json({ message: "Cart updated successfully", cart });
  
  return cart;
}
//get user cart
export const UserCart =async (req,res)=>{
  const userId = "668a2333975a90e1f02f0d6f"; //product cart userId 
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    res.json({message:"product is not exists in the cart.... "})
  }
  if (cart) {
    res.json({message:"your cart product is :",cart})
  }
  return cart;
}

//delete/remove  product from cart

export const removeproductFromCart = async (req, res) => {
  const productId = req.params.productId; // product cart userId 
  // const userId = "668a30a38084015a34b38fcf";
  const cart = await Cart.findOne({ userId });
  
  if (!cart) {
    res.json({ message: "product is not exists in the cart.... " });
  } else {
    cart.items = cart.items.filter((item) => item.productid && item.productid.toString() !== productId);
    await cart.save(); // Ensure the changes are saved to the database
    res.json({ message: "product is successfully removed from cart " ,cart});
  }

  return cart;
};

//clear all cart items
export const clearCart = async (req, res) => {
 const productId = req.params.productId; // product cart userId 
  // const userId = "66819439a7c6bd0f8c6426ca";
  let cart = await Cart.findOne({productId})
  
  
  if (!cart) {
    cart=new compareSync.findOne({items:[]})
    res.json({ message: "product is not exists in the cart.... " });
  } else {
    // allitemsid.items = cart.items.filter((item) => item.productid && item.productid.toString() !== productId);
    // await cart.save(); // Ensure the changes are saved to the database
   cart.items = [];
    res.json({ message: "all items is successfully removed from cart " });
  }
  await cart.save()

 
};

//decrese qty from cart
// no work
export const decreaseProductqty = async (req, res) => {
  const { qty, productid } = req.body; // Quantity to decrease and product ID
const userId=req.params.productid;
  // const userId = "668a30a38084015a34b38fcf"; // Replace with dynamic user ID as needed

  // Find the user's cart
  let cart = await Cart.findOne({ userId });
  
  if (!cart) {
    // No cart found for the user
    return res.status(404).json({ message: "Cart not found for user" });
  }

  // Find the index of the item to decrease qty
  const itemIndex = cart.items.findIndex(
    (item) => item.productid && item.productid.toString() === productid
  );

  if (itemIndex === -1) {
    // Item not found in the cart
    return res.status(404).json({ message: "Product not found in cart" });
  } else {
    // Decrease the quantity of the item
    cart.items[itemIndex].qty -= qty;

    // If the quantity is 0 or less, remove the item from the cart
    if (cart.items[itemIndex].qty <= 0) {
      cart.items.splice(itemIndex, 1);
    }
  }
  
  // Save the updated cart to the database
  await cart.save();

  // Return the updated cart
  res.json({ message: "Cart updated successfully", cart });
};
