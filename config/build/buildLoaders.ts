import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions, RuleSetRule } from "webpack";

export function buildLoaders(): ModuleOptions["rules"] {
    const htmlLoader: RuleSetRule = {
        test: /\.html$/i,
        use: "html-loader",
    };

    const cssLoader: RuleSetRule = {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
    };

    const assetLoader: RuleSetRule = {
        test: /\.(png|jpg|jpeg|webp|avif)$/i,
        type: "asset/resource",
        generator: {
            filename: "images/[file]",
        },
    };

    const babelLoader: RuleSetRule = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env", "@babel/preset-typescript"],
            },
        },
    };

    return [
        htmlLoader,
        cssLoader,
        assetLoader,
        babelLoader,
    ];
}
