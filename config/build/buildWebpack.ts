import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
import { buildResolvers } from "./buildResolvers";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildDevServer } from "./buildDevServer";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

export function buildWebpack(options: BuildOptions): Configuration {
    const { mode, paths } = options;
    const isDev = mode === 'development';

    const config: Configuration = {
        mode: mode ?? 'production',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: 'bundle.[contenthash].js',
            clean: true,
        },
        module: {
            rules: buildLoaders(),
        },
        resolve: buildResolvers(),
        plugins: buildPlugins(options),
        optimization: {
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin(),
            ]
        },
        devServer: buildDevServer(options),
    };

    if (isDev) {
        config.devtool = 'inline-source-map';
    }

    return config;
}