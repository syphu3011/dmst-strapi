import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media<'images' | 'files' | 'videos'>;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface ReuseComponentBaiViet extends Schema.Component {
  collectionName: 'components_reuse_component_bai_viets';
  info: {
    displayName: 'B\u00E0i vi\u1EBFt';
    description: '';
  };
  attributes: {
    mo_ta: Attribute.Text;
    tac_gia: Attribute.String;
    nguon: Attribute.String;
    noi_dung: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    heheh: Attribute.RichText;
  };
}

export interface DmstMucSau extends Schema.Component {
  collectionName: 'components_dmst_muc_saus';
  info: {
    displayName: 'M\u1EE5c sau';
    description: '';
  };
  attributes: {
    doc_nhanh: Attribute.Media<'images'>;
    tags: Attribute.Component<'dmst.muc-bai-viet-theo-tags'>;
  };
}

export interface DmstMucChinh extends Schema.Component {
  collectionName: 'components_dmst_muc_chinhs';
  info: {
    displayName: 'M\u1EE5c ch\u00EDnh';
    description: '';
  };
  attributes: {
    bai_viet_theo_loai: Attribute.Component<'dmst.muc-bai-viet'>;
    tags_theo_loai: Attribute.Component<'dmst.muc-bai-viet-nhieu-tag'>;
  };
}

export interface DmstMucBaiViet extends Schema.Component {
  collectionName: 'components_dmst_muc_bai_viets';
  info: {
    displayName: 'M\u1EE5c b\u00E0i vi\u1EBFt theo lo\u1EA1i';
    description: '';
  };
  attributes: {
    dmst_loai_bai_viets: Attribute.Relation<
      'dmst.muc-bai-viet',
      'oneToMany',
      'api::dmst-loai-bai-viet.dmst-loai-bai-viet'
    >;
  };
}

export interface DmstMucBaiVietTheoTags extends Schema.Component {
  collectionName: 'components_dmst_muc_bai_viet_theo_tags';
  info: {
    displayName: 'M\u1EE5c b\u00E0i vi\u1EBFt theo tags';
  };
  attributes: {
    dmst_tags: Attribute.Relation<
      'dmst.muc-bai-viet-theo-tags',
      'oneToMany',
      'api::dmst-tag.dmst-tag'
    >;
  };
}

export interface DmstMucBaiVietNhieuTag extends Schema.Component {
  collectionName: 'components_dmst_muc_bai_viet_nhieu_tags';
  info: {
    displayName: 'M\u1EE5c b\u00E0i vi\u1EBFt tag theo lo\u1EA1i';
    description: '';
  };
  attributes: {
    loai_va_tag: Attribute.JSON &
      Attribute.CustomField<'plugin::custom-tag-input.tags'>;
  };
}

export interface DmstHeader extends Schema.Component {
  collectionName: 'components_dmst_headers';
  info: {
    displayName: 'Header';
    description: '';
  };
  attributes: {
    logo: Attribute.Media<'images'>;
    dmst_link_don_gians: Attribute.Relation<
      'dmst.header',
      'oneToMany',
      'api::dmst-link-don-gian.dmst-link-don-gian'
    >;
  };
}

export interface DmstHeSinhThai extends Schema.Component {
  collectionName: 'components_dmst_he_sinh_thais';
  info: {
    displayName: 'H\u1EC7 sinh th\u00E1i';
  };
  attributes: {
    dmst_he_sinh_thais: Attribute.Relation<
      'dmst.he-sinh-thai',
      'oneToMany',
      'api::dmst-he-sinh-thai.dmst-he-sinh-thai'
    >;
  };
}

export interface DmstFooter extends Schema.Component {
  collectionName: 'components_dmst_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    ten_trang: Attribute.String;
    dia_chi: Attribute.String;
    email: Attribute.String;
    so_dien_thoai: Attribute.String;
    dmst_link_don_gians: Attribute.Relation<
      'dmst.footer',
      'oneToMany',
      'api::dmst-link-don-gian.dmst-link-don-gian'
    >;
  };
}

export interface DmstBanner extends Schema.Component {
  collectionName: 'components_dmst_banners';
  info: {
    displayName: 'Banner';
    description: '';
  };
  attributes: {
    dmst_banners: Attribute.Relation<
      'dmst.banner',
      'oneToMany',
      'api::dmst-banner.dmst-banner'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.seo': SharedSeo;
      'shared.meta-social': SharedMetaSocial;
      'reuse-component.bai-viet': ReuseComponentBaiViet;
      'dmst.muc-sau': DmstMucSau;
      'dmst.muc-chinh': DmstMucChinh;
      'dmst.muc-bai-viet': DmstMucBaiViet;
      'dmst.muc-bai-viet-theo-tags': DmstMucBaiVietTheoTags;
      'dmst.muc-bai-viet-nhieu-tag': DmstMucBaiVietNhieuTag;
      'dmst.header': DmstHeader;
      'dmst.he-sinh-thai': DmstHeSinhThai;
      'dmst.footer': DmstFooter;
      'dmst.banner': DmstBanner;
    }
  }
}
