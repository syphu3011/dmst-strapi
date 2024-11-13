export default {
  async beforeCreate(event) {
    try {
      const { data } = event.params;
      console.log(data["ngay_dang"]);
      if (!data["ngay_dang"]) {
        data["ngay_dang"] = data["createdAt"].toISOString().slice(0, 10);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
