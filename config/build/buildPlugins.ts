import { Configuration, ProgressPlugin } from "webpack";
import { BuildOptions } from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildPlugins({paths}: BuildOptions): Configuration['plugins'] {
    return [
        new HtmlWebpackPlugin({
            template: paths.html,
            inject: 'body',
        }),
        new MiniCssExtractPlugin({ filename: 'style.[contenthash].css' }),
        new ProgressPlugin(),
    ]
}