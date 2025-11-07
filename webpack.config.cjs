const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        tasks: "./src/components/tasks.ts",
        characters: "./src/components/characters.ts",
    },

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    resolve: {
        extensions: [".ts", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: "asset/resource",
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/pages/tasks.html",
            chunks: ["tasks"],
            filename: "tasks.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/characters.html",
            chunks: ["characters"],
            filename: "characters.html",
        }),
    ],

    mode: "development",

    devServer: {
        static: "./dist",
        port: 3000,
        open: {
            target: ["tasks.html"],
        },
    },
};