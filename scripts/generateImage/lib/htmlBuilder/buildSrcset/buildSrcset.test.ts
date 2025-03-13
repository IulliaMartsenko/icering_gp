import { ImageInfo } from "../../types";
import { buildSrcset } from "./buildSrcset";

describe("config/build/plugins/adaptiveImagesPlugin/htmlPlugin/buildSrcset", () => {
    const imageInfo1: ImageInfo = {
        baseName: "photo1",
        dirPath: ".",
        extension: "jpeg",
        width: 100,
        alt: 'photo1',
    };

    const imageInfo2: ImageInfo = {
        baseName: "photo2",
        dirPath: ".",
        extension: "webp",
        width: 125,
        alt: 'photo2',
    };

    test("Корректно генерирует srcset", () => {
        expect(
            buildSrcset({
                imageInfo: imageInfo1,
                supportedDpr: [1],
            })
        ).toEqual("./photo1/100.jpeg 1x");

        expect(
            buildSrcset({
                imageInfo: imageInfo2,
                supportedDpr: [1, 1.5, 2, 3],
            })
        ).toEqual(
            "./photo2/125.webp 1x, ./photo2/188.webp 1.5x, ./photo2/250.webp 2x, ./photo2/375.webp 3x"
        );
    });
});
