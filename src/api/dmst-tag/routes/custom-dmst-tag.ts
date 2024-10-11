/**
 * dmst-tag router
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: "GET",
      path: "/tags/by-article-type/:articleTypeId",
      handler: "api::dmst-tag.dmst-tag.findByArticleType",
    },
  ],
};
