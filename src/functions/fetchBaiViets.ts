import { Strapi } from "@strapi/strapi";

export default async function fetchBaiViets(strapi: Strapi, filters: {}, limit = 3, page = 1) {
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
        anh_dai_dien: {},
      },
      filters: filters,
      sort: { createdAt: "desc" },
      limit: limit,
      start: (page - 1) * 10
    }
  );
}
