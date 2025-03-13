import { ImageExtensionName } from "../types";

export const defaultQuality: Record<ImageExtensionName, number> = {
    jpeg: 90,
    webp: 85,
    avif: 65,
}