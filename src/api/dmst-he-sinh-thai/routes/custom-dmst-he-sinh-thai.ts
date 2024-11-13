// src/api/dmst-he-sinh-thai/routes/custom-dmst-he-sinh-thai.ts
export default {
  routes: [
    {
      method: "GET",
      path: "/dmst-he-sinh-thais/slug/:slug",
      handler: "api::dmst-he-sinh-thai.dmst-he-sinh-thai.findBySlug",
    },
  ],
};
