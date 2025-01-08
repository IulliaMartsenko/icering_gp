import path from 'path';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildOptions, BuildPaths } from './config/build/types/types';

interface EnvVariables {
    mode: BuildMode;
    port: number;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths  = {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        html: path.resolve(__dirname, 'src', 'index.html'),
        output: path.resolve(__dirname, 'build'),
    }

    const options: BuildOptions = {
        mode: env.mode,
        paths,
    }
    const config = buildWebpack(options);

    return config;
};
