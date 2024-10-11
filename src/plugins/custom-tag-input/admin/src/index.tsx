import { prefixPluginTranslations } from '@strapi/helper-plugin';
import CustomTagInput from './components/CustomTagInput';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app:any) {
    app.customFields.register({
      name: "tags",
      pluginId: pluginId,
      type: "json",
      intlLabel: {
        id: "custom-tag-input.tag.label",
        defaultMessage: "custom-tag-input",
      },
      intlDescription: {
        id: "custom-tag-input.tag.description",
        defaultMessage: "helloo",
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/ChooseTypeAndTag"
          ),
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: "custom-tag-input.tags.section.apiUrl",
              defaultMessage: "API Url",
            },
            items: [
              {
                intlLabel: {
                  id: "custom-tag-input.tags.section.apiUrl",
                  defaultMessage: "Rest API URL for suggestions",
                },
                name: "options.apiUrl",
                type: "json",
                value: {},
                options: [],
              },
            ],
          },
        ],
      },
    });
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
