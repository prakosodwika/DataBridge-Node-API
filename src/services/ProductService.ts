import { INTERNAL_SERVER_ERROR_SERVICE_RESPONSE, ServiceResponse } from "$entities/Service";
import Logger from '$pkg/logger';

export async function get():Promise<ServiceResponse<{}>>{
  try{
      return {
          status:true,
          data:{
              name:"Product Service",
              version:"1.0.0"
          }
      }
  }catch(err){
      Logger.error(`ProductService.get : ${err}`)
      return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE
  }
}