import { Router } from "express";
import * as ProductController from "$controllers/rest/ProductController"
import { authentication } from "$middlewares/AuthMiddlerware";

const ProductRoutes = Router({mergeParams:true}) // mergeParams = true -> to enable parsing query params

ProductRoutes.get("/", authentication, ProductController.login)

export default ProductRoutes