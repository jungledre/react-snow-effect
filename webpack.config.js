module.exports = {
	entry: "./entry.js",
	output: {
		path: __dirname,
		filename: "index.js"
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loader: "babel-loader" },
		]
	},
	devtool: "source-map",
	resolve: {
		extensions: [
			"",
			".js",
			".jsx"
		]
	}
};
