// src/api/dmst-bai-viet/routes/custom-dmst-bai-viet.ts
export default {
    routes: [
      {
        method: "GET",
        path: "/dmst-loai-bai-viets/slug/:slug",
        handler: "api::dmst-loai-bai-viet.dmst-loai-bai-viet.findBySlug",
      },
    ],
  };
