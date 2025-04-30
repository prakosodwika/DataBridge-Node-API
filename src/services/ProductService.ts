import { INTERNAL_SERVER_ERROR_SERVICE_RESPONSE, ServiceResponse } from "$entities/Service";
import Logger from '$pkg/logger';
import { prisma } from "$utils/prisma.utils";
import { FilteringQueryV2 } from "$entities/Query";
import { parseExcelProduct } from "$utils/excel.utils";
import fs from 'fs';

const THIRTY_SECONDS = 30 * 1000;

export async function paginationFiles(filters: FilteringQueryV2):Promise<ServiceResponse<{}>>{
  try{
    const { 
      page = 1, 
      rows = 10, 
      searchFilters, 
      filters: customFilters, 
      orderKey, 
      orderRule 
    } = filters

    const skip = (page - 1) * rows
    const take = rows
    const where: any = {}

    if (customFilters?.status) {
      where.status = customFilters.status
    }

    if (searchFilters?.filename) {
      where.filename = {
        contains: searchFilters.filename,
      }
    }

    const data = await prisma.dataUpload.findMany({
      where,
      skip,
      take,
      orderBy: {
        [orderKey || 'createdAt']: orderRule || 'asc',
      }
    })

    const total = await prisma.dataUpload.count({ where })

    return {
      status: true,
      data: {
        items: data,
        total,
        page,
        rows
      }
    }
  }catch(err){
    Logger.error(`ProductService.login : ${err}`)
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE
  }
}

export async function fileUpload(file: Express.Multer.File, user: any):Promise<ServiceResponse<{}>>{
    try{
        const data = await prisma.dataUpload.create({
            data: {
                filename: file.filename,
                path: file.path,
            }
        })

        setTimeout(() => {
          processFileInBackground(data.id, file.path);
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

async function processFileInBackground(fileId: string, filePath: string) {
  try {
    console.log(`Mulai proses file ID: ${fileId}`);
    const buffer = fs.readFileSync(filePath)
    const products = parseExcelProduct(buffer);

    await prisma.$transaction([
      prisma.product.createMany({
        data: products.map(product => ({
          ...product,
          dataUploadId: fileId
        }))
      }),
      prisma.dataUpload.update({
        where: { id: fileId },
        data: { status: 'SUCCESS', }
      })
    ])

    console.log(`Selesai proses file ID: ${fileId}`);
  } catch (err) {
    console.error(`Gagal proses file ID: ${fileId}`, err);
    await prisma.dataUpload.update({
      where: { id: fileId },
      data: { status: 'FAILED' }
    });
  }
}

