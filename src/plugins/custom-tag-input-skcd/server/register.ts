import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "tags",
    plugin: "custom-tag-input-skcd",
    type: "json",
  });

};
