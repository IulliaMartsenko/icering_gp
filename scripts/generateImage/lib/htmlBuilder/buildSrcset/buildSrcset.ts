import { buildFilePath } from "../../utils/buildFilePath/buildFilePath";
import { ImageInfo } from "../../types";
import { buildImageName } from "../../utils/buildImageName/buildImageName";

interface BuildSrcsetOptions {
    /** Поддерживаемые dpr */
    supportedDpr: number[];
    /** Инфо об изображении */
    imageInfo: ImageInfo;
}

export function buildSrcset({
    supportedDpr,
    imageInfo: { baseName, dirPath, extension, width },
}: BuildSrcsetOptions) {
    return supportedDpr
        .map((dpr) => {
            const imageName = buildImageName({ width, dpr });

            return `${buildFilePath({
                baseName: imageName,
                dirPath: dirPath + '/' + baseName,
                extension,
            })} ${dpr}x`;
        })
        .join(", ");
}
