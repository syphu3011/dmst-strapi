/**
 * dmst-trang-chu controller
 */

import { Strapi, factories } from '@strapi/strapi'

export default factories.createCoreController('api::dmst-trang-chu.dmst-trang-chu', ({strapi}: {strapi: Strapi}) => ({
  async find(ctx) {
    return await strapi.entityService.findMany(
      "api::dmst-trang-chu.dmst-trang-chu",
      {
        populate: {
          Header: {
            populate: "*",
          },
          noi_dung: {
            on: {
              "dmst.muc-chinh": {
                populate: {
                  bai_viet_theo_loai: {
                    populate: {
                      dmst_loai_bai_viets: {
                        populate: {
                          dmst_bai_viets: {
                            populate: "*",
                          },
                        },
                      },
                    },
                  },
                  tags_theo_loai: {
                    populate: "*",
                  },
                },
              },
              "dmst.he-sinh-thai": {
                populate: "*",
              },
              "dmst.banner": {
                populate: {
                  dmst_banners: {
                    fields: "*",
                    populate: "*",
                  },
                },
              },
              "dmst.muc-bai-viet-theo-tags": {
                populate: {
                  dmst_tags: {
                    populate: {
                      dmst_bai_viets: {
                        populate: "*",
                      },
                    },
                  },
                },
              },
              "dmst.muc-sau": {
                populate: {
                  doc_nhanh: true,
                  tags: {
                    populate: {
                      "dmst_tags": {
                        populate: {
                          "dmst_bai_viets": {
                            populate: "*",
                            limit: 3
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          Footer: {
            populate: "*",
          },
        },
      }
    );
  },
  async getHeader(ctx) {
    const rs = await strapi.entityService.findMany(
      "api::dmst-trang-chu.dmst-trang-chu",
      {
        populate: {
          Header: {
            populate: "*",
          }
        },
      }
    );
    return {header: rs.Header}
  },
  async getFooter(ctx) {
    const rs = await strapi.entityService.findMany(
      "api::dmst-trang-chu.dmst-trang-chu",
      {
        populate: {
          Footer: {
            populate: "*",
          }
        },
      }
    );
    return {footer: rs.Footer}
  },
  async getHeaderFooter(ctx) {
    const rs = await strapi.entityService.findMany(
      "api::dmst-trang-chu.dmst-trang-chu",
      {
        populate: {
          Header: {
            populate: "*",
          },
          Footer: {
            populate: "*",
          }
        },
      }
    );
    return {header: rs.Header, footer: rs.Footer}
  }
}));
