/**
 * dmst-loai-bai-viet controller
 */

import { factories, Strapi } from '@strapi/strapi'
import fetchBaiViets from '../../../functions/fetchBaiViets';
import CONFIG_VAR from '../../../config/CONFIG_VAR';

export default factories.createCoreController(
  "api::dmst-loai-bai-viet.dmst-loai-bai-viet",
  ({ strapi }: { strapi: Strapi }) => ({
    // async find(ctx) {
    //   return await strapi.entityService.findMany(
    //     "api::dmst-loai-bai-viet.dmst-loai-bai-viet",
    //     {
    //       fields: "*",
    //       filters: { publishedAt: { $ne: null } },
    //       populate: {
    //         dmst_tags: {
    //           fields: ["id", "tag", "slug"],
    //           populate: {
    //             dmst_bai_viets: {
    //               fields: ["ten_bai_viet", "slug", "ngay_dang"],
    //               filters: { publishedAt: { $ne: null } },
    //               populate: {
    //                 noi_dung_bai_viet: {
    //                   fields: ["mo_ta"],
    //                 },
    //               },
    //               sort: { ngay_dang: "desc" }, // Sắp xếp theo ngày đăng mới nhất
    //             },
    //           },
    //         },
    //       },
    //     }
    //   );
    // },
    // async findOne(ctx) {
    //   return await strapi.entityService.findOne(
    //     "api::dmst-loai-bai-viet.dmst-loai-bai-viet",
    //     ctx.params.id,
    //     {
    //       fields: "*",
    //       populate: {
    //         dmst_tags: {
    //           fields: ["id", "tag"],
    //           populate: {
    //             dmst_bai_viets: {
    //               fields: ["ten_bai_viet", "slug", "ngay_dang"],
    //               populate: {
    //                 noi_dung_bai_viet: {
    //                   fields: ["mo_ta"],
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     }
    //   );
    // },
    async findBySlug(ctx) {
      const { slug } = ctx.params;
      const { page } = ctx.query;
      const limit = CONFIG_VAR.LIMIT_TAG();
      // Kiểm tra nếu slug không tồn tại trong yêu cầu
      if (!slug) {
        return ctx.badRequest("Thiếu thông tin");
      }

      // Tìm bài viết với slug và populate các trường liên quan
      const entity = await strapi.entityService.findMany(
        "api::dmst-loai-bai-viet.dmst-loai-bai-viet",
        {
          fields: "*",
          filters: { slug, publishedAt: { $ne: null } },
          populate: {
            dmst_tags: {
              fields: ["id", "tag", "slug"],
              filters: {
                publishedAt: {
                  $ne: null
                }
              },
              limit: limit,
              start: (Number(page ?? 1) - 1) * limit,
            },
          },
        }
      );
      // Trả về dữ liệu đã sanitize (làm sạch)
      if (entity && Array.isArray(entity) && entity.length === 0) {
        return ctx.notFound("Không tìm thấy loại bài viết");
      }
      const e_browse = Array.isArray(entity) ? entity[0] : entity;
      for (const tag of e_browse['dmst_tags']) {
        tag["dmst-bai-viets"] = await fetchBaiViets(
          strapi,
          {
            $and: [
              {
                dmst_loai_bai_viets: e_browse["id"],
              },
              {
                dmst_tags: tag.id,
              },
            ],
          },
          CONFIG_VAR.LIMIT_BAI_VIET()
        );
      }
      const allTagsPublished = await strapi.entityService.count("api::dmst-tag.dmst-tag", {
        filters: {
          publishedAt: {
            $ne: null,
          },
        },
      });
      e_browse['total_pages'] = Math.ceil(allTagsPublished / limit);
      e_browse['page'] = Number(page ?? 1)
      e_browse['page_size'] = limit

      return e_browse
    }
  })
);
