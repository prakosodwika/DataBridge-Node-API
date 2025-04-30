import { Request, Response } from "express"
import * as AuthService from "$services/AuthService"
import { handleServiceErrorWithResponse, response_success, response_bad_request } from "$utils/response.utils"
import { validateLoginPayload } from "$validations/loginValidation"

export async function login(req: Request, res: Response): Promise<Response> {
  const errors = validateLoginPayload(req.body)

  if (errors.length) return response_bad_request(res, "Invalid request payload", errors)

  const serviceResponse = await AuthService.login(req.body)

  if (!serviceResponse.status) return handleServiceErrorWithResponse(res, serviceResponse)

  return response_success(res, serviceResponse.data, "Success!")
}