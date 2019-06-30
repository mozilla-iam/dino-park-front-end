const fs = require('fs');

const BASE_URL = process.env.DP_BASE_URL || '/';
const HTTPS_KEY = process.env.DP_HTTPS_KEY || false;
const HTTPS_CERT = process.env.DP_HTTPS_CERT || false;
const HTTPS = HTTPS_CERT &&
  HTTPS_KEY && {
    key: fs.readFileSync(HTTPS_KEY),
    cert: fs.readFileSync(HTTPS_CERT),
  };

module.exports = {
  productionSourceMap: false,
  filenameHashing: false,
  publicPath: BASE_URL,
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
      ],
    },
  },
  devServer: {
    https: HTTPS,
  },
};
