import { Request, Response } from "express"
import * as ProductService from "$services/ProductService"
import { handleServiceErrorWithResponse, response_success } from "$utils/response.utils"

export async function login(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await ProductService.get()

  if (!serviceResponse.status) return handleServiceErrorWithResponse(res, serviceResponse)

  return response_success(res, serviceResponse.data, "Success!")
}