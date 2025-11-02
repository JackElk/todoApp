const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    resolve: { extensions: [".ts", ".js"] },
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
            { test: /\.css$/i, use: ["style-loader", "css-loader"] },
            { test: /\.(png|jpg|jpeg|gif|svg)$/i, type: "asset/resource" },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/pages/characters.html",
            filename: "characters.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/index.html",
            filename: "index.html",
        }),
    ],
    mode: "development",
    devServer: {
        static: "./dist",
        port: 3000,
    },
};