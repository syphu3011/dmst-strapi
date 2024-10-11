/**
 * dmst-trang-chu router
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: "GET",
      path: "/header",
      handler: "api::dmst-trang-chu.dmst-trang-chu.getHeader",
    },
    {
      method: "GET",
      path: "/footer",
      handler: "api::dmst-trang-chu.dmst-trang-chu.getFooter",
    },
    {
      method: "GET",
      path: "/headerfooter",
      handler: "api::dmst-trang-chu.dmst-trang-chu.getHeaderFooter",
    },
  ],
};
