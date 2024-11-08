// src/api/dmst-bai-viet/routes/custom-dmst-bai-viet.ts
export default {
    routes: [
      {
        method: "GET",
        path: "/dmst-bai-viets/slug/:slug",
        handler: "api::dmst-bai-viet.dmst-bai-viet.findBySlug",
      },
    ],
  };