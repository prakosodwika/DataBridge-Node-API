import { Request, Response } from "express"
import * as ProductService from "$services/ProductService"
import { handleServiceErrorWithResponse, response_success, response_bad_request} from "$utils/response.utils"

export async function login(req: Request, res: Response): Promise<Response> {
  const {file, user} = req
  if (!file || !user) return response_bad_request(res, "Invalid request payload")

  const serviceResponse = await ProductService.login(file, user)

  if (!serviceResponse.status) return handleServiceErrorWithResponse(res, serviceResponse)

  return response_success(res, serviceResponse.data, "Success!")
}