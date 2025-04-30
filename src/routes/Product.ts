import { Router } from "express";
import * as ProductController from "$controllers/rest/ProductController"
import { authentication } from "$middlewares/AuthMiddlerware";
import { validateUpload } from "$validations/uploadValidation";

const ProductRoutes = Router({mergeParams:true}) // mergeParams = true -> to enable parsing query params

ProductRoutes.post("/", authentication, validateUpload, ProductController.login)

export default ProductRoutes