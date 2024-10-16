import path from 'path'
export default (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it

  // Perform customizations to webpack config
  config.mode = process.env.NODE_ENV
  config.bail = false
  config.devServer = {
    overlay: {
      errors: true,
      warnings: true,
    },
  };
  config.cache = {
    type: "filesystem",
    buildDependencies: {
      config: [path.resolve(__dirname, "webpack.config.ts")], // Lưu cache liên quan tới config hiện tại
    },
  };
  // Important: return the modified config
  return config;
};
