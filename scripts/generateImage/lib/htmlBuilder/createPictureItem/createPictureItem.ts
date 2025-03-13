import { XOR } from "../../utils/utils/types";

type PictureItemImg = {
    tagName: "img";
    src: string;
    alt: string;
    srcset?: string;
};

type PictureItemSource = {
    tagName: "source";
    media?: string;
    type?: string;
} & XOR<{ src: string }, { srcset: string }>;

export type PictureItem = PictureItemImg | PictureItemSource;

export function createPictureItem(item: PictureItem): string {
    const attrs = [];

    if (item.tagName === "source") {
        if (item.type) {
            attrs.push(`type="${item.type}"`);
        }

        if (item.media) {
            attrs.push(`media="${item.media}"`);
        }

        if ("src" in item) {
            attrs.push(`src="${item.src}"`);
        } else {
            attrs.push(`srcset="${item.srcset}"`);
        }

        return `<source ${attrs.join(" ")} />`;
    }

    attrs.push(`src="${item.src}"`);
    if (item.srcset) {
        attrs.push(`srcset="${item.srcset}"`);
    }

    attrs.push('loading="lazy"');
    attrs.push('decoding="async"');
    attrs.push(`alt="${item.alt}"`);
    return `<img ${attrs.join(" ")} />`;
}
