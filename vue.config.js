const GRAPHQL_URL = process.env.DP_K8S ? 'http://dinopark.mozilla.community:80' : 'http://localhost:5000';
const ORGCHART_URL = process.env.DP_K8S ? 'http://dinopark.mozilla.community:80' : 'http://localhost:8888';

module.exports = {
  configureWebpack: {
    resolve: {
      // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
      extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql'],
    },
    module: {
      rules: [ // fixes https://github.com/graphql/graphql-js/issues/1272
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
      '/graphql': {
        target: GRAPHQL_URL,
        changeOrigin: true,
      },
      '/orgchart': {
        target: ORGCHART_URL,
        changeOrigin: true,
      },
    },
  },
};
