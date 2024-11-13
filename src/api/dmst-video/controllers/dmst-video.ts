/**
 * dmst-video controller
 */

import { factories } from '@strapi/strapi'
import CONFIG_VAR from '../../../config/CONFIG_VAR';

export default factories.createCoreController('api::dmst-video.dmst-video', {
  async find(ctx) {
    const { page } = ctx.query
    const limit = CONFIG_VAR.LIMIT_VIDEO();
    const entities = await strapi.entityService.findMany("api::dmst-video.dmst-video", {
      fields: ['ten_video', 'mo_ta', 'link_embed', 'slug', 'publishedAt'],
      sort: {
        ngay_dang: 'desc'
      },
      filters: {
        publishedAt: {
          $ne: null
        }
      },
      limit: limit,
      start: (Number(page ?? 1) - 1) * limit,
    })
    const count = await strapi.entityService.count(
      "api::dmst-video.dmst-video",
      {
        filters: {
          publishedAt: {
            $ne: null,
          },
        },
      }
    );
    return {
      data: entities,
      total_pages: Math.ceil(count / limit),
      page: Number(page ?? 1),
      page_size: limit,
    };
  },
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    // Kiểm tra nếu slug không tồn tại trong yêu cầu
    if (!slug) {
      return ctx.badRequest("Thiếu thông tin");
    }
    const entity = await strapi.entityService.findMany(
      "api::dmst-video.dmst-video",
      {
        fields: ["ten_video", "mo_ta", "link_embed", "slug", "publishedAt"],
        filters: {
          slug,
          ngay_dang: "desc",
          publishedAt: {
            $ne: null,
          },
        },
      }
    );

    // Trả về dữ liệu đã sanitize (làm sạch)
    if (entity && Array.isArray(entity) && entity.length === 0) {
      return ctx.notFound("Không tìm thấy video");
    }

    return Array.isArray(entity) ? entity[0] : entity;
  }
});
