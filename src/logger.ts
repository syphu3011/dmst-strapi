// src/logger.ts
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(), // Ghi log vào console
    new transports.File({ filename: "error.log.json", level: "error" }), // Ghi log lỗi vào tệp
    new transports.File({ filename: "combined.log.json" }), // Ghi tất cả các log vào tệp
  ],
});

export default logger;
