module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./node_modules'],
        alias: {
          '^preact$': 'preact/compat',
          '^hack/preact$': 'preact',
        },
      },
    ],
  ],
};
