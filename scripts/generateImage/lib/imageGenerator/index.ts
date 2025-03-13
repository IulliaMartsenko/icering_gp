import sharp from "sharp";
import path from "path";
import fs from "fs";
import { ImageGeneratorConfig } from "./types";
import { buildImageName } from "../utils/buildImageName/buildImageName";
import { buildFilePath } from "../utils/buildFilePath/buildFilePath";
import { defaultQuality } from "./constants";

type T = { buffer: Buffer<ArrayBufferLike>; imageName: string };

export async function generateImages(config: ImageGeneratorConfig): Promise<T[]> {
    const { fileInfo: imageInfo, extensions, widths, outputPath } = config;

    // Формируем полный путь к исходному файлу
    const inputFile = path.join(imageInfo.dirPath, `${imageInfo.baseName}.${imageInfo.extension}`);

    if (!fs.existsSync(inputFile)) {
        throw new Error(`Input file ${inputFile} does not exist.`);
    }

    // Проверяем и создаём выходную директорию, если её нет
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    const originalWidth = (await sharp(inputFile).metadata()).width;

    if (!originalWidth) {
        console.log(`Could not read image dimensions.`);
        return;
    }

    const images: T[] = [];

    for (const width of widths) {
        const imageName = buildImageName({ width: width });

        // Если требуемая ширина больше исходной, пропускаем вариант
        if (width > originalWidth) {
            console.warn(
                `Генерируемый размер изображения [${width}px] больше исходного [${originalWidth}px]. Изображение [${
                    imageInfo.baseName + "/" + imageName
                }] будет сгенерировано в исходном размере`
            );
        }

        for (const { name: extension, quality: inputQuality } of extensions) {
            const resPath = path.resolve(__dirname, outputPath, imageInfo.baseName);

            // Проверяем и создаём выходную директорию, если её нет
            if (!fs.existsSync(resPath)) {
                fs.mkdirSync(resPath, { recursive: true });
            }

            const outputFilePath = buildFilePath({ baseName: imageName, dirPath: resPath, extension });

            const quality = inputQuality || defaultQuality[extension];

            try {
                await sharp(inputFile)
                    .resize({ width: Math.min(width, originalWidth) })
                    .toFormat(extension, { quality, progressive: true })
                    .toFile(outputFilePath);
            } catch (err) {
                console.error(`Error generating ${outputFilePath}:`, err);
            }
        }
    }

    return images;
}
