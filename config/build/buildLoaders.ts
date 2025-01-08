import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions, RuleSetRule } from "webpack";

export function buildLoaders(): ModuleOptions['rules'] {
    const htmlLoader: RuleSetRule = {
        test: /\.html$/i,
        use: 'html-loader',
    };

    const cssLoader: RuleSetRule = {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
    };

    const assetLoader: RuleSetRule = {
        test: /\.(png|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
        // use: [{
        //     loader: 'image-webpack-loader',
        //     options: {
        //         pngquant: {
        //             quality: [.90, .95],
        //         },
        //     }
        // }],
        generator: {
            filename: 'images/[file]',
        },
    };

    const tsLoader: RuleSetRule = {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            }
        ],
        exclude: /node_modules/,
    };

    return [
        htmlLoader,
        cssLoader,
        assetLoader,
        tsLoader,
    ]
}