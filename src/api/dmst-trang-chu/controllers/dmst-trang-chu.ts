/**
 * dmst-trang-chu controller
 */

import { Strapi, factories } from '@strapi/strapi'

export default factories.createCoreController('api::dmst-trang-chu.dmst-trang-chu', ({strapi}: {strapi: Strapi}) => ({
  async find(ctx) {
    return await strapi.entityService.findMany(
      "api::dmst-trang-chu.dmst-trang-chu"
    , {
      populate: {
        'Header': {
          populate:'*',
        },
        'noi_dung': {
          populate: '*'
        },
        'Footer': {
          populate: '*'
        }
      }
    });
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
