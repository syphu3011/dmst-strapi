/**
 * dmst-doc-nhanh controller
 */

import { factories, Strapi } from '@strapi/strapi'
import CONFIG_VAR from '../../../config/CONFIG_VAR'

export default factories.createCoreController('api::dmst-doc-nhanh.dmst-doc-nhanh',
   ({strapi: Strapi}) => ({
    async find(ctx) {
      const { page } = ctx.query
      const limit = CONFIG_VAR.LIMIT_DOC_NHANH();
      const entities = await strapi.entityService.findMany(
        "api::dmst-doc-nhanh.dmst-doc-nhanh",
        {
          filters: { publishedAt: { $ne: null } },
          fields: ["ten", "ngay_dang", "slug"],
          populate: {
            anh_doc_nhanh: {},
          },
          limit:limit,
          start: (Number(page ?? 1) - 1) *limit,
        }
      );
      const count = await strapi.entityService.count("api::dmst-doc-nhanh.dmst-doc-nhanh", {
        filters: {
          publishedAt: {
            $ne: null
          }
        }
      })
      return {data: entities, total_pages: Math.ceil(count /limit), page: Number(page??1), page_size:limit}
    },
    async findBySlug(ctx) {
       const { slug } = ctx.params;
       // Kiểm tra nếu slug không tồn tại trong yêu cầu
       if (!slug) {
         return ctx.badRequest("Thiếu thông tin");
       }

       // Tìm bài viết với slug và populate các trường liên quan
       const entity = await strapi.entityService.findMany(
         "api::dmst-doc-nhanh.dmst-doc-nhanh",
         {
           filters: { slug, publishedAt: { $ne: null } },
           fields: ["ten", "ngay_dang"],
           populate: {
             anh_doc_nhanh: {},
           }
         }
       );

       // Trả về dữ liệu đã sanitize (làm sạch)
       if (entity && Array.isArray(entity) && entity.length === 0) {
         return ctx.notFound("Không tìm thấy bài viết");
       }

       return Array.isArray(entity) ? entity[0] : entity;
    }
   })
);
