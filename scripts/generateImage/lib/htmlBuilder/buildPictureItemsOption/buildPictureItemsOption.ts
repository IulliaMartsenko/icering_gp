import { buildFilePath } from "../../utils/buildFilePath/buildFilePath";
import { buildImageName } from "../../utils/buildImageName/buildImageName";
import { XOR } from "../../utils/utils/types";
import { ImageInfo, ImageExtensionName } from "../../types";
import { buildSrcset } from "../buildSrcset/buildSrcset";
import { PictureItem } from "../createPictureItem/createPictureItem";

interface BuildPictureItemsOption {
    imageInfo: ImageInfo;
    supportedDpr: number[];
    /** Значение точки останова */
    breakpointValue?: number;
    /** Последнее расширение в списке */
    isLastExtension?: boolean;
}

export function buildPictureItemsOption({
    imageInfo,
    supportedDpr,
    breakpointValue,
    isLastExtension,
}: BuildPictureItemsOption): PictureItem {
    let srcData: XOR<{ src: string }, { srcset: string }>;


    const src = buildFilePath({
        baseName: buildImageName({ width: imageInfo.width }),
        dirPath: imageInfo.dirPath + '/' + imageInfo.baseName,
        extension: imageInfo.extension,
    });
    const srcset = buildSrcset({
        imageInfo,
        supportedDpr: supportedDpr,
    });

    if (supportedDpr && supportedDpr.length > 1) {
        srcData = { srcset };
    } else {
        srcData = { src };
    }

    if (!breakpointValue && isLastExtension) {
        return {
            tagName: "img",
            src,
            srcset: supportedDpr && supportedDpr.length > 1 ? srcset : undefined,
            alt: imageInfo.alt,
        };
    }

    return {
        tagName: "source",
        ...srcData,
        media: breakpointValue ? `(max-width: ${breakpointValue}px)` : undefined,
        type: sourceTypes[imageInfo.extension],
    };
}

/** помогает браузеру определить поддержку формата, без необходимости загрузки и анализа файла */
const sourceTypes: Record<ImageExtensionName, string | undefined> = {
    webp: "image/webp",
    avif: "image/avif",
    jpeg: undefined, // не указано, так как все браузеры поддерживают
};
