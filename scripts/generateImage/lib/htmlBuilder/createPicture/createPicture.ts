import { buildPictureItemsOption } from "../buildPictureItemsOption/buildPictureItemsOption";
import { createPictureItem } from "../createPictureItem/createPictureItem";
import { HtmlBuilderConfig } from "../types";

export function createPicture(config: HtmlBuilderConfig): string {
    const {
        imageInfo: { baseName, dirPath, alt },
    } = config;

    if ("breakpoints" in config) {
        const pictureItemsOptions = config.breakpoints
            .map((breakpoint, index) => {
                const isLastBreakpoint = index === config.breakpoints.length - 1;

                const extensions = breakpoint.extensions || config.extensions;
                const supportedDpr = breakpoint.supportedDpr || config.supportedDpr || [1];

                return extensions.map((extension, index) =>
                    buildPictureItemsOption({
                        imageInfo: { baseName, dirPath, extension, width: breakpoint.imageWidth, alt },
                        supportedDpr,
                        breakpointValue: isLastBreakpoint ? undefined : breakpoint.value,
                        isLastExtension: index === extensions.length - 1,
                    })
                );
            })
            .flat();

        return `<picture>${pictureItemsOptions.map(createPictureItem).join("")}</picture>`;
    }

    if (config.extensions.length > 1) {
        const pictureItemsOptions = config.extensions.map((extension, index) =>
            buildPictureItemsOption({
                imageInfo: { baseName, dirPath, extension, width: config.imageWidth, alt },
                supportedDpr: config.supportedDpr || [1],
                isLastExtension: index === config.extensions.length - 1,
            })
        );

        return `<picture>${pictureItemsOptions.map(createPictureItem).join("")}</picture>`;
    }

    const extension = config.extensions[0];
    if (!extension) {
        throw Error("[AdaptiveImagesPlugin][htmlBuilder]: missing extension");
    }

    const options = buildPictureItemsOption({
        imageInfo: { baseName, dirPath, extension, width: config.imageWidth, alt },
        supportedDpr: config.supportedDpr || [1],
        isLastExtension: true,
    });

    return createPictureItem(options);
}
