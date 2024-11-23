export default {
  async beforeCreate(event) {
    try {
      const { data } = event.params;
      const loai_va_tag = data.loai_va_tag ?? {
        articleTypeId: null,
        selectedTags: null,
      };
      const { articleTypeId, selectedTags } = loai_va_tag;
      if (articleTypeId) {
        data.skcd_loai_bai_viets = articleTypeId;
        if (selectedTags && selectedTags.length > 0) {
          data.skcd_tags = selectedTags.map((e) => ({ id: Number(e) }));
        }
      }
      if (!data["ngay_dang"]) {
        data["ngay_dang"] = data["createdAt"].toISOString().slice(0, 10);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async beforeUpdate(event) {
    try {
      const { data } = event.params;
      const loai_va_tag = data.loai_va_tag ?? {
        articleTypeId: null,
        selectedTags: null,
      };
      const { articleTypeId, selectedTags } = loai_va_tag;
      if (articleTypeId) {
        data.skcd_loai_bai_viets = articleTypeId;
        if (selectedTags && selectedTags.length > 0) {
          data.skcd_tags = selectedTags.map((e) => ({ id: Number(e) }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  },
  async beforeDeleteMany(event) {
    try {
      const { where } = event.params;
      const bai_viets = await strapi.entityService.findMany(
        "api::skcd-bai-viet.skcd-bai-viet",
        {
          where,
          populate: ["like_bai_viet"],
        }
      );
      if (Array.isArray(bai_viets)) {
        for (const bai_viet of bai_viets) {
          if (bai_viet.like_bai_viet) {
            await strapi.entityService.delete(
              "api::like-bai-viet.like-bai-viet",
              bai_viet.like_bai_viet.id
            );
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  },
  async beforeDelete(event) {
    try {
      const { where } = event.params;
      const bai_viet = await strapi.entityService.findOne(
        "api::skcd-bai-viet.skcd-bai-viet",
        where.id,
        {
          populate: ["like_bai_viet"],
        }
      );
      if (bai_viet.like_bai_viet) {
        await strapi.entityService.delete(
          "api::like-bai-viet.like-bai-viet",
          bai_viet.like_bai_viet.id
        );
      }
    } catch (e) {
      console.error(e);
    }
  },
  async afterCreate(result) {
    try {
      if (
        result.result.like_bai_viet &&
        result.result.like_bai_viet.count >= 1
      ) {
        return;
      }
      const liked = await strapi.entityService.findMany(
        "api::like-bai-viet.like-bai-viet",
        {
          fields: ["id"],
          filters: {
            skcd_bai_viets: {
              id: result.result.id,
            },
          },
        }
      );
      if (liked.length == 0) {
        // Tạo bản ghi mới trong like_bai_viet
        const likeData = {
          skcd_bai_viet: [result.result.id], // Gán ID bài viết vào trường quan hệ
          like: 0, // Khởi tạo giá trị like
        };

        // Lưu bản ghi vào like_bai_viet
        const likeRecord = await strapi
          .service("api::like-bai-viet.like-bai-viet")
          .create({
            data: likeData,
            populate: "skcd_bai_viet",
            status: "published",
          });
        // Cập nhật trường quan hệ trong bài viết

        // await strapi
        //   .service("api::skcd-bai-viet.skcd-bai-viet")
        //   .update(result.result.id, {
        //     data: {
        //       like_bai_viet: likeRecord.id,
        //     },
        //   });
        await strapi.db.query("api::skcd-bai-viet.skcd-bai-viet").update({
          where: { id: result.result.id },
          data: {
            like_bai_viet: likeRecord.id,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
};
