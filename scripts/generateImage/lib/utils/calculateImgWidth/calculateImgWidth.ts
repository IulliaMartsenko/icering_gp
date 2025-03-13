interface CalculateImgWidthOptions {
    width: number;
    /** device pixel ratio **/
    dpr: number;
}

export function calculateImgWidth({
    width,
    dpr,
}: CalculateImgWidthOptions): number {
    return Math.ceil(width * dpr);
}
