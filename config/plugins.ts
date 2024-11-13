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
          field: "slug",
          references: "ten",
        },
        "dmst-loai-bai-viet": {
          field: "slug",
          references: "loai",
        },
        "dmst-tag": {
          field: "slug",
          references: "tag",
        },
        "dmst-thanh-vien-hst": {
          field: "slug",
          references: "ten_thanh_vien",
        },
        "dmst-video": {
          field: "slug",
          references: "ten_video",
        },
        "dmst-doc-nhanh": {
          field: "slug",
          references: "ten",
        },
      },
    },
  },
  seo: {
    enabled: true,
  },
  redis: {
    config: {
      settings: {
        debug: false,
        enableRedlock: true,
      },
      connections: {
        default: {
          connection: {
            host: process.env.REDIS_HOST ?? "127.0.0.1",
            port: 6379,
            db: 0,
          },
          settings: {
            debug: false,
          },
        },
      },
    },
  },
  // "rest-cache": {
  //   config: {
  //     provider: {
  //       name: "redis",
  //       getTimeout: 30000,
  //       options: {
  //         // The maximum size of the cache
  //         max: 32767,
  //         // Update to the current time whenever it is retrieved from cache, causing it to not expire
  //         updateAgeOnGet: false,
  //         // ...
  //       },
  //     },
  //     strategy: /* @type {CachePluginStrategy} */ {
  //       keysPrefix: "doi-moi-sang-tao",
  //       maxAge: 3600000,
  //       debug: false,
  //       contentTypes: [
  //         "api::dmst-bai-viet.dmst-bai-viet",
  //         "api::dmst-trang-chu.dmst-trang-chu",
  //         "api::dmst-loai-bai-viet.dmst-loai-bai-viet",
  //         "api::dmst-tag.dmst-tag",
  //         "api::dmst-thanh-vien-hst.dmst-thanh-vien-hst",
  //         "api::dmst-he-sinh-thai.dmst-he-sinh-thai",
  //         "api::dmst-doc-nhanh.dmst-doc-nhanh",
  //         "api::dmst-video.dmst-video",
  //         {
  //           contentType: "api::dmst-bai-viet.dmst-bai-viet",
  //           routes: [
  //             {
  //               path: "/api/dmst-bai-viets/slug/:slug+",
  //             },
  //           ],
  //         },
  //         {
  //           contentType: "api::dmst-loai-bai-viet.dmst-loai-bai-viet",
  //           routes: [
  //             {
  //               path: "/api/dmst-loai-bai-viets/slug/:slug+",
  //             },
  //           ],
  //         },
  //         {
  //           contentType: "api::dmst-tag.dmst-tag",
  //           routes: [
  //             {
  //               path: "/api/dmst-tags/slug/:slug+",
  //             },
  //           ],
  //         },
  //         {
  //           contentType: "api::dmst-thanh-vien-hst.dmst-thanh-vien-hst",
  //           routes: [
  //             {
  //               path: "/api/dmst-thanh-vien-hsts/slug/:slug+",
  //             },
  //           ],
  //         },
  //         {
  //           contentType: "api::dmst-he-sinh-thai.dmst-he-sinh-thai",
  //           routes: [
  //             {
  //               path: "/api/dmst-he-sinh-thais/slug/:slug+",
  //             },
  //           ],
  //         },
  //         {
  //           contentType: "api::dmst-doc-nhanh.dmst-doc-nhanh",
  //           routes: [
  //             {
  //               path: "/api/dmst-doc-nhanhs/slug/:slug+",
  //             },
  //           ],
  //         },
  //         {
  //           contentType: "api::dmst-video.dmst-video",
  //           routes: [
  //             {
  //               path: "/api/dmst-videos/slug/:slug+",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   },
  // },
  "content-versioning": {
    enabled: true,
  },
  settings: {
    gzip: {
      enabled: true,
      options: { level: 6 },
    },
  },
  meilisearch: {
    config: {
      host: process.env.MEILI_HOST ?? "http://127.0.0.1:7700",
      apiKey: process.env.MEILI_MASTER_KEY,
      restaurant: {
        indexName: "my_restaurants",
      },
      "dmst-bai-viet": {
        settings: {
          sortableAttributes: ["ngay_dang"],
        },
      },
      "dmst-video": {
        settings: {
          sortableAttributes: ["ngay_dang"],
        },
      },
      "dmst-thanh-vien-hst": {
        settings: {
          sortableAttributes: ["ngay_dang"],
        },
      },
      "dmst-doc-nhanh": {
        settings: {
          sortableAttributes: ["ngay_dang"],
        },
      },
    },
  },
});
