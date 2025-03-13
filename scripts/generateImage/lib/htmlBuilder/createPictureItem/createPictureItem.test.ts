import { createPictureItem } from "./createPictureItem";

describe("config/build/plugins/adaptiveImagesPlugin/htmlPlugin/createPictureItem", () => {
    const src = "./photo.jpeg";
    const srcset = "./photo-1x.jpg 1x, ./photo-2x.jpg 2x";

    describe('"img" тэг', () => {
        const alt = "photo";
        const imgAttr = `loading="lazy" decoding="async" alt="${alt}"`;

        test("создает тэг", () => {
            const res = createPictureItem({ tagName: "img", src, alt });

            expect(res).toBe(`<img src="${src}" ${imgAttr} />`);
        });

        test("создает тэг с srcset атрибутом", () => {
            const res = createPictureItem({ tagName: "img", src, srcset, alt });

            expect(res).toBe(`<img src="${src}" srcset="${srcset}" ${imgAttr} />`);
        });
    });

    describe('"source" тэг', () => {
        const media = "(max-width: 800px)";
        const type = "image/webp";

        test("создает тэг", () => {
            const res = createPictureItem({ tagName: "source", src });

            expect(res).toBe(`<source src="${src}" />`);
        });

        test("создает тэг с атрибутом srcset", () => {
            const res = createPictureItem({ tagName: "source", srcset });

            expect(res).toBe(`<source srcset="${srcset}" />`);
        });

        test("создает тэг с атрибутом media", () => {
            const res = createPictureItem({ tagName: "source", media, srcset });

            expect(res).toBe(`<source media="${media}" srcset="${srcset}" />`);
        });

        test("создает тэг с атрибутом type", () => {
            const res = createPictureItem({ tagName: "source", type, srcset });

            expect(res).toBe(`<source type="${type}" srcset="${srcset}" />`);
        });

        test("создает тэг со всеми возможными атрибутами", () => {
            const res = createPictureItem({ tagName: "source", type, media, srcset });

            expect(res).toBe(`<source type="${type}" media="${media}" srcset="${srcset}" />`);
        });
    });
});
