/**
 * dmst-tag controller
 */

import { factories, Strapi } from '@strapi/strapi'
import CONFIG_VAR from "../../../config/CONFIG_VAR";

export default factories.createCoreController(
  "api::dmst-tag.dmst-tag",
  ({ strapi }: { strapi: Strapi }) => ({
    async findByArticleType(ctx) {
      const { articleTypeId } = ctx.params;
      const tags = await strapi.service("api::dmst-tag.dmst-tag").find({
        dmst_loai_bai_viets: [articleTypeId],
      });
      return tags;
    },
    // async find(ctx) {
    //   return await strapi.entityService.findMany("api::dmst-tag.dmst-tag", {
    //     fields: ["tag", "slug"],
    //     populate: {
    //       dmst_bai_viets: {
    //         fields: ["ten_bai_viet", "slug"],
    //         populate: {
    //           noi_dung_bai_viet: {
    //             fields: ["mo_ta", "tac_gia"],
    //           },
    //         },
    //         sort: { ngay_dang: "desc" },
    //         filters: { publishedAt: { $ne: null } },
    //       },
    //     },
    //     filters: { publishedAt: { $ne: null } },
    //   });
    // },
    async findBySlug(ctx) {
      const { slug } = ctx.params;
      const { page } = ctx.query
      const limit = CONFIG_VAR.LIMIT_BAI_VIET();
      // Kiểm tra nếu slug không tồn tại trong yêu cầu
      if (!slug) {
        return ctx.badRequest("Thiếu thông tin");
      }
      const entity = await strapi.entityService.findMany(
        "api::dmst-tag.dmst-tag",
        {
          filters: { slug, publishedAt: { $ne: null } },
          fields: ["tag"],
          populate: {
            dmst_bai_viets: {
              fields: ["ten_bai_viet", "slug"],
              sort: { ngay_dang: "desc" },
              filters: { publishedAt: { $ne: null } },
              populate: {
                noi_dung_bai_viet: {
                  fields: ["mo_ta", "tac_gia"],
                },
              },
              limit: limit,
              start: (Number(page ?? 1) - 1) * limit,
            },
          },
        }
      );

      // Trả về dữ liệu đã sanitize (làm sạch)
      if (entity && Array.isArray(entity) && entity.length === 0) {
        return ctx.notFound("Không tìm thấy tag");
      }
      const e_browse = Array.isArray(entity) ? entity[0] : entity;

      const allBaiVietsPublished = await strapi.entityService.count(
        "api::dmst-bai-viet.dmst-bai-viet",
        {
          filters: {
            publishedAt: {
              $ne: null,
            },
            dmst_tags: {
              id: e_browse.id
            }
          },
        }
      );
      e_browse["total_pages"] = Math.ceil(allBaiVietsPublished / limit);
      e_browse["page"] = Number(page ?? 1);
      e_browse["page_size"] = limit;
      return e_browse;
    },
  })
);
