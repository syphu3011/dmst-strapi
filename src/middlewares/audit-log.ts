// ./src/middlewares/audit-log/index.ts

import { Strapi } from "@strapi/strapi";

interface AuditLogData {
  action: string;
  entity: string;
  entityId: number | string;
  user?: number | string;
  oldData?: any;
  newData?: any;
  timestamp: Date;
}

let isLifecycleRegistered = false;

export default (config: any, { strapi }: { strapi: Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Đảm bảo chỉ đăng ký lifecycle hooks một lần duy nhất
    if (!isLifecycleRegistered) {
      strapi.db.lifecycles.subscribe({
        async beforeCreate(event) {
          if (!isIgnore(event)) {
            await logAuditEvent(event, "create");
          }
        },
        async beforeUpdate(event) {
          if (!isIgnore(event)) {
            await logAuditEvent(event, "update");
          }
        },
        async beforeDelete(event) {
          if (!isIgnore(event)) {
            await logAuditEvent(event, "delete");
          }
        },
      });
      isLifecycleRegistered = true; // Đánh dấu đã đăng ký lifecycle hooks
    }

    // Tiếp tục chuỗi xử lý middleware
    await next();
  };
};

// Hàm kiểm tra nếu sự kiện liên quan đến upload file
function isIgnore(event: any) {
  const { model } = event;
  // Kiểm tra nếu model là 'plugin::upload.file' thì bỏ qua
  return (
    model.uid === "api::audit-log.audit-log"
  );
}

// Hàm ghi log cho mỗi sự kiện
async function logAuditEvent(event: any, action: string) {
  const { params, model } = event;
  const entityId = params?.where?.id;

  // Fetch old data for update and delete actions
  let oldData: Record<string, any> | null = null;
  if (action !== "create") {
    oldData = await strapi.db
      .query(model.uid)
      .findOne({ where: { id: entityId } });
  }

  // Create audit log with JSON stringified data
  const auditLog: AuditLogData = {
    action,
    entity: model.uid,
    entityId,
    user: params?.data?.updatedBy || null,
    oldData: oldData ? JSON.stringify(oldData) : null, // Serialize old data
    newData:
      action === "create" || action === "update"
        ? JSON.stringify(params?.data)
        : null, // Serialize new data
    timestamp: new Date(),
  };

  // Save audit log into database
  await strapi.db.query("api::audit-log.audit-log").create({
    data: auditLog,
  });
}
