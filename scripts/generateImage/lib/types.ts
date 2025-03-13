export type ImageExtensionName = "jpeg" | "webp" | "avif";
export type ImageExtension = {
    name: ImageExtensionName,
    quality?: number,
}

export interface Options {
    configDataAttrName?: string;
    html: string;
}

export interface Config {
    /** размер экрана меньше либо равному которому будет соответствовать ширина изображения (порядок важен - от меньшего к большему) */
    breakpoints: Record<string, number>;
    supportedDpr: number[];
    extensions: ImageExtension[];
    output: string;
    alt: string;
}

export interface ImageGenerationData {
    extension: ImageExtensionName;
    width: number;
    quality: number;
}

/** Инфо о файле */
export interface FileInfo {
    /** Имя файла без расширения */
    baseName: string;
    /** Расширение файла */
    extension: ImageExtensionName;
    /** Путь к директории */
    dirPath: string;
}

/** Инфо об изображении */
export interface ImageInfo extends FileInfo {
    /** Ширина в px */
    width: number;
    /** Альтернативный текст */
    alt: string;
}
