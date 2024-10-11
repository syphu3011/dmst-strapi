/**
 * dmst-tag controller
 */

import { factories, Strapi } from '@strapi/strapi'
import dmstLoaiBaiViet from '../../dmst-loai-bai-viet/controllers/dmst-loai-bai-viet';

export default factories.createCoreController(
  "api::dmst-tag.dmst-tag",
  ({ strapi }: { strapi: Strapi }) => ({
    async findByArticleType(ctx) {
      const { articleTypeId } = ctx.params;
      const tags = await strapi
        .service("api::dmst-tag.dmst-tag")
        .find({
          'dmst_loai_bai_viets': [articleTypeId],
        });
      return tags;
    },
  })
);
