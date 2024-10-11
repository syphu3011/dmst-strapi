// import { marked } from 'marked'; // Import đúng cách

// type LifecycleEvent = {
//   params: {
//     data: {
//       hello?: string;
//       [key: string]: any;
//     };
//   };
// };

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    const loai_va_tag = data.loai_va_tag ?? {articleTypeId: null, selectedTags: null}
    const {articleTypeId, selectedTags} = loai_va_tag
    if (articleTypeId) {
      data.dmst_loai_bai_viets = articleTypeId;
      if (selectedTags && selectedTags.length > 0) {
        data.dmst_tags = selectedTags.map((e) => ({ id: Number(e) }));
      }
    }
  },
  async beforeUpdate(event) {
    const { data } = event.params;
    const loai_va_tag = data.loai_va_tag ?? {
      articleTypeId: null,
      selectedTags: null,
    };
    const { articleTypeId, selectedTags } = loai_va_tag;
    if (articleTypeId) {
      data.dmst_loai_bai_viets = articleTypeId;
      if (selectedTags && selectedTags.length > 0) {
        data.dmst_tags = selectedTags.map((e) => ({ id: Number(e) }));
      }
    }
  },
  async afterCreate(result) {
    const liked = await strapi.db.query('api::like-bai-viet.like-bai-viet').findOne({
      select: ['like'],
      where: {
        dmst_bai_viet: result.result.id
      }
    })
    if (!liked) {
      // Tạo bản ghi mới trong like_bai_viet
      const likeData = {
        dmst_bai_viet: result.result.id, // Gán ID bài viết vào trường quan hệ
        like: 0, // Khởi tạo giá trị like
      };

      // Lưu bản ghi vào like_bai_viet
      const likeRecord = await strapi
        .service("api::like-bai-viet.like-bai-viet")
        .create({
          data: likeData,
          populate: 'dmst_bai_viet',
          status: "published",
        });
      // Cập nhật trường quan hệ trong bài viết
      console.log(likeRecord.id);
      await strapi.entityService.update("api::dmst-bai-viet.dmst-bai-viet",
        result.result.id,
        {
          data: {
            'like_bai_viet': likeRecord.id,
          }
        },
      );
    }
  }
};
