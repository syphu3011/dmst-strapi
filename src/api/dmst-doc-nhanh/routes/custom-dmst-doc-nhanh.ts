// src/api/dmst-doc-nhanh/routes/custom-dmst-doc-nhanh.ts
export default {
    routes: [
      {
        method: "GET",
        path: "/dmst-doc-nhanhs/slug/:slug",
        handler: "api::dmst-doc-nhanh.dmst-doc-nhanh.findBySlug",
      },
    ],
  };
