/**
 * dmst-bai-viet controller
 */

import { factories, Strapi } from '@strapi/strapi'

export default factories.createCoreController(
  "api::dmst-bai-viet.dmst-bai-viet",
  ({ strapi: Strapi }) => ({
    async find(ctx) {
      const rs = await strapi.entityService.findMany(
        "api::dmst-bai-viet.dmst-bai-viet",
        {
          fields: "*",
          populate: ["like_bai_viet", "noi_dung_bai_viet"],
        }
      );
      if (Array.isArray(rs)) {
        for (const e of rs) {
          e["like"] = e.like_bai_viet?.like ?? 0;
        }
      }
      else {
        rs["like"] = rs.like_bai_viet?.like ?? 0;
      }
      return rs;
    },
    async findOne(ctx) {
      const rs = await strapi.entityService.findOne(
        "api::dmst-bai-viet.dmst-bai-viet",
        ctx.params.id,
        {
          fields: "*",
          populate: ["like_bai_viet", "noi_dung_bai_viet"],
        }
      );
      rs["like"] = rs.like_bai_viet?.like ?? 0;
      return rs;
    },
  })
);
