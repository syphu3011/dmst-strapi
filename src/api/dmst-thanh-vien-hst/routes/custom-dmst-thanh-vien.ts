/**
 * dmst-tag router
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: "GET",
      path: "/dmst-thanh-vien-hsts/slug/:slug",
      handler: "api::dmst-thanh-vien-hst.dmst-thanh-vien-hst.findBySlug",
    },
  ],
};
