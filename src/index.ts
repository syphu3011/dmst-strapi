import Core, { Strapi } from "@strapi/strapi";
import { Server } from "socket.io";
import like from "./functions/like";
import verify from "./functions/rc_verify";
// import socketConfig from "../config/socket";
export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Strapi }) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      // Có thể thêm logic để gửi thông báo hoặc ghi log
    });
    // socketConfig(strapi);
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*", // Cho phép tất cả origin (có thể điều chỉnh)
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("like", async (data, callback) => {
        console.log(data);
        const isValid = await verify(data.rc_token);
        console.log(isValid);
        if (isValid && isValid.success && isValid.score >= 0.5) {
          const likeUpdate = await like(strapi, data.postId, data.cookie != "");
          console.log(likeUpdate, "day nè");
          // const likeUpdate = 0
          // callback({ postId: data.postId, like:  likeUpdate}); // Cập nhật số lượng like
          socket.broadcast.emit("likeUpdate", {
            postId: data.postId,
            like: likeUpdate,
          });
          socket.emit("likeUpdate", {
            postId: data.postId,
            like: likeUpdate,
          });
          callback(likeUpdate);
        } else {
          // Gửi thông báo lỗi đến client
          socket.emit("likeError", {
            postId: data.postId,
            message: "Like không hợp lệ!",
          });
          callback(-1);
        }
      });

      socket.on("disconnect", (io) => {
        console.log("User disconnected");
      });
    });

    // Đánh chỉ mục
    // Chỉ mục cho bài viết
    try {
      // Kiểm tra xem chỉ mục đã tồn tại chưa
      const [indexExists] = await strapi.db.connection.raw(`
        SELECT COUNT(1) AS count
        FROM information_schema.statistics
        WHERE table_schema = DATABASE()
          AND table_name = 'dmst_bai_viets'
          AND index_name = 'idx_bai_viet_slug';
      `);

      if (indexExists[0].count === "0") {
        // Nếu chưa tồn tại, tạo chỉ mục mới
        await strapi.db.connection.raw(`
          CREATE INDEX idx_bai_viet_slug ON dmst_bai_viets(slug(255));
        `);
        console.log("Tạo chỉ mục thành công với dmst_bai_viets.slug.");
      } else {
        console.log("Chỉ mục dmst_bai_viets.slug đã tồn tại.");
      }
    } catch (error) {
      console.error("Lỗi tạo chỉ mục", error);
    }
    // Chỉ mục cho loại bài viết
    try {
      // Kiểm tra xem chỉ mục đã tồn tại chưa
      const [indexExists] = await strapi.db.connection.raw(`
        SELECT COUNT(1) AS count
        FROM information_schema.statistics
        WHERE table_schema = DATABASE()
          AND table_name = 'dmst_loai_bai_viets'
          AND index_name = 'idx_loai_bai_viet_slug';
      `);
      if (indexExists[0].count === "0") {
        // Nếu chưa tồn tại, tạo chỉ mục mới
        await strapi.db.connection.raw(`
          CREATE INDEX idx_loai_bai_viet_slug ON dmst_loai_bai_viets(slug(255));
        `);
        console.log("Tạo chỉ mục thành công với dmst_loai_bai_viets.slug.");
      } else {
        console.log("Chỉ mục dmst_loai_bai_viets.slug đã tồn tại.");
      }
    } catch (error) {
      console.error("Lỗi tạo chỉ mục", error);
    }

    // Chỉ mục cho tag
    try {
      // Kiểm tra xem chỉ mục đã tồn tại chưa
      const [indexExists] = await strapi.db.connection.raw(`
        SELECT COUNT(1) AS count
        FROM information_schema.statistics
        WHERE table_schema = DATABASE()
          AND table_name = 'dmst_tags'
          AND index_name = 'idx_tag_slug';
      `);
      if (indexExists[0].count === "0") {
        // Nếu chưa tồn tại, tạo chỉ mục mới
        await strapi.db.connection.raw(`
          CREATE INDEX idx_tag_slug ON dmst_tags(slug(255));
        `);
        console.log("Tạo chỉ mục thành công với dmst_tags.slug.");
      } else {
        console.log("Chỉ mục dmst_tags.slug đã tồn tại.");
      }
    } catch (error) {
      console.error("Lỗi tạo chỉ mục", error);
    }

    // Chỉ mục cho hệ sinh thái
    try {
      // Kiểm tra xem chỉ mục đã tồn tại chưa
      const [indexExists] = await strapi.db.connection.raw(`
        SELECT COUNT(1) AS count
        FROM information_schema.statistics
        WHERE table_schema = DATABASE()
          AND table_name = 'dmst_he_sinh_thais'
          AND index_name = 'idx_he_sinh_thai_slug';
      `);
      if (indexExists[0].count === "0") {
        // Nếu chưa tồn tại, tạo chỉ mục mới
        await strapi.db.connection.raw(`
          CREATE INDEX idx_he_sinh_thai_slug ON dmst_he_sinh_thais(slug(255));
        `);
        console.log("Tạo chỉ mục thành công với dmst_he_sinh_thais.slug.");
      } else {
        console.log("Chỉ mục dmst_he_sinh_thais.slug đã tồn tại.");
      }
    } catch (error) {
      console.error("Lỗi tạo chỉ mục", error);
    }

    // Chỉ mục cho thành viên hệ sinh thái
    try {
      // Kiểm tra xem chỉ mục đã tồn tại chưa
      const [indexExists] = await strapi.db.connection.raw(`
        SELECT COUNT(1) AS count
        FROM information_schema.statistics
        WHERE table_schema = DATABASE()
          AND table_name = 'dmst_thanh_vien_hsts'
          AND index_name = 'idx_thanh_vien_hst_slug';
      `);
      if (indexExists[0].count === "0") {
        // Nếu chưa tồn tại, tạo chỉ mục mới
        await strapi.db.connection.raw(`
          CREATE INDEX idx_thanh_vien_hst_slug ON dmst_thanh_vien_hsts(slug(255));
        `);
        console.log("Tạo chỉ mục thành công với dmst_thanh_vien_hsts.slug.");
      } else {
        console.log("Chỉ mục dmst_thanh_vien_hsts.slug đã tồn tại.");
      }
    } catch (error) {
      console.error("Lỗi tạo chỉ mục", error);
    }

    // Chỉ mục cho video
    try {
      // Kiểm tra xem chỉ mục đã tồn tại chưa
      const [indexExists] = await strapi.db.connection.raw(`
        SELECT COUNT(1) AS count
        FROM information_schema.statistics
        WHERE table_schema = DATABASE()
          AND table_name = 'dmst_videos'
          AND index_name = 'idx_video_slug';
      `);
      if (indexExists[0].count === "0") {
        // Nếu chưa tồn tại, tạo chỉ mục mới
        await strapi.db.connection.raw(`
          CREATE INDEX idx_video_slug ON dmst_videos(slug(255));
        `);
        console.log("Tạo chỉ mục thành công với dmst_videos.slug.");
      } else {
        console.log("Chỉ mục dmst_videos.slug đã tồn tại.");
      }
    } catch (error) {
      console.error("Lỗi tạo chỉ mục", error);
    }

    // Chỉ mục cho đọc nhanh
    try {
      // Kiểm tra xem chỉ mục đã tồn tại chưa
      const [indexExists] = await strapi.db.connection.raw(`
        SELECT COUNT(1) AS count
        FROM information_schema.statistics
        WHERE table_schema = DATABASE()
          AND table_name = 'dmst_doc_nhanhs'
          AND index_name = 'idx_doc_nhanh_slug';
      `);
      if (indexExists[0].count === "0") {
        // Nếu chưa tồn tại, tạo chỉ mục mới
        await strapi.db.connection.raw(`
          CREATE INDEX idx_doc_nhanh_slug ON dmst_doc_nhanhs(slug(255));
        `);
        console.log("Tạo chỉ mục thành công với dmst_doc_nhanhs.slug.");
      } else {
        console.log("Chỉ mục dmst_doc_nhanhs.slug đã tồn tại.");
      }
    } catch (error) {
      console.error("Lỗi tạo chỉ mục", error);
    }
  },
};
