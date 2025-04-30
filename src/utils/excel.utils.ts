import * as XLSX from 'xlsx'
import { Product } from '$entities/Excel'

export function parseExcelProduct(fileBuffer: Buffer): Product[] {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  const jsonData: any[] = XLSX.utils.sheet_to_json(sheet)

  const parsed: Product[] = jsonData.map((row, index) => ({
    name: String(row.name ?? row.Name ?? row.nama ?? ''),
    price: Number(row.price ?? row.harga ?? 0),
    stock: Number(row.stock ?? row.stok ?? 0)
  }))

  return parsed
}