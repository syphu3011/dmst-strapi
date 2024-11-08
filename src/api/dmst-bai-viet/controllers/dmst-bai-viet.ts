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
    async findBySlug(ctx) {
      const { slug } = ctx.params;
      // Kiểm tra nếu slug không tồn tại trong yêu cầu
      if (!slug) {
        return ctx.badRequest("Thiếu thông tin");
      }

      // Tìm bài viết với slug và populate các trường liên quan
      const entity = await strapi.entityService.findMany(
        "api::dmst-bai-viet.dmst-bai-viet",
        {
          filters: { slug }, // Tìm bài viết theo slug
          fields: "*",
          populate: ["like_bai_viet", "noi_dung_bai_viet"],
        }
      );

      // Trả về dữ liệu đã sanitize (làm sạch)
      if (entity && Array.isArray(entity) && entity.length === 0) {
        return ctx.notFound("Không tìm thấy bài viết");
      }

      return Array.isArray(entity) ? entity[0] : entity
    }
  })
);
