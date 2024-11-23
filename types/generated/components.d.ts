import type { Schema, Attribute } from '@strapi/strapi';

export interface SkcdVideo extends Schema.Component {
  collectionName: 'components_skcd_videos';
  info: {
    displayName: 'Video';
  };
  attributes: {
    skcd_videos: Attribute.Relation<
      'skcd.video',
      'oneToMany',
      'api::skcd-video.skcd-video'
    >;
  };
}

export interface SkcdTinTucTongHop extends Schema.Component {
  collectionName: 'components_skcd_tong_hops';
  info: {
    displayName: 'T\u1ED5ng h\u1EE3p';
    description: '';
  };
  attributes: {
    skcd_bai_viets: Attribute.Relation<
      'skcd.tin-tuc-tong-hop',
      'oneToMany',
      'api::skcd-bai-viet.skcd-bai-viet'
    >;
    skcd_loai_bai_viets: Attribute.Relation<
      'skcd.tin-tuc-tong-hop',
      'oneToMany',
      'api::skcd-loai-bai-viet.skcd-loai-bai-viet'
    >;
    sang_kien_vui: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SkcdTinTucNoiBat extends Schema.Component {
  collectionName: 'components_skcd_tin_tuc_noi_bats';
  info: {
    displayName: 'Tin t\u1EE9c n\u1ED5i b\u1EADt';
    description: '';
  };
  attributes: {
    skcd_bai_viets: Attribute.Relation<
      'skcd.tin-tuc-noi-bat',
      'oneToMany',
      'api::skcd-bai-viet.skcd-bai-viet'
    >;
  };
}

export interface SkcdHeader extends Schema.Component {
  collectionName: 'components_skcd_headers';
  info: {
    displayName: 'Header';
    description: '';
  };
  attributes: {
    Logo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    skcd_link_don_gians: Attribute.Relation<
      'skcd.header',
      'oneToMany',
      'api::skcd-link-don-gian.skcd-link-don-gian'
    >;
  };
}

export interface SkcdFooter extends Schema.Component {
  collectionName: 'components_skcd_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    ten_trang: Attribute.String;
    dia_chi: Attribute.String;
    so_dien_thoai: Attribute.String;
  };
}

export interface SkcdDoiTac extends Schema.Component {
  collectionName: 'components_skcd_doi_tacs';
  info: {
    displayName: '\u0110\u1ED1i t\u00E1c';
  };
  attributes: {
    skcd_doi_tacs: Attribute.Relation<
      'skcd.doi-tac',
      'oneToMany',
      'api::skcd-doi-tac.skcd-doi-tac'
    >;
  };
}

export interface SkcdBaiVietTheoTags extends Schema.Component {
  collectionName: 'components_skcd_bai_viet_theo_tags';
  info: {
    displayName: 'B\u00E0i vi\u1EBFt theo tags';
  };
  attributes: {
    skcd_tags: Attribute.Relation<
      'skcd.bai-viet-theo-tags',
      'oneToMany',
      'api::skcd-tag.skcd-tag'
    >;
  };
}

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
    tac_gia: Attribute.String & Attribute.Required;
    nguon: Attribute.String;
    noi_dung: Attribute.RichText & Attribute.Required;
  };
}

export interface DmstMucSau extends Schema.Component {
  collectionName: 'components_dmst_muc_saus';
  info: {
    displayName: 'M\u1EE5c sau';
    description: '';
  };
  attributes: {
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
      'skcd.video': SkcdVideo;
      'skcd.tin-tuc-tong-hop': SkcdTinTucTongHop;
      'skcd.tin-tuc-noi-bat': SkcdTinTucNoiBat;
      'skcd.header': SkcdHeader;
      'skcd.footer': SkcdFooter;
      'skcd.doi-tac': SkcdDoiTac;
      'skcd.bai-viet-theo-tags': SkcdBaiVietTheoTags;
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
