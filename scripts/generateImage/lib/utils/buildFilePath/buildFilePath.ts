import { FileInfo } from "../../types";

export function buildFilePath({dirPath, baseName, extension }: FileInfo) {
    return `${dirPath}/${baseName}.${extension}`
}