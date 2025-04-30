import { Request, Response } from "express"
import * as ProductService from "$services/ProductService"
import { handleServiceErrorWithResponse, response_success, response_bad_request} from "$utils/response.utils"
import { checkFilteringQueryV2 } from "$controllers/helpers/CheckFilteringQuery"

export async function paginationFiles(req: Request, res: Response): Promise<Response> {
  const filters = checkFilteringQueryV2(req)

  const serviceResponse = await ProductService.paginationFiles(filters)

  if (!serviceResponse.status) return handleServiceErrorWithResponse(res, serviceResponse)

  return response_success(res, serviceResponse.data, "Success!")
}

export async function fileUpload(req: Request, res: Response): Promise<Response> {
  const {file, user} = req
  if (!file || !user) return response_bad_request(res, "Invalid request payload")

  const serviceResponse = await ProductService.fileUpload(file, user)

  if (!serviceResponse.status) return handleServiceErrorWithResponse(res, serviceResponse)

  return response_success(res, serviceResponse.data, "Success!")
}