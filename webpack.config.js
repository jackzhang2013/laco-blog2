// webpack.config.js
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        compress: true,
    },
    entry: {
        index: "./src/index.js",
        post: "./src/post.js",
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
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public/asset"),
                    to: path.resolve(__dirname, "dist/asset"),
                    toType: "dir",
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
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/,
            threshold: 0,
            minRatio: 0.8,
            deleteOriginalAssets: false,
        }),
    ],
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
};
