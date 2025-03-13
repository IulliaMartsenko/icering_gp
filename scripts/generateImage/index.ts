import fs from "fs";
import path from "path";
import { generateImages } from "./lib/imageGenerator";
import { parseJSONConfig } from "./lib/utils/parseJSONConfig/parseJSONConfig";
import { FileInfo, ImageExtensionName } from "./lib/types";
import { createPicture } from "./lib/htmlBuilder";
import { BreakpointOptions } from "./lib/htmlBuilder/types";
import { calculateImgWidth } from "./lib/utils/calculateImgWidth/calculateImgWidth";

async function clearBuild(dir: string) {
    if (fs.existsSync(dir)) {
        await fs.promises.rmdir(dir, { recursive: true });
    }
}

async function readConfig() {
    const configJson = await fs.promises.readFile(path.resolve(__dirname, "config.json"), "utf-8");
    const config = parseJSONConfig(configJson);
    return config;
}

async function readSourceImages() {
    return await fs.promises.readdir(path.resolve(__dirname, "images"));
}

async function main() {
    await clearBuild(path.resolve(__dirname, "res"));

    const config = await readConfig();
    const images = await readSourceImages();

    const widths: Set<number> = new Set();
    for (const breakpoint in config.breakpoints) {
        config.supportedDpr.forEach((dpr) => {
            widths.add(calculateImgWidth({ width: config.breakpoints[breakpoint], dpr }));
        });
    }

    const imagesInfo: FileInfo[] = images.map((img) => {
        const { name, ext } = path.parse(img);
        return {
            baseName: name,
            extension: ext.slice(1).toLowerCase() as ImageExtensionName,
            dirPath: path.resolve(__dirname, "images"),
        };
    });

    await Promise.all(
        imagesInfo.map(async (imageInfo) => {
            await generateImages({
                extensions: config.extensions,
                outputPath: path.resolve(__dirname, "res"),
                widths: Array.from(widths),
                fileInfo: imageInfo,
            });
        })
    );

    const breakpoints: BreakpointOptions[] = [];
    if (config.breakpoints) {
        for (const [breakpoint, imageWidth] of Object.entries(config.breakpoints)) {
            breakpoints.push({
                value: Number(breakpoint),
                imageWidth,
            });
        }
    }

    const pictures = [];
    imagesInfo.forEach((imageInfo) => {
        const picture = createPicture({
            extensions: config.extensions.map((ext) => ext.name),
            breakpoints,
            imageInfo: {
                baseName: imageInfo.baseName,
                dirPath: config.output,
                alt: config.alt,
            },
            supportedDpr: config.supportedDpr,
        });
        pictures.push(picture);
    });

    await fs.promises.writeFile(path.resolve(__dirname, "res", "index.html"), pictures.join("\n"));

    console.log("Успех!");
}

main();
