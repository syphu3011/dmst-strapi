/**
 * dmst-he-sinh-thai controller
 */

import { factories, Strapi } from '@strapi/strapi'
import CONFIG_VAR from '../../../config/CONFIG_VAR';
export default factories.createCoreController(
  "api::dmst-he-sinh-thai.dmst-he-sinh-thai",
  ({ strapi: Strapi }) => ({
    // async find(ctx) {
    //   return await strapi.entityService.findMany(
    //     "api::dmst-he-sinh-thai.dmst-he-sinh-thai",
    //     {
    //       fields: ["ten", "slug"],
    //       populate: {
    //         anh_dai_dien: {},
    //         dmst_thanh_vien_hsts: {
    //           fields: ["ten_thanh_vien", "mo_ta", "slug"],
    //           sort: { ten_thanh_vien: "asc" },
    //           filters: { publishedAt: { $ne: null } },
    //         },
    //       },
    //       filters: { publishedAt: { $ne: null } },
    //       sort: { ten: "asc" },
    //     }
    //   );
    // },
    async findBySlug(ctx) {
      const { slug } = ctx.params;
      const { page } = ctx.query
      const limit = CONFIG_VAR.LIMIT_THANH_VIEN_HST();
      // Kiểm tra nếu slug không tồn tại trong yêu cầu
      if (!slug) {
        return ctx.badRequest("Thiếu thông tin");
      }
      const entity = await strapi.entityService.findMany(
        "api::dmst-he-sinh-thai.dmst-he-sinh-thai",
        {
          fields: ["ten", "slug"],
          populate: {
            anh_dai_dien: {},
            dmst_thanh_vien_hsts: {
              fields: ["ten_thanh_vien", "mo_ta", "slug"],
              filters: { publishedAt: { $ne: null } },
              sort: { ten_thanh_vien: "asc" },
              limit: limit,
              start:
                (Number(page ?? 1) - 1) * limit,
            },
          },
          filters: { slug: { $eq: slug }, publishedAt: { $ne: null } },
          sort: { ten: "asc" },
        }
      );

      // Trả về dữ liệu đã sanitize (làm sạch)
      if (entity && Array.isArray(entity) && entity.length === 0) {
        return ctx.notFound("Không tìm thấy hệ sinh thái");
      }
      const e_browse = Array.isArray(entity) ? entity[0] : entity;
      // Tính toán số trang
      const count = await strapi.entityService.count(
        "api::dmst-thanh-vien-hst.dmst-thanh-vien-hst",
        {
          filters: {
            publishedAt: { $ne: null },
            dmst_he_sinh_thai: {
              id: e_browse.id
            }
          },
        }
      );
      e_browse["total_pages"] = Math.ceil(count / limit)
      e_browse["page"] = Number(page ?? 1)
      e_browse["page_size"] = limit
      return e_browse
    },
  })
);
