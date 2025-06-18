export const LAYOUT_TYPES = {
  BASIC: "basic",
  COVER: "cover",
  BOXED: "boxed",
  MODERN: "modern"
};

export type MenuItemType = {
  icon?: any;
  title: string;
  path?: string;
  isHeader?: boolean;
  role?: string;
};
