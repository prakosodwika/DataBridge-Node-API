import { Router } from "express";
import * as ProductController from "$controllers/rest/ProductController"
import { authentication } from "$middlewares/AuthMiddlerware";
import { validateUpload } from "$validations/uploadValidation";

const ProductRoutes = Router({mergeParams:true}) // mergeParams = true -> to enable parsing query params

ProductRoutes.post("/upload", authentication, validateUpload, ProductController.fileUpload)
ProductRoutes.post("/files", authentication, ProductController.paginationFiles)

export default ProductRoutes