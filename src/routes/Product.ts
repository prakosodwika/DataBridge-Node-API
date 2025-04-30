import { Router } from "express";
import * as ProductController from "$controllers/rest/ProductController"
import { authentication } from "$middlewares/authMiddlerware";
import { uploadFile } from "$middlewares/multerMiddleware";

const ProductRoutes = Router({mergeParams:true})

ProductRoutes.post("/upload", authentication, uploadFile, ProductController.fileUpload)
ProductRoutes.post("/files", authentication, ProductController.paginationFiles)

export default ProductRoutes