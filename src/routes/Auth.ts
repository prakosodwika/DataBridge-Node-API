import { Router } from "express";
import * as AuthController from "$controllers/rest/AuthController"

const AuthRoutes = Router({mergeParams:true})

AuthRoutes.post("/login", AuthController.login)

export default AuthRoutes