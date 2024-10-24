import { Strapi } from "@strapi/strapi";
import rateLimit from "koa-ratelimit";
import { Context } from "koa";
const db = new Map();

export default (config: any, { strapi }: { strapi: Strapi }) => {
  return rateLimit({
    driver: "memory",
    db,
    duration: 60000, // 60 seconds
    errorMessage: "Too many requests, please try again later.",
    max: 100,
    id: (ctx) => ctx.ip,
    headers: {
      remaining: "Rate-Limit-Remaining",
      reset: "Rate-Limit-Reset",
      total: "Rate-Limit-Total",
    },
    disableHeader: false,
  });
};
