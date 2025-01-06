import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import 'webpack-dev-server';

const htmlFiles: string[] = [];
const directories = ['src'];
while (directories.length > 0) {
    const directory = directories.pop();
    const dirContents = fs.readdirSync(directory)
        .map(file => path.join(directory, file));

    htmlFiles.push(...dirContents.filter(file => file.endsWith('.html')));
    directories.push(...dirContents.filter(file => fs.statSync(file).isDirectory()));
}

interface EnvVariables {
    mode: 'development' | 'production';
    port: number;
}

export default (env: EnvVariables): webpack.Configuration => ({
    mode: env.mode ?? 'production',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: 'html-loader'
            },
            {
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
                    filename: 'images/[file]'
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        ...htmlFiles.map(htmlFile =>
            new HtmlWebpackPlugin({
                template: htmlFile,
                filename: htmlFile.replace(path.normalize("src/"), ""),
                inject: 'body',

            })
        ),
        new webpack.ProgressPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: env.port ?? 3000,
    },
});
