export interface BuildPaths {
    entry: string;
    html: string;
    output: string;
    favicon: string;
    manifest: string;
}

export type BuildMode = 'development' | 'production';

export interface BuildOptions {
    port?: number;
    mode: BuildMode;
    paths: BuildPaths;
}