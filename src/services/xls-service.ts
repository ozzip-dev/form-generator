import { build } from "node-xlsx";

/* Dla jednego arkusza. Gdyby było potrzeba więcej, zmienić nazwę, dodać nową fn(?) */
export async function exportXls(
  sheetName: string,
  data: string[][]
): Promise<Buffer<ArrayBufferLike>> {
  try {
    return build([{ name: sheetName, data, options: {} }]);
  } catch (e) {
    console.error(e);
    throw new Error("Error exporting data as .xls");
  }
}
