export default () => ({
  "custom-tag-input": {
    enabled: true,
    resolve: "./src/plugins/custom-tag-input",
  },
  documentation: {
    // enabled: process.env.NODE_ENV === "production", // Chỉ bật khi ở production
    enabled: process.env.NODE_ENV === "development",
  },
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        "dmst-bai-viet": {
          field: "slug",
          references: "ten_bai_viet",
        },
        "dmst-he-sinh-thai": {
          field: "link",
          references: "ten",
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
        getTimeout: 5000,
        options: {
          // The maximum size of the cache
          max: 32767,
          // Update to the current time whenever it is retrieved from cache, causing it to not expire
          updateAgeOnGet: false,
          // ...
        },
      },
      strategy: /* @type {CachePluginStrategy} */ {
        keysPrefix: "doi-moi-sang-tao",
        maxAge: 3600000,
        debug: false,
        contentTypes: [
          "api::dmst-bai-viet.dmst-bai-viet",
          "api::dmst-trang-chu.dmst-trang-chu",
          {
            contentType: "api::dmst-bai-viet.dmst-bai-viet",
            routes: [
              {
                path: "/api/dmst-bai-viets/slug/:slug+",
              },
            ],
          },
        ],
      },
    },
  },
  "content-versioning": {
    enabled: true,
  },
  settings: {
    gzip: {
      enabled: true,
      options: { level: 6 },
    },
  },
});
