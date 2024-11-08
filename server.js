
const strapi = require("@strapi/strapi");
const app = strapi({
  distDir: "./dist",
  app: {
    env: 'development',
  },
});

app.start();