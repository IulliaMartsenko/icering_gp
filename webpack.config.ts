import path from 'path';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildOptions, BuildPaths } from './config/build/types/types';

interface EnvVariables {
    mode?: BuildMode;
    port?: number;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths  = {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        html: path.resolve(__dirname, 'src', 'index.html'),
        output: path.resolve(__dirname, 'build'),
        favicon: path.resolve(__dirname, 'src', 'favicon.png'),
        manifest: path.resolve(__dirname, 'src', 'manifest.webmanifest'),
    }

    const options: BuildOptions = {
        mode: env.mode ?? 'production',
        paths,
        port: env.port,
    }
    const config = buildWebpack(options);

    return config;
};
