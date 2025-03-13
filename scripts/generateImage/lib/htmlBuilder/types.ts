import { ImageExtensionName, ImageInfo } from "../types";

type BaseHtmlBuilderConfig = {
    /** Инфо об изображении */
    imageInfo: Pick<ImageInfo, "baseName" | "dirPath" | "alt">;
    /** Поддерживаемые форматы. Порядок важен. Должен иметь хотя бы одно значение */
    extensions: ImageExtensionName[];
    /** Поддерживаемые dpr */
    supportedDpr?: number[];
};

/** Конфиг для генерации html picture для 1 изображения */
export type HtmlBuilderConfig = BaseHtmlBuilderConfig &
    (
        | {
              /** Поддерживаемые точки останова */
              breakpoints: BreakpointOptions[];
          }
        | {
              /** Ширина изображения (Если не используются точки останова) */
              imageWidth: number;
          }
    );

/** Свойства точки останова */
export interface BreakpointOptions {
    /** значение точки останова */
    value: number;
    /** Ширина изображения */
    imageWidth: number;
    /** Кастомные форматы */
    extensions?: ImageExtensionName[];
    /** Кастомные dpr */
    supportedDpr?: number[];
}


