/**
 * skcd-trang-chu controller
 */

import { Strapi, factories } from '@strapi/strapi'

export default factories.createCoreController('api::skcd-trang-chu.skcd-trang-chu', ({strapi}: {strapi: Strapi}) => ({
  async find(ctx) {
    const rs = await strapi.entityService.findMany(
      "api::skcd-trang-chu.skcd-trang-chu",
      {
        populate: {
          Header: {
            populate: "*",
          },
          noi_dung: {
            on: {
              "skcd.tin-tuc-noi-bat": {},
              "skcd.video": {},
              "skcd.tin-tuc-tong-hop": {
                populate: {
                  skcd_bai_viets: {
                    fields: ["id", "ten_bai_viet", "slug", "ngay_dang"],
                    populate: {
                      anh_dai_dien: {},
                      like_bai_viet: {},
                      noi_dung_bai_viet: {
                        fields: ["id", "mo_ta"]
                      },
                    },
                    sort: {
                      "ngay_dang": "desc"
                    },
                    filters: {
                      publishedAt: {
                        "$ne": null
                      }
                    },
                    limit: 10
                  },
                  skcd_loai_bai_viets: {
                    fields: ["id", "loai", "slug"],
                    populate: {
                      skcd_bai_viets: {
                        fields: ["id", "ten_bai_viet", "slug"],
                        populate: {
                          anh_dai_dien: {},
                        },
                      },
                    },
                  },
                  sang_kien_vui: {}
                },
              },
              "skcd.bai-viet-theo-tags": {
                populate: {
                  skcd_tags: {}
                }
              },
              "skcd.doi-tac": {
                populate: {
                  skcd_doi_tacs: {
                    fields: "*",
                    populate: {
                      anh_dai_dien: {}
                    }
                  },
                }
              }
            },
          },
          Footer: {
            fields: ['ten_trang', 'dia_chi', 'so_dien_thoai']
          }
        },
      }
    );
    const noi_dung = rs['noi_dung'] ?? []
    for (const item of noi_dung) {
      if (item.__component == 'skcd.tin-tuc-noi-bat') {
        const skcd_bai_viets = await strapi.entityService.findMany('api::skcd-bai-viet.skcd-bai-viet', {
          filters: {
            publishedAt: {
              $ne: null
            },
            noi_bat: true,
          },
          sort: {
            ngay_dang: "desc"
          },
          limit: 4,
          fields: ['id', 'ten_bai_viet', 'slug', , 'ngay_dang'],
          populate: {
            anh_dai_dien: {},
            noi_dung_bai_viet: {
              fields: ['id', 'mo_ta']
            },
            like_bai_viet: {
              fields: ['id', 'like']
            },
            // skcd_loai_bai_viets: {
            //   fields: ['id', 'loai']
            // },
            // skcd_tags: {
            //   fields: []
            // }
          }
        })
        item['skcd_bai_viets'] = skcd_bai_viets
      }
      else if (item.__component == 'skcd.video') {
        const skcd_videos = await strapi.entityService.findMany(
          "api::skcd-video.skcd-video",
          {
            fields: ["id", "ten", "link_embed", "slug", "ngay_dang"],
            filters: {
              publishedAt: {
                $ne: null,
              },
            },
            sort: {
              ngay_dang: "desc",
            }
          }
        );
        item['skcd_videos'] = skcd_videos
      }
      else if (item.__component == "skcd.tin-tuc-tong-hop") {
        const skcd_bai_viets = await strapi.entityService.findMany(
          "api::skcd-bai-viet.skcd-bai-viet",
          {
            filters: {
              publishedAt: {
                $ne: null,
              },
            },
            sort: {
              ngay_dang: "desc",
            },
            limit: 10,
            fields: ["id", "ten_bai_viet", "slug", , "ngay_dang"],
            populate: {
              anh_dai_dien: {},
              noi_dung_bai_viet: {
                fields: ["id", "mo_ta"],
              },
              like_bai_viet: {
                fields: ["id", "like"],
              },
              // skcd_loai_bai_viets: {
              //   fields: ['id', 'loai']
              // },
              // skcd_tags: {
              //   fields: []
              // }
            },
          }
        );
        item["skcd_bai_viets"] = skcd_bai_viets;
        for (const loai of item.skcd_loai_bai_viets) {
          const skcd_bai_viets = await strapi.entityService.findMany(
            "api::skcd-bai-viet.skcd-bai-viet",
            {
              filters: {
                publishedAt: {
                  $ne: null,
                },
                skcd_loai_bai_viets: {
                  id: loai.id,
                }
              },
              sort: {
                ngay_dang: "desc",
              },
              limit: 5,
              fields: ["id", "ten_bai_viet", "slug", , "ngay_dang"],
              populate: {
                anh_dai_dien: {},
                noi_dung_bai_viet: {
                  fields: ["id", "mo_ta"],
                },
                like_bai_viet: {
                  fields: ["id", "like"],
                },
                // skcd_loai_bai_viets: {
                //   fields: ['id', 'loai']
                // },
                // skcd_tags: {
                //   fields: []
                // }
              },
            }
          );
          loai["skcd_bai_viets"] = skcd_bai_viets;
        }
      }
      else if (item.__component == "skcd.bai-viet-theo-tags") {
        const tags = item.skcd_tags
        for (const tag of tags) {
          const skcd_bai_viets = await strapi.entityService.findMany("api::skcd-bai-viet.skcd-bai-viet", {
            fields: ["id", "ten_bai_viet", "slug"],
            populate: {
              anh_dai_dien: {},
              noi_dung_bai_viet: {
                fields: ["id", 'mo_ta']
              }
            },
            filters: {
              publishedAt: {
                "$ne": null
              },
              skcd_tags: {
                id: tag.id
              }
            },
            sort: {
              ngay_dang: "desc"
            },
            limit: 3
          })
          tag["skcd_bai_viets"] = skcd_bai_viets
        }
      }
    }
    return rs
  }
}));
