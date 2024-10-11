/**
 * dmst-loai-bai-viet controller
 */

import { factories, Strapi } from '@strapi/strapi'

export default factories.createCoreController('api::dmst-loai-bai-viet.dmst-loai-bai-viet', ({strapi}: {strapi: Strapi}) => ({
  // async find(ctx) {
  //   return await strapi.service('api::dmst-loai-bai-viet.dmst-loai-bai-viet').find({
  //     fields: '*'
  //   })
  // }
}));
