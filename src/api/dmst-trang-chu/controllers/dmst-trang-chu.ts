/**
 * dmst-trang-chu controller
 */

 import { Strapi, factories } from "@strapi/strapi";

 export default factories.createCoreController(
   "api::dmst-trang-chu.dmst-trang-chu",
   ({ strapi }: { strapi: Strapi }) => ({
     async find(ctx) {
       const rs = await strapi.entityService.findMany(
         "api::dmst-trang-chu.dmst-trang-chu",
         {
           populate: {
             Header: {
               populate: "*",
             },
             noi_dung: {
               on: {
                 "dmst.muc-chinh": {
                   populate: {
                     bai_viet_theo_loai: {
                       populate: {
                         dmst_loai_bai_viets: {
                           populate: {
                             dmst_bai_viets: {
                               populate: {
                                 noi_dung_bai_viet: {
                                   fields: ["id", "mo_ta"],
                                 },
                                 like_bai_viet: {
                                   fields: ["id", "like"],
                                 },
                                 anh_dai_dien: {}
                               },
                               sort: { ngay_dang: "desc" },
                               limit: 3,
                             },
                           },
                         },
                       },
                     },
                     tags_theo_loai: {
                       populate: "*",
                     },
                   },
                 },
                 "dmst.he-sinh-thai": {
                   populate: "*",
                 },
                 "dmst.banner": {
                   populate: {
                     dmst_banners: {
                       fields: "*",
                       populate: "*",
                     },
                   },
                 },
                 "dmst.muc-bai-viet-theo-tags": {
                   populate: {
                     dmst_tags: {
                       populate: {
                         dmst_bai_viets: {
                           populate: {
                             noi_dung_bai_viet: {
                               fields: ["id", "mo_ta"],
                             },
                             like_bai_viet: {
                               fields: ["id", "like"],
                             },
                           },
                           filters: {
                             publishedAt: { $ne: null },
                           },
                           sort: { ngay_dang: "desc" },
                           limit: 3,
                         },
                       },
                     },
                   },
                 },
                 "dmst.muc-sau": {
                   populate: {
                     doc_nhanh: true,
                     tags: {
                       populate: {
                         dmst_tags: {}
                       },
                     },
                   },
                 },
               },
             },
             Footer: {
               populate: "*",
             },
           },
         }
       );
       for (const nd of rs.noi_dung) {
         if (nd.__component == "dmst.muc-chinh") {
           const loai = nd.tags_theo_loai.loai_va_tag["articleTypeId"];
           const tags = nd.tags_theo_loai.loai_va_tag["selectedTags"].map((e) =>
             Number(e)
           );
           const rs_loai = await strapi.entityService.findOne(
             "api::dmst-loai-bai-viet.dmst-loai-bai-viet",
             loai,
             {
               fields: "loai",
             }
           );
           nd.tags_theo_loai["tags"] = [];
           nd.tags_theo_loai["loai"] = rs_loai.loai;
           for (const tag of tags) {
             const rs_tag = await strapi.entityService.findOne(
               "api::dmst-tag.dmst-tag",
               tag,
               {
                 fields: "tag",
               }
             );
             const bv = await fetchBaiViets(strapi, {
                   $and: [
                     {
                       dmst_loai_bai_viets: loai,
                     },
                     {
                       dmst_tags: tag,
                     },
                   ],
                 })
             nd.tags_theo_loai["tags"].push({ tag: rs_tag.tag, bai_viet: bv });
           }
           delete nd.tags_theo_loai.loai_va_tag;
         }
         else if (nd.__component == "dmst.muc-bai-viet-theo-tags") {
           for (const tag of nd.dmst_tags) {
             tag["dmst_bai_viets"] = [];
             const bai_viets = await fetchBaiViets(strapi, {
               publishedAt: { $ne: null },
               dmst_tags: { id: tag.id },
             });
             tag["dmst_bai_viets"] = bai_viets as any;
           }
         }
         else if  (nd.__component == "dmst.muc-sau") {
           for (const tag of nd.tags.dmst_tags) {
             tag["dmst_bai_viets"] = [];
             const bai_viets = await fetchBaiViets(strapi, {
               publishedAt: { $ne: null },
               dmst_tags: { id: tag.id },
             });
             tag["dmst_bai_viets"] = bai_viets as any;
           }
           // Lấy 10 video
           const videos = await strapi.entityService.findMany("api::dmst-video.dmst-video", {
            fields: "*",
            filters: {
              publishedAt: { $ne: null },
            },
            limit: 10,
            sort: {
              publishedAt:  "desc",
            }
          })
          nd["dmst-videos"] = videos

          // Lấy tin đọc nhanh mới nhất
          const doc_nhanh = await strapi.entityService.findMany("api::dmst-doc-nhanh.dmst-doc-nhanh", {
            fields: "*",
            filters: {
              publishedAt: { $ne: null },
            },
            limit: 1,
            sort: {
              ngay_dang:  "desc",
            },
            populate: {
              anh_doc_nhanh: {}
            }
          })
          nd["dmst-doc-nhanh"] = doc_nhanh
         }
       }
       return rs;
     },
     async getHeader(ctx) {
       const rs = await strapi.entityService.findMany(
         "api::dmst-trang-chu.dmst-trang-chu",
         {
           populate: {
             Header: {
               populate: "*",
             },
           },
         }
       );
       return { header: rs.Header };
     },
     async getFooter(ctx) {
       const rs = await strapi.entityService.findMany(
         "api::dmst-trang-chu.dmst-trang-chu",
         {
           populate: {
             Footer: {
               populate: "*",
             },
           },
         }
       );
       return { footer: rs.Footer };
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
             },
           },
         }
       );
       return { header: rs.Header, footer: rs.Footer };
     },
   })
 );
 async function fetchBaiViets(strapi: Strapi, filters: {}, limit = 3) {
   return await strapi.entityService.findMany(
     "api::dmst-bai-viet.dmst-bai-viet",
     {
       populate: {
         noi_dung_bai_viet: {
           fields: ["id", "mo_ta"],
         },
         like_bai_viet: {
           fields: ["id", "like"],
         },
         anh_dai_dien: {
         }
       },
       filters: filters,
       sort: { createdAt: "desc" },
       limit: limit,
     }
   );
 }
 