// src/api/dmst-video/routes/custom-dmst-video.ts
export default {
    routes: [
      {
        method: "GET",
        path: "/dmst-videos/slug/:slug",
        handler: "api::dmst-video.dmst-video.findBySlug",
      },
    ],
  };
