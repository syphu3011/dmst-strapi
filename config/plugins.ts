export default () => ({
  "custom-tag-input": {
    enabled: true,
    resolve: "./src/plugins/custom-tag-input",
  },
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        "dmst-bai-viet": {
          field: "slug",
          references: "ten_bai_viet",
        },
      },
    },
  },
  seo: {
    enabled: true,
  },
  "rest-cache": {
    config: {
      provider: {
        name: "memory",
        getTimeout: 500,
        options: {
          // The maximum size of the cache
          max: 32767,
          // Update to the current time whenever it is retrieved from cache, causing it to not expire
          updateAgeOnGet: false,
          // ...
        },
      },
      strategy: /* @type {CachePluginStrategy} */ {
        keysPrefix: "project-name",
        maxAge: 3600000,
        debug: true,
        contentTypes: [
          "api::dmst-bai-viet.dmst-bai-viet",
          "api::dmst-trang-chu.dmst-trang-chu",
        ],
      },
    },
  },
  "content-versioning": {
    enabled: true,
  },
});
