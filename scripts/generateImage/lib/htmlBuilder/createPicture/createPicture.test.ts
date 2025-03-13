import { HtmlBuilderConfig } from "../types";
import { createPicture } from "./createPicture";

describe("config/build/plugins/adaptiveImagesPlugin/htmlPlugin/createPicture", () => {
    const imageInfo: HtmlBuilderConfig["imageInfo"] = {
        baseName: "photo",
        dirPath: ".",
        alt: "photo",
    };

    const imgAttr = 'loading="lazy" decoding="async" alt="photo"';

    describe('"img" тэг, если отсутствуют breakpoints и поддержано всего одно расширение', () => {
        test("создает тэг с src", () => {
            const res = createPicture({
                imageInfo,
                extensions: ["jpeg"],
                imageWidth: 400,
            });

            expect(res).toBe(`<img src="./photo/400.jpeg" ${imgAttr} />`);
        });

        test("создает тэг с srcset, если поддерживаемых dpr больше 1", () => {
            const res = createPicture({
                imageInfo,
                extensions: ["jpeg"],
                imageWidth: 400,
                supportedDpr: [1, 1.5],
            });

            expect(res).toBe(
                `<img src="./photo/400.jpeg" srcset="./photo/400.jpeg 1x, ./photo/600.jpeg 1.5x" ${imgAttr} />`
            );
        });
    });

    describe('"picture" тэг', () => {
        test("создает тэг, поддерживающий разные расширения", () => {
            const res = createPicture({
                imageInfo,
                extensions: ["webp", "jpeg"],
                imageWidth: 400,
            });

            expect(res).toBe(
                "<picture>" +
                    '<source type="image/webp" src="./photo/400.webp" />' +
                    `<img src="./photo/400.jpeg" ${imgAttr} />` +
                    "</picture>"
            );
        });

        test("создает тэг, поддерживающий разные расширения и dpr", () => {
            const res = createPicture({
                imageInfo,
                extensions: ["webp", "jpeg"],
                imageWidth: 400,
                supportedDpr: [1, 1.5],
            });

            expect(res).toBe(
                "<picture>" +
                    '<source type="image/webp" srcset="./photo/400.webp 1x, ./photo/600.webp 1.5x" />' +
                    `<img src="./photo/400.jpeg" srcset="./photo/400.jpeg 1x, ./photo/600.jpeg 1.5x" ${imgAttr} />` +
                    "</picture>"
            );
        });

        test("создает тэг, поддерживающий разные медиа выражения", () => {
            const res = createPicture({
                imageInfo,
                extensions: ["jpeg"],
                breakpoints: [
                    {
                        value: 768,
                        imageWidth: 400,
                    },
                    {
                        value: 1024,
                        imageWidth: 800,
                    },
                ],
            });

            expect(res).toBe(
                "<picture>" +
                    '<source media="(max-width: 768px)" src="./photo/400.jpeg" />' +
                    `<img src="./photo/800.jpeg" ${imgAttr} />` +
                    "</picture>"
            );
        });

        test("создает тэг, поддерживающий разные медиа выражения и dpr", () => {
            const res = createPicture({
                imageInfo,
                extensions: ["jpeg"],
                supportedDpr: [1, 1.5],
                breakpoints: [
                    {
                        value: 768,
                        imageWidth: 400,
                    },
                    {
                        value: 1024,
                        imageWidth: 800,
                    },
                ],
            });

            expect(res).toBe(
                "<picture>" +
                    '<source media="(max-width: 768px)" srcset="./photo/400.jpeg 1x, ./photo/600.jpeg 1.5x" />' +
                    `<img src="./photo/800.jpeg" srcset="./photo/800.jpeg 1x, ./photo/1200.jpeg 1.5x" ${imgAttr} />` +
                    "</picture>"
            );
        });

        test("создает тэг, поддерживающий разные расширения, медиа выражения и dpr", () => {
            const res = createPicture({
                imageInfo,
                extensions: ["webp", "jpeg"],
                supportedDpr: [1, 1.5],
                breakpoints: [
                    {
                        value: 768,
                        imageWidth: 400,
                    },
                    {
                        value: 1024,
                        imageWidth: 800,
                    },
                ],
            });

            expect(res).toBe(
                "<picture>" +
                    '<source type="image/webp" media="(max-width: 768px)" srcset="./photo/400.webp 1x, ./photo/600.webp 1.5x" />' +
                    '<source media="(max-width: 768px)" srcset="./photo/400.jpeg 1x, ./photo/600.jpeg 1.5x" />' +
                    '<source type="image/webp" srcset="./photo/800.webp 1x, ./photo/1200.webp 1.5x" />' +
                    `<img src="./photo/800.jpeg" srcset="./photo/800.jpeg 1x, ./photo/1200.jpeg 1.5x" ${imgAttr} />` +
                    "</picture>"
            );
        });

        test("создает тэг, поддерживающий кастомные настройки для медиа выражений", () => {
            const res = createPicture({
                imageInfo,
                extensions: ["webp", "jpeg"],
                supportedDpr: [1, 1.5],
                breakpoints: [
                    {
                        value: 768,
                        imageWidth: 400,
                        extensions: ["jpeg"],
                    },
                    {
                        value: 1024,
                        imageWidth: 800,
                        supportedDpr: [1],
                    },
                ],
            });

            expect(res).toBe(
                "<picture>" +
                    '<source media="(max-width: 768px)" srcset="./photo/400.jpeg 1x, ./photo/600.jpeg 1.5x" />' +
                    '<source type="image/webp" src="./photo/800.webp" />' +
                    `<img src="./photo/800.jpeg" ${imgAttr} />` +
                    "</picture>"
            );
        });
    });
});
