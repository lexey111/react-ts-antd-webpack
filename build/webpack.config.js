const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const tsImportPluginFactory = require('ts-import-plugin');
tsImportPluginFactory({style: true});
const TerserPlugin = require('terser-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const stats = {
	assets: true,
	cached: false,
	cachedAssets: false,
	children: false,
	chunks: false,
	chunkModules: false,
	env: true,
	chunkOrigins: false,
	depth: false,
	entrypoints: true,
	errors: true,
	errorDetails: true,
	hash: false,
	maxModules: 0,
	modules: true,
	moduleTrace: false,
	performance: false,
	providedExports: false,
	publicPath: false,
	reasons: true,
	source: false,
	timings: true,
	usedExports: false,
	version: true,
	warnings: true,
};

module.exports = (env, args) => {
	let isProduction = false;
	let analyze = false;

	if (args && args['mode'] === 'production') {
		isProduction = true;
		console.log('== Production mode');
	} else {
		console.log('== Development mode');
	}
	if (args && args['analyze']) {
		console.log('++ Bundle analyze mode');
		analyze = true;
	}

	const config = {
		entry: {
			'scripts/main': './src/index.tsx',
		},
		output: {
			path: path.resolve('./dist'),
		},
		performance: {
			hints: 'warning',
			maxAssetSize: isProduction ? 1000000 : 20000000, // int (in bytes),
			maxEntrypointSize: isProduction ? 1000000 : 20000000,
		},
		target: 'web',
		devtool: isProduction ? false : 'source-map',
		stats,
		optimization: {
			splitChunks: {
				chunks: 'all',
				// always create vendor.js
				cacheGroups: {
					antd: {
						test: /[\\/]node_modules[\\/](antd|@ant-design)/,
						name: 'scripts/antd',
						chunks: 'all',
						priority: 1,
						enforce: true,
					},
					react: {
						test: /[\\/]node_modules[\\/]react/,
						name: 'scripts/react',
						chunks: 'all',
						priority: 1,
						enforce: true,
					},
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'scripts/vendors',
						chunks: 'all',
						priority: -1,
						enforce: true,
					},
				},
			},
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.txt'],
			mainFields: ['module', 'browser', 'main'],
			alias: {
				'@ant-design/icons/lib/dist$': path.join(__dirname, '../src/icons.js')
			},
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					// eslint
					enforce: 'pre',
					use: [
						{
							options: {
								eslintPath: require.resolve('eslint'),
							},
							loader: require.resolve('eslint-loader'),
						},
					],
					exclude: /node_modules/,
				},
				{
					test: /\.(jsx|tsx|js|ts)$/,
					// typescript
					exclude: /node_modules/,
					use: [{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							silent: true,
							getCustomTransformers: () => ({
								before: [tsImportPluginFactory( /** options */)],
							}),
							compilerOptions: {
								module: 'es2015',
							},
						},
					}],
				},
				{
					test: /\.less$/i,
					// app main .less file
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'styles/app.css',
							},
						},
						{
							loader: 'less-loader',
							options:
								isProduction ? {
									sourceMap: true,
									javascriptEnabled: true,
									minimize: {
										discardComments: {
											removeAll: true,
										},
									},
								} : {
									sourceMap: true,
									javascriptEnabled: true,
									minimize: false,
								},
						},
					],
				},
			],
		},
		devServer: {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			contentBase: path.resolve('./dist'),
			historyApiFallback: true,
			compress: true,
			port: 3030,
		},
		plugins: [
			new webpack.DefinePlugin({
				PRODUCTION: JSON.stringify(isProduction),
			}),
			new AntdDayjsWebpackPlugin(),
			new CopyWebpackPlugin([
				// static files to the site root folder (index and robots)
				{
					from: './src/static/**/*',
					to: path.resolve('./dist/'),
					toType: 'dir',
					flatten: true,
				},
			]),
		],
	};

	if (isProduction && analyze) {
		config.plugins.push(new BundleAnalyzerPlugin())
	}

	if (isProduction) {
		config.optimization.minimizer = [
			new TerserPlugin({
				sourceMap: false,
				cache: true,
				parallel: true,
				terserOptions: {}
			}),
			new OptimizeCSSAssetsPlugin({}),
		]
	}

	return config;
};
