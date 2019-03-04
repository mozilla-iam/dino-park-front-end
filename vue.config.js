const fs = require('fs');

const DINOPARK_URL = process.env.DP_K8S || 'http://localhost:8081';
const BASE_URL = process.env.DP_BASE_URL || '/beta/';
const SSL_KEY = process.env.DP_SSL_KEY;
const SSL_CERT = process.env.DP_SSL_CERT;

const config = {
  filenameHashing: false,
  baseUrl: BASE_URL,
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
    proxy: {
      '/api/v3/': {
        target: DINOPARK_URL,
        changeOrigin: true,
      },
    },
  },
};

if (SSL_CERT && SSL_KEY) {
  config.devServer.https = {
    key: fs.readFileSync(SSL_KEY),
    cert: fs.readFileSync(SSL_CERT),
  };
}

module.exports = config;
