import { Strapi } from "@strapi/strapi";
import logger from "../logger"
import type {
  DefaultContext,
  DefaultState,
  Next,
  ParameterizedContext,
  Context
} from "koa";

const errorHandler = (config: any, { strapi }: { strapi: Strapi }) => {
  async (ctx: Context, next: () => Promise<void>) => {
    try {
      await next();
    } catch (error) {
      logger.error("An error occurred: ", {
        message: error.message,
        stack: error.stack,
      });
      ctx.status = error.status || 500;
      ctx.body = {
        message: "An unexpected error occurred.",
        ...(process.env.NODE_ENV === "development" && { error: error.message }),
      };
    }
  };
};

export default errorHandler;
