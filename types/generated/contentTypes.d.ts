import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginSlugifySlug extends Schema.CollectionType {
  collectionName: 'slugs';
  info: {
    singularName: 'slug';
    pluralName: 'slugs';
    displayName: 'slug';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    slug: Attribute.Text;
    count: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginCustomApiCustomApi extends Schema.CollectionType {
  collectionName: 'custom_apis';
  info: {
    singularName: 'custom-api';
    pluralName: 'custom-apis';
    displayName: 'Custom API';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: true;
    };
    'content-type-builder': {
      visible: true;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'plugin::custom-api.custom-api', 'name'> &
      Attribute.Required;
    selectedContentType: Attribute.JSON;
    structure: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::custom-api.custom-api',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::custom-api.custom-api',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAuditLogAuditLog extends Schema.CollectionType {
  collectionName: 'audit_logs';
  info: {
    singularName: 'audit-log';
    pluralName: 'audit-logs';
    displayName: 'Audit Log';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    action: Attribute.String;
    entity: Attribute.String;
    entityId: Attribute.String;
    oldData: Attribute.Text;
    newData: Attribute.Text;
    timestamp: Attribute.String;
    user: Attribute.Relation<
      'api::audit-log.audit-log',
      'oneToOne',
      'admin::user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::audit-log.audit-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::audit-log.audit-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDmstBaiVietDmstBaiViet extends Schema.CollectionType {
  collectionName: 'dmst_bai_viets';
  info: {
    singularName: 'dmst-bai-viet';
    pluralName: 'dmst-bai-viets';
    displayName: 'DMST B\u00E0i vi\u1EBFt';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    versions: {
      versioned: true;
    };
  };
  attributes: {
    noi_dung_bai_viet: Attribute.Component<'reuse-component.bai-viet'>;
    ten_bai_viet: Attribute.String;
    loai_va_tag: Attribute.JSON &
      Attribute.CustomField<'plugin::custom-tag-input.tags'>;
    dmst_tags: Attribute.Relation<
      'api::dmst-bai-viet.dmst-bai-viet',
      'manyToMany',
      'api::dmst-tag.dmst-tag'
    >;
    dmst_loai_bai_viets: Attribute.Relation<
      'api::dmst-bai-viet.dmst-bai-viet',
      'manyToMany',
      'api::dmst-loai-bai-viet.dmst-loai-bai-viet'
    >;
    like_bai_viet: Attribute.Relation<
      'api::dmst-bai-viet.dmst-bai-viet',
      'oneToOne',
      'api::like-bai-viet.like-bai-viet'
    >;
    slug: Attribute.Text;
    SEO: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-bai-viet.dmst-bai-viet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-bai-viet.dmst-bai-viet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    versions: Attribute.Relation<
      'api::dmst-bai-viet.dmst-bai-viet',
      'manyToMany',
      'api::dmst-bai-viet.dmst-bai-viet'
    >;
    vuid: Attribute.String;
    versionNumber: Attribute.Integer & Attribute.DefaultTo<1>;
    versionComment: Attribute.String;
    isVisibleInListView: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface ApiDmstBannerDmstBanner extends Schema.CollectionType {
  collectionName: 'dmst_banners';
  info: {
    singularName: 'dmst-banner';
    pluralName: 'dmst-banners';
    displayName: 'DMST Banner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    anh_banner: Attribute.Media<'images'> & Attribute.Required;
    link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-banner.dmst-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-banner.dmst-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDmstHeSinhThaiDmstHeSinhThai extends Schema.CollectionType {
  collectionName: 'dmst_he_sinh_thais';
  info: {
    singularName: 'dmst-he-sinh-thai';
    pluralName: 'dmst-he-sinh-thais';
    displayName: 'DMST H\u1EC7 sinh th\u00E1i';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    anh_dai_dien: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    ten: Attribute.String;
    link: Attribute.String;
    dmst_thanh_vien_hsts: Attribute.Relation<
      'api::dmst-he-sinh-thai.dmst-he-sinh-thai',
      'oneToMany',
      'api::dmst-thanh-vien-hst.dmst-thanh-vien-hst'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-he-sinh-thai.dmst-he-sinh-thai',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-he-sinh-thai.dmst-he-sinh-thai',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDmstHeaderDmstHeader extends Schema.SingleType {
  collectionName: 'dmst_headers';
  info: {
    singularName: 'dmst-header';
    pluralName: 'dmst-headers';
    displayName: 'DMST Header';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Logo: Attribute.Media<'images'>;
    dmst_link_don_gians: Attribute.Relation<
      'api::dmst-header.dmst-header',
      'oneToMany',
      'api::dmst-link-don-gian.dmst-link-don-gian'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-header.dmst-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-header.dmst-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDmstLinkCoAnhDmstLinkCoAnh extends Schema.CollectionType {
  collectionName: 'dmst_link_co_anhs';
  info: {
    singularName: 'dmst-link-co-anh';
    pluralName: 'dmst-link-co-anhs';
    displayName: 'DMST Link c\u00F3 \u1EA3nh';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    link: Attribute.String;
    anh: Attribute.Media<'images'>;
    ten: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-link-co-anh.dmst-link-co-anh',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-link-co-anh.dmst-link-co-anh',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDmstLinkDonGianDmstLinkDonGian
  extends Schema.CollectionType {
  collectionName: 'dmst_link_don_gians';
  info: {
    singularName: 'dmst-link-don-gian';
    pluralName: 'dmst-link-don-gians';
    displayName: 'DMST Link \u0111\u01A1n gi\u1EA3n';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ten: Attribute.String;
    link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-link-don-gian.dmst-link-don-gian',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-link-don-gian.dmst-link-don-gian',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDmstLoaiBaiVietDmstLoaiBaiViet
  extends Schema.CollectionType {
  collectionName: 'dmst_loai_bai_viets';
  info: {
    singularName: 'dmst-loai-bai-viet';
    pluralName: 'dmst-loai-bai-viets';
    displayName: 'DMST Lo\u1EA1i b\u00E0i vi\u1EBFt';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    loai: Attribute.String;
    dmst_tags: Attribute.Relation<
      'api::dmst-loai-bai-viet.dmst-loai-bai-viet',
      'manyToMany',
      'api::dmst-tag.dmst-tag'
    >;
    dmst_bai_viets: Attribute.Relation<
      'api::dmst-loai-bai-viet.dmst-loai-bai-viet',
      'manyToMany',
      'api::dmst-bai-viet.dmst-bai-viet'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-loai-bai-viet.dmst-loai-bai-viet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-loai-bai-viet.dmst-loai-bai-viet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDmstMoKhoaLikeDmstMoKhoaLike extends Schema.SingleType {
  collectionName: 'dmst_mo_khoa_likes';
  info: {
    singularName: 'dmst-mo-khoa-like';
    pluralName: 'dmst-mo-khoa-likes';
    displayName: 'DMST M\u1EDF kh\u00F3a like';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mo: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-mo-khoa-like.dmst-mo-khoa-like',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-mo-khoa-like.dmst-mo-khoa-like',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDmstTagDmstTag extends Schema.CollectionType {
  collectionName: 'dmst_tags';
  info: {
    singularName: 'dmst-tag';
    pluralName: 'dmst-tags';
    displayName: 'DMST Tag';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    tag: Attribute.String;
    dmst_loai_bai_viets: Attribute.Relation<
      'api::dmst-tag.dmst-tag',
      'manyToMany',
      'api::dmst-loai-bai-viet.dmst-loai-bai-viet'
    >;
    dmst_bai_viets: Attribute.Relation<
      'api::dmst-tag.dmst-tag',
      'manyToMany',
      'api::dmst-bai-viet.dmst-bai-viet'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-tag.dmst-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-tag.dmst-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDmstThanhVienHstDmstThanhVienHst
  extends Schema.CollectionType {
  collectionName: 'dmst_thanh_vien_hsts';
  info: {
    singularName: 'dmst-thanh-vien-hst';
    pluralName: 'dmst-thanh-vien-hsts';
    displayName: 'DMST Th\u00E0nh vi\u00EAn HST';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    ten_thanh_vien: Attribute.String;
    mo_ta: Attribute.Text;
    noi_dung_bai_viet: Attribute.Component<'reuse-component.bai-viet'>;
    dmst_he_sinh_thai: Attribute.Relation<
      'api::dmst-thanh-vien-hst.dmst-thanh-vien-hst',
      'manyToOne',
      'api::dmst-he-sinh-thai.dmst-he-sinh-thai'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-thanh-vien-hst.dmst-thanh-vien-hst',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-thanh-vien-hst.dmst-thanh-vien-hst',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDmstTrangChuDmstTrangChu extends Schema.SingleType {
  collectionName: 'dmst_trang_chus';
  info: {
    singularName: 'dmst-trang-chu';
    pluralName: 'dmst-trang-chus';
    displayName: 'DMST Trang ch\u1EE7';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    noi_dung: Attribute.DynamicZone<
      [
        'dmst.he-sinh-thai',
        'dmst.muc-sau',
        'dmst.muc-bai-viet',
        'dmst.muc-bai-viet-nhieu-tag',
        'dmst.muc-chinh',
        'dmst.muc-bai-viet-theo-tags',
        'dmst.banner'
      ]
    >;
    Header: Attribute.Component<'dmst.header'>;
    Footer: Attribute.Component<'dmst.footer'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-trang-chu.dmst-trang-chu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-trang-chu.dmst-trang-chu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDmstVideoDmstVideo extends Schema.CollectionType {
  collectionName: 'dmst_videos';
  info: {
    singularName: 'dmst-video';
    pluralName: 'dmst-videos';
    displayName: 'DMST Video';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mo_ta: Attribute.Text;
    ten_video: Attribute.String;
    link_embed: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dmst-video.dmst-video',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dmst-video.dmst-video',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLikeBaiVietLikeBaiViet extends Schema.CollectionType {
  collectionName: 'like_bai_viets';
  info: {
    singularName: 'like-bai-viet';
    pluralName: 'like-bai-viets';
    displayName: 'Like B\u00E0i vi\u1EBFt';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    like: Attribute.Integer;
    dmst_bai_viet: Attribute.Relation<
      'api::like-bai-viet.like-bai-viet',
      'oneToOne',
      'api::dmst-bai-viet.dmst-bai-viet'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::like-bai-viet.like-bai-viet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::like-bai-viet.like-bai-viet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::slugify.slug': PluginSlugifySlug;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::custom-api.custom-api': PluginCustomApiCustomApi;
      'api::audit-log.audit-log': ApiAuditLogAuditLog;
      'api::dmst-bai-viet.dmst-bai-viet': ApiDmstBaiVietDmstBaiViet;
      'api::dmst-banner.dmst-banner': ApiDmstBannerDmstBanner;
      'api::dmst-he-sinh-thai.dmst-he-sinh-thai': ApiDmstHeSinhThaiDmstHeSinhThai;
      'api::dmst-header.dmst-header': ApiDmstHeaderDmstHeader;
      'api::dmst-link-co-anh.dmst-link-co-anh': ApiDmstLinkCoAnhDmstLinkCoAnh;
      'api::dmst-link-don-gian.dmst-link-don-gian': ApiDmstLinkDonGianDmstLinkDonGian;
      'api::dmst-loai-bai-viet.dmst-loai-bai-viet': ApiDmstLoaiBaiVietDmstLoaiBaiViet;
      'api::dmst-mo-khoa-like.dmst-mo-khoa-like': ApiDmstMoKhoaLikeDmstMoKhoaLike;
      'api::dmst-tag.dmst-tag': ApiDmstTagDmstTag;
      'api::dmst-thanh-vien-hst.dmst-thanh-vien-hst': ApiDmstThanhVienHstDmstThanhVienHst;
      'api::dmst-trang-chu.dmst-trang-chu': ApiDmstTrangChuDmstTrangChu;
      'api::dmst-video.dmst-video': ApiDmstVideoDmstVideo;
      'api::like-bai-viet.like-bai-viet': ApiLikeBaiVietLikeBaiViet;
    }
  }
}
