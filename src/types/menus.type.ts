/**
 * 自定义菜单
 */
export interface MenuItem {
  id: number;
  order: number;
  text: string;
  title: string;
  type: number;
  video_id: number[];
}

export enum MenuType {
  Graphics = 1,
  Videos = 2,
}
