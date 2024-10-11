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
  bootstrap({ strapi }: { strapi: Strapi }) {
    // socketConfig(strapi);
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*", // Cho phép tất cả origin (có thể điều chỉnh)
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("like", async (data, callback) => {
        console.log(data)
        const isValid = await verify(data.rc_token);
        console.log(isValid);
        if (isValid && isValid.success && isValid.score >= 0.5) {
          const likeUpdate = await like(strapi, data.postId, data.cookie != "");
          console.log(likeUpdate, 'day nè')
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
  },
};
