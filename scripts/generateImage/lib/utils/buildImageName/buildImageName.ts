import { buildFileName } from "../buildFileName/buildFileName";
import { calculateImgWidth } from "../calculateImgWidth/calculateImgWidth";

export interface BuildImageNameOptions {
    baseName?: string;
    width: number;
    dpr?: number;
}

export function buildImageName({
    baseName,
    width,
    dpr,
}: BuildImageNameOptions) {
    const resWidth = dpr ? calculateImgWidth({ width, dpr }) : width
    return buildFileName({
        name: baseName,
        postfix: resWidth.toString(),
    });
}
