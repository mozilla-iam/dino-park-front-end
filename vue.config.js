module.exports = {
  devServer: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
};