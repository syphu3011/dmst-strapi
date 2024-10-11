import {Strapi} from '@strapi/strapi'
import { error } from 'console';
async function like(strapi: Strapi, postId: string, liked = false) {
  // Tìm bài viết theo ID
  // const article = await strapi.service("api::bai-viet.bai-viet").findOne({
  //   id: postId
  // });

  // if (!article) {
  //   return 0
  // }

  // // Tăng lượt thích
  // const updatedArticle = await strapi.service("api::bai-viet.bai-viet").update(
  //   {
  //     id: postId,
  //     data: {
  //       like: article.like + (liked ? -1 : 1),
  //     },
  //   }
  // );
  // return updatedArticle.like
  try {
    const id = postId;

    // Tìm bài viết theo ID
    const article = await strapi.entityService.findOne('api::dmst-bai-viet.dmst-bai-viet',id,{
      populate: ["like_bai_viet"],
    });
    // console.log(article, 'chịu');

    if (!article) {
      return 0
    }
    // Tăng lượt thích
    const updatedLike = await strapi.entityService
      .update("api::like-bai-viet.like-bai-viet", article.like_bai_viet.id, {
        data: {
          like: article.like_bai_viet.like + (liked ? -1 : 1),
        },
      })

    // Trả về bài viết đã được cập nhật
    return updatedLike.like;
  } catch (error) {
    console.log(error)
    return 0
  }
  return 0

}
export default like
