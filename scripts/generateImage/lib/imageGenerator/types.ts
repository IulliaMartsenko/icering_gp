import { ImageExtensionName, FileInfo } from "../types";

export type Extension = {
    /** Наименование расширения */
    name: ImageExtensionName;
    /** Качество изображения, целочисленное 1-100 */
    quality?: number;
};

export type ImageGeneratorConfig = {
    /** Инфо об изображении */
    fileInfo: FileInfo;
    /** Расширения для конвертации */
    extensions: Extension[];
    /** Ширины для конвертации */
    widths: number[];
    /** Папка для генерации изображения */
    outputPath: string;
};
