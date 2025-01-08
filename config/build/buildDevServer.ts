import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';
import 'webpack-dev-server';

export function buildDevServer({ port }: BuildOptions): Configuration['devServer'] {
    return {
        port: port ?? 3000,
        open: true,
        hot: true,
    }
}