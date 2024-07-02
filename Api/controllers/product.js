import { Products } from "../models/Product.js";

//add product
export const addProduct = async (req, res) => {
  // take input for image add
  try {
    const { title, description, price, category, qty, imgsrc, createdAt } =
      req.body;

    //store into db
    const product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imgsrc,
      createdAt,
    });
    res.json({ message: "product added successfully...", product });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get all products
export const getAllProduct = async (req, res) => {
  try {
    const getAllproduct = await Products.find().sort({ createdAt: -1 });
    res.json({ message: "successfullly get all products", getAllproduct });
  } catch (error) {
    res.json({ message: "...product is not found.....", error });
  }
};

// find product by id 
export const getProductById = async (req, res) => {
//   try {
    const id = req.params.id;

    const product = await Products.findById(id);
    if (!product) return res.json({ message: "Invalid id......" });
    return res.json({ message: "specific products", product });
//   } catch (error) {}
};

//update product by id
export const updateproductById = async (req, res) => {
    //   try {
        const id = req.params.id;
         const update = req.body    
        const product = await Products.findByIdAndUpdate(id,update,{new:true});
        if (!product) return res.json({ message: "Invalid id......" });
        return res.json({ message: "product is updated products", product });
    //   } catch (error) {}
    };

// delete product by id
    export const deleteproductById = async (req, res) => {
        //   try {
            const id = req.params.id;
            //  const update = req.body    
            const product = await Products.findByIdAndDelete(id);
            if (!product) return res.json({ message: "Invalid id......" });
            return res.json({ message: "product is deleted successfully", product });
        //   } catch (error) {}
        };