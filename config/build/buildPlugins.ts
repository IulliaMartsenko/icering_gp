import { Configuration, ProgressPlugin } from "webpack";
import { BuildOptions } from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

export function buildPlugins({paths, mode}: BuildOptions): Configuration['plugins'] {
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            scriptLoading:"defer",
        }),
        new MiniCssExtractPlugin({ filename: 'style.[contenthash].css' }),
        new FaviconsWebpackPlugin({
            logo: paths.favicon,
            prefix: 'favicon/',
            manifest: paths.manifest,
        }),
        new ProgressPlugin(),
    ]

    if (isProd) {
        plugins.push(
            new ForkTsCheckerWebpackPlugin()
        )
    }

    return plugins;
}