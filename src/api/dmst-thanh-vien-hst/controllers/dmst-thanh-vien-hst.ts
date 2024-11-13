/**
 * dmst-thanh-vien-hst controller
 */

import { factories, Strapi } from '@strapi/strapi'

export default factories.createCoreController('api::dmst-thanh-vien-hst.dmst-thanh-vien-hst', ({strapi: Strapi}) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    // Kiểm tra nếu slug không tồn tại trong yêu cầu
    if (!slug) {
      return ctx.badRequest("Thiếu thông tin");
    }
    const entity = await strapi.entityService.findMany(
      "api::dmst-thanh-vien-hst.dmst-thanh-vien-hst",
      {
        fields: ["ten_thanh_vien", "mo_ta"],
        filters: { slug, publishedAt: { $ne: null} },
        populate: {
          noi_dung_bai_viet: {
            fields: ["mo_ta", "noi_dung", "nguon", "tac_gia"],
          },
        },
        sort: {ten_thanh_vien: "asc"}
      }
    );
    // Trả về dữ liệu đã sanitize (làm sạch)
    if (entity && Array.isArray(entity) && entity.length === 0) {
      return ctx.notFound("Không tìm thấy thành viên hệ sinh thái");
    }
    return Array.isArray(entity) ? entity[0] : entity;
  }
}));
