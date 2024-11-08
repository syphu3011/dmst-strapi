export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  "global::audit-log",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "'unsafe-inline'"],
          /*"img-src": [
            "self",
            "data:",
            "https://images.squarespace-cdn.com/",
            "*.strapi.io",
            "http://localhost:"+process.env.PORT,
            "http://172.30.10.85:1337",
			`http://116.109.42.111:${process.env.PORT}`,
            "https://multiply-sound-goose.ngrok-free.app/",
          ],*/
		      "img-src": ["*"],
        },
      },
    },
  },
  "global::error-global-handling",
  "global::rate-limit"
];
