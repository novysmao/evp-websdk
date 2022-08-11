/**
 * 文档的类型：
 * -1:未启用文档
 * 0:白板
 * 1:文档
 */
export enum DocType {
  None = -1,
  Board = 0,
  Doc = 1,
}

/**
 * 白板信息
 */
export interface DocBoard {
  id: string; // 白板id
  r_token: string; // 白板读Token
  operation_time: number; // 白板操作时间
}

/**
 * PPT信息
 */
export interface DocPPT {
  id: string; // PPT id
  index: number; // PPT 第几页
  url: string; // 具体展示的图片的url
}

/**
 * 文档配置
 * /documents/api/get_config?act_id=${act_id}
 */
export interface DocumentConfig {
  is_doc_show: boolean; // 是否展示文档
  // is_doc_download: boolean; // 是否允许下载文档: true-是，false-否
  bgimg: string; // 文档背景图片
  doc_type: DocType; // 文档的类型
  board: DocBoard; // 白板信息
  ppt: DocPPT; // PPT信息
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 文档打点信息
 */
export interface DocDot {
  dot_id: number; // 文档打点id
  offset: number; // 文档打点下标, 单位：秒
  content: string; // 文档打点内容
}

/**
 * 请求文档列表query
 */
export interface RequestDocPage {
  page_num?: number; // 页码
  page_size?: number; // 每页展示条数
  is_doc_download: boolean; // false-表示查询所有的文档 true-只查询可以下载的文档
}

/**
 * 文档的图片集合
 */
export interface DocumentImages {
  id: number; // 图片的id
  doc_id: number; // 图片所属的文档id
  index: number; // 图片的索引值，表示第几张图片
  url: string; // 图片的url
}

/**
 * 文档列表详情
 */
export interface DocumentDetail {
  id: number; // 文档的id
  status: number; // 文档的状态
  page_num: number;
  file_size: number; // 文档的大小，单位： 字节
  download_times: number; // 文档的被下载次数
  title: string; // 文档的标题
  is_doc_downLoad: boolean; // 文档是否允许下载: fasle-否 true-是
  images: DocumentImages[]; // 文档的图片集合
}

export interface DocumentPage {
  page_num: number; // 页码
  page_size: number; // 每页展示条数
  total_num: number; // 总条数
  total_page: number; // 总页数
}

/**
 * 文档列表
 */
export interface DocumentList {
  data: DocumentDetail[];
  page: DocumentPage;
}

/**
 * 文档下载地址
 */
export interface DocumentDownload {
  id: number; // 文档的id
  download_url: string; // 文档的下载url
}

/**
 * 文档翻页Ws
 */
export interface WsDocument {
  board: {
    board_id: string; // 白板id
    r_token: string; // 白板读Token
  };
  board_operation_time: number; // 白板操作时间
  docid: string; // PPT id
  index: number; // PPT 第几页
  type: string; // 文档类型
  url: string; // 具体展示的图片的url
}

/**
 * 文档配置Ws
 */
export interface WsDocumentConfig {
  background_url: string; // 文档背景图
  download: boolean; // 是否允许下载
  name: string; // 文档名称
  open: boolean; // 是否开启文档
  turn: boolean;
  type: string; // 文档类型
}

/**
 * 文档列表Ws
 */
export interface WsDocumentList {
  docid: number; // 文档id
  download: boolean; // 是否允许下载
  title: string; // 文档名称
  type: string; // 文档类型
}

/**
 * 文档转码Ws
 */
export interface WsDocumentTranscode {
  docid: string; // 文档id（后端没统一 这里需要转成number给用户）
  status: 1 | 2; // 1：转码完成 2：转码失败
  type: string; // 文档类型
}