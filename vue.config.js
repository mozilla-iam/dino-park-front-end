const DINOPARK_URL = process.env.DP_K8S || 'http://localhost:8081';
const BASE_URL = process.env.DP_BASE_URL || '/beta/';

module.exports = {
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
