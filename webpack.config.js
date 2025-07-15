// webpack.config.js
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        compress: true,
        open: false,
    },
    entry: {
        index: "./src/index.ts",
        post: "./src/post.ts",
        "post-list": "./src/post-list.ts",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: "babel-loader",
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public/asset"),
                    to: path.resolve(__dirname, "dist/asset"),
                    toType: "dir",
                },
                {
                    from: path.resolve(__dirname, "public/posts.json"),
                    to: path.resolve(__dirname, "dist/posts.json"),
                    toType: "file",
                },
            ],
            options: {
                concurrency: 100,
            },
        }),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            chunks: ["index"],
            minify: true,
        }),
        new HtmlWebPackPlugin({
            template: "./public/post.html",
            filename: "post.html",
            chunks: ["post"],
            minify: true,
        }),
        new HtmlWebPackPlugin({
            template: "./public/post-list.html",
            filename: "post-list.html",
            chunks: ["posts"],
            minify: true,
        }),
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/,
            threshold: 0,
            minRatio: 0.8,
            deleteOriginalAssets: false,
        }),
    ],
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
        splitChunks: {
            chunks: "all",

            // 生成 chunk 的最小体积（以 bytes 为单位）。
            // 因为演示的模块比较小，需要设置这个。
            minSize: 0,
        },
    },
};
