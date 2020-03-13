const fs = require('fs');
const yaml = require('yaml');

const BASE_URL = process.env.DP_BASE_URL || '/';
const HTTPS_KEY = process.env.DP_HTTPS_KEY || false;
const HTTPS_CERT = process.env.DP_HTTPS_CERT || false;
const HTTPS = HTTPS_CERT &&
  HTTPS_KEY && {
    key: fs.readFileSync(HTTPS_KEY),
    cert: fs.readFileSync(HTTPS_CERT),
  };

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  filenameHashing: true,
  publicPath: BASE_URL,
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .tap(() => {
        return {
          svgo: {
            plugins: [],
          },
        };
      })
      .end();
  },
  configureWebpack: {
    resolve: {
      // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
      extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql'],
    },
    module: {
      rules: [
        // fixes https://github.com/graphql/graphql-js/issues/1272
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /\.ftl$/,
          use: 'raw-loader',
        },
      ],
    },
  },
  devServer: {
    https: HTTPS,
    before(app) {
      app.get('/config/features.json', (_, res) => {
        res.json(yaml.parse(fs.readFileSync('./features-local.yaml', 'utf8')));
      });
    },
  },
};
