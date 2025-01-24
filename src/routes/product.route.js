import express from "express";
import { createProductController, getProductsController, getProductByIdController, deleteProductController, getProductsBySellerController, getProductsByCategoryController, getCategoriesController} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post('/create', createProductController)
productRouter.get('/products/:product_id', getProductByIdController)
productRouter.get('/products', getProductsController)
productRouter.get('/category', getCategoriesController)
productRouter.get('/category/:category', getProductsByCategoryController)
productRouter.get('/admin', getProductsBySellerController)
productRouter.delete('/delete/:product_id', deleteProductController)

export default productRouter