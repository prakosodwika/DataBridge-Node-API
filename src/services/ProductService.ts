import { INTERNAL_SERVER_ERROR_SERVICE_RESPONSE, ServiceResponse } from "$entities/Service";
import Logger from '$pkg/logger';
import { prisma } from "$utils/prisma.utils";

const THIRTY_SECONDS = 30 * 1000;

export async function login(file: Express.Multer.File, user: any):Promise<ServiceResponse<{}>>{
    try{
        const data = await prisma.dataUpload.create({
            data: {
                filename: file.filename,
                path: file.path,
            }
        })

        setTimeout(() => {
            processFileInBackground(data.id);
        }, THIRTY_SECONDS);

        return {
            status:true,
            data:{ data }
        }
    }catch(err){
        Logger.error(`ProductService.login : ${err}`)
        return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE
    }
}

async function processFileInBackground(fileId: string) {
    try {
      console.log(`Mulai proses file ID: ${fileId}`);
  
      await new Promise(resolve => setTimeout(resolve, 5000));
  
      await prisma.dataUpload.update({
        where: { id: fileId },
        data: { status: 'SUCCESS', }
      });
  
      console.log(`Selesai proses file ID: ${fileId}`);
    } catch (err) {
      console.error(`Gagal proses file ID: ${fileId}`, err);
      await prisma.dataUpload.update({
        where: { id: fileId },
        data: { status: 'FAILED' }
      });
    }
  }
  

