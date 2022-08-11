## 初始化
### 如何使用
#### 直接引用
```javascript
<script src="https://static.mudu.tv/evp-websdk/latest/index.min.js"></script>
<!-- 如果想要引入指定版本websdk -->
<script src="https://static.mudu.tv/evp-websdk/v{指定版本号，例如1.0.0}/index.min.js"></script>
<script>
  console.log(window.Evp);
</script>
```
#### webpack项目中使用
```groovy
import * as Evp from '{项目中路径}/evp-websdk/index.min.js';
```
## 更新日志
### v0.0.12

- 增加弹幕速度设置
- 更新播放器版本至v0.37.1
### v0.0.11

- 更新播放器版本至v0.36.12
### v0.0.10

- 支持播放器资源文件下载与自定义部署
## 组件
### 频道组件 -- Room
#### 数据类型定义
```typescript
export interface RoomOptions {
  act_id: string; // 频道hashid
  host: string; // 媒体中心域名（例如：http://sdk-test.hybugu.mudu.tv），不填默认当前域名下调用
  access_token: string; // 令牌
  models?: Model[]; // 需要初始化的组件
  third_party_id?: string; // 第三方id
}

// 说明
// 1.models不传表示初始化所有组件
// 2.用户组件（User）、 基本信息组件（Basis）、 流信息组件（StreamView）、事件监听组件（Event）为必要组件，无论如何都会初始化
// 3.播放器组件（Player）不需要初始化，可以直接调用setup
// 4.可传入的组件：Announcement/Comment/Countdown/Document/Lottery/Menus/Questionnaire
```
#### 初始化频道 -- init: (data: RoomOptions) => Promise<void>
```typescript
const roomHashId = '******';
const host = 'http://***.hybugu.mudu.tv';
const accessToken = '************************************';
const models = [Evp.Comment, Evp.Document]; // 需要初始化的组件，不传表示初始化全部
const thirdPartyId = 'abcdefg'; // 第三方id
// 其他组件必须在Room初始化之后调用，有两种方法保证调用顺序

// 方法一
Evp.Room.init({ act_id: roomHashId, host: host, access_token: accessToken, models, third_party_id: thirdPartyId }).then(() => {
  // 其他组件的调用
});

// 方法二
await Evp.Room.init({ act_id: roomHashId, host: host, access_token: accessToken, models, third_party_id: thirdPartyId });
// 其他组件的调用
```
#### 销毁频道 -- destroy: () => void
```typescript
Room.destroy();
```
### 事件监听组件 -- Event
#### 事件监听 -- on: (modelName: string, fn)
```javascript
Evp.Event.on(Evp.Comment.name, (data: any) => { console.log(data) });
```
#### 事件只监听一次 -- once: (modelName: string, fn)
```javascript
Evp.Event.once(Evp.Comment.name, (data: any) => { console.log(data) });
```
#### 事件取消监听 -- off: (modelName: string, fn)
```javascript
Evp.Event.off(Evp.Comment.name);
```
### 基本信息组件 -- Basis
#### 数据类型定义
```typescript
/**
 * 视频的状态currentPlayListItem
 * status = 0 初始状态
 * status = 1 上传完成（最终状态）
 * status = 2 转码中(过程状态)
 * status = 3 转码成功
 * status = 4 转码失败
 * status = 5 转码完成，正在上传
 * status = 6 上传失败
 */
export enum VideoStatus {
  Init = 0,
  Success = 1,
  Transcoding = 2,
  TranscodeSuccess = 3,
  TranscodeFail = 4,
  Uploading = 5,
  UploadFail = 6,
}

/**
 * 视频信息
 */
export interface Video {
  duration: number; // 视频的时长, 单位: 秒
  end_at: number; // 视频结束时间戳
  id: number; // 视频的id
  name: string; // 视频的名称
  size: number; // 视频的大小, 单位: 字节
  start_at: number; // 视频开始时间戳
  status: VideoStatus; // 视频的状态
  cover: string; // 视频的封面
  url: string; // 视频的拉流/下载地址
  playback: VideoPlayback[]; // 视频回放信息
  video_dot: VideoDot[]; // 视频打点信息
  doc_dot: DocDot[]; // 文档打点信息
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
 * 视频打点信息
 */
export interface VideoDot {
  video_id: number; // 视频id
  offset: number; // 视频打点下标, 单位：秒
  content: string; // 视频打点内容
}

/**
 * 视频信息
 */
export interface VideoPlayback {
  video_id: number; // 视频id
  resolution: string; // 视频分辨率
  video_url: string; // 视频的拉流/下载地址
}

```
```typescript
/**
* 频道信息
*/
export interface BasisConfig {
  basic: BasicConfig; // 频道的基本信息
  decoration: DecorationConfig; // 频道的装修配置信息
  share: SocialShareConfig; // 频道的分享配置信息
  announcement: AnnouncementConfig; // 公告配置
  attachment: AttachmentConfig; // 连麦配置
  advertisement: AdvertisementConfig; // 广告配置
  playback: PlaybackConfig; // 视频回放配置, 未直播时会可以选择播放回放视频
  wechat_sdk: WechatJssdkConfig; // 微信Js SDK 信息
  media: MediaHubConfig;
}

export enum ChannelLiveType {
  Standard = 0, // 标准直播
  Camera = 1, // 摄像头
  Vr = 3, // Vr
}

export enum ChannelLanguageType {
  Auto = 1,
  Zh = 2,
  En = 3,
}

export enum ChannelBackgroundImageLocation {
  Top = 'banner',
  Background = 'bg',
  None = 'none',
}

/**
 * 频道直播间的基本信息
 */
export interface BasicConfig {
  id: string; // 频道hashid
  name: string; // 频道名称
  description: string; // 频道描述
  is_live: boolean; // 频道直播状态
  is_visible: boolean; // 频道是否可见: true-是 false-否
  live_type: ChannelLiveType; // 频道类型(标准直播频道、摄像头直播频道、Vr直播)
  pv: number; // 累计观看次数，当值为-1时，说明控制台的观看页人数显示方式为uv或者都不显示
  uv: number; // 累计观看人数，当值为-1时，说明控制台的观看页人数显示方式为pv或者都不显示
  base_num: number; // uv,pv倍增基数
  online_num: number; // 在线人数
  wechat_auth_url: string; // 微信授权跳转地址
  current_timestamp: number; // 服务器时间戳
  tool_id: string; // 频道的网页直播工具id, live_type = 1 时不为空
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 分享设置配置信息
 */
export interface SocialShareConfig {
  facebook: boolean;
  google: boolean;
  linkedin: boolean;
  preview: string; // 描述
  title: string; // 标题
  twitter: boolean;
  wechat: boolean;
  weibo: boolean;
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 频道直播间的装修配置信息
 */
export interface DecorationConfig {
  cover: string; // 播放器封面链接地址
  logo: string; // 频道的logo
  icon: string; // 频道的icon链接地址
  is_lang_btn_open: boolean; // 语言栏展示
  language: ChannelLanguageType; // 语言 1：自动 2：中文 3：英文
  is_launch_open: boolean; // 引导图开关
  launch_img_url: string; // 引导图链接地址
  watch_bgimg_color: string; // 观看页背景色
  watch_bgimg_location: ChannelBackgroundImageLocation; // 观看页背景图位置 banner：显示在顶部 bg：显示在整个页面 none：不显示背景图
  is_watch_bgimg_open: boolean; // 观看页背景图开关
  watch_bgimg: string; // 观看页背景图
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 连麦配置
 */
export interface AttachmentConfig {
  tool_id: string; // 网页直播工具id
  is_open: boolean; // 是否开启连麦: true-是 false-否
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 广告片配置
 */
export interface AdvertisementConfig {
  is_open: boolean; // 是否开启广告片展示: true-是 false-否
  video: Video; // 广告片视频id
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 视频回放
 */
export interface PlaybackConfig {
  is_auto_play: boolean; // 是否开启自动播放: true-是 false-否
  is_available: boolean; // 是否有效: true-是 false-否
  expire_at: number; // 视频回放的指定过期时间
  video: Video; // 视频回放信息
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 微信jssdk配置
 */
export interface WechatJssdkConfig {
  appid: string;
  timestamp: number;
  nonce_str: string; // 随机字符串
  signature: string; // 签名
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 媒体中心配置
 */
export interface MediaHubConfig {
  analytic_id: number; // 数据分析id
  is_use_webvtt: boolean; // 是否使用webvtt: true-是 false-否
  domain: string; // 媒体中心域名
  board_rw_domain: string; // 白板读写域名
  nats_addr: string; // nats连接地址
  websocket_addr: string; // websocket 连接地址
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 公告
 */
export interface AnnouncementConfig {
  color: string; // 公告展示的颜色
  content: string; // 公告的内容
  is_visible: boolean; // 是否展示公告: true-是 false-否
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 获取在线人数结果
 */
export interface NumberResult {
  online_num: number;
}

/**
 * 获取uv、pv
 * uv: 累计观看人数
 * pv: 累计观看次数
 */
export interface UPV {
  uv: number;
  pv: number;
}
```
#### 获取频道基本信息 -- basic: BasicConfig
```javascript
const basic: BasicConfig = Evp.Basis.basic;
```
#### 获取频道装修信息 -- decoration: DecorationConfig
```javascript
const decoration: DecorationConfig = Evp.Basis.decoration;
```
#### 获取分享配置信息 -- share: SocialShareConfig
```javascript
const share: SocialShareConfig = Evp.Basis.share;
```
#### 获取连麦配置 -- attachment: AttachmentConfig
```javascript
const attachment: AttachmentConfig = Evp.Basis.attachment;
```
#### 获取广告片信息 -- advertisement: AdvertisementConfig
```javascript
const advertisement: AdvertisementConfig = Evp.Basis.advertisement;
```
#### 获取预告回放信息 -- playback: PlaybackConfig
```javascript
const playback: PlaybackConfig = Evp.Basis.playback;
```
#### 获取媒体中心信息 -- media: MediaHubConfig
```javascript
const media: MediaHubConfig = Evp.Basis.media;
```
#### 获取当前在线人数 -- getOnlineNum(): Promise<NumberResult>
```javascript
const onlineNum = await Evp.Basis.getOnlineNum();
```
#### 获取频道pv,uv -- getUPV(): Promise<UPV>
```typescript

/**
 * uv: 累计观看人数
 * pv: 累计观看次数
 */
const upv:UPV = await Evp.Basis.getUPV();
```
### 公告组件 -- Announcement
#### 数据类型定义
```typescript
/**
 * 公告
 */
export interface AnnouncementConfig {
  color: string; // 公告展示的颜色
  content: string; // 公告的内容
  is_visible: boolean; // 是否展示公告: true-是 false-否
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}
```
#### 获取公告配置信息 -- config: AnnouncementConfig
```typescript
const config: AnnouncementConfig = Evp.Announcement.config;
```


### 评论组件 -- Comment
#### 数据类型定义
```typescript
// 请求的分页数据
export interface RequestPage {
  page_num?: number;
  page_size?: number;
}

// 分页信息
export interface Pagination {
  total_num?: number; // 总条数
  total_page?: number; // 总页数
  page_num?: number; // 分页页码
  page_size?: number; // 分页条数
}

// 评论配置
export interface CommentConfig {
  is_open: boolean; // 是否开启评论: true-是 false-否
  is_comments_num_show: boolean; // 是否展示评论数目: true-是 false-否
  is_barrage_open: boolean; // 是否展示弹幕: true-是 false-否
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

// 评论数据
export interface CommentItem {
  id: number; // 评论id
  visitor_id: number; // 观众id
  message: string; // 评论内容(如果评论类型为超链接, 需要用JSON.parse解析, 访问message_list的值，值类型为HyperLink[], 文字url共同存在时拼凑规则同控制台, 空格作为分开文字和超链接的标识)
  title: string; // 评论标题
  name: string; // 观众昵称
  avatar: string; // 观众展示头像
  is_approved: boolean; // 观众是否认证: true-是， false-否
  is_live_comment_pushed: boolean; // 是否作为弹幕推送: true-是，false-否
  is_top: boolean; // 评论是否置顶： true-是，false-否
  created_at: number; // 评论创建时间
  reply_comments: ReplyComment[]; // 评论回复
  type: CommentType; // 评论类型
}

/**
 * 评论类型
 * status = 0 文本内容
 * status = 1 图片内容
 * status = 2 超链接
 */
export enum CommentType {
  Word = 0,
  ImgLink = 1,
  HyperLinks = 2,
}

// 超链接item
interface HyperLink {
  Message: string; // 超链接url或者文字
  MessageType: number; // 0: 文本内容 2: 超链接url
}

// 评论回复数据
export interface ReplyComment {
  id: number; // 评论回复id
  created: number; // 评论回复创建时间
  is_public: boolean; // 是否公开展示次回复: true-是， false-否
  message: string; // 评论回复内容
  title: string; // 评论回复标题
  name: string; // 评论人昵称
  avatar: string; // 评论人展示头像
}
```
#### 获取评论配置 -- config: CommentConfig
```javascript
const config: CommentConfig = Evp.Comment.config;
```
#### 获取评论分页信息 -- pagination: Pagination
```typescript
const pagination: Pagination = Evp.Comment.pagination;
```
#### 获取评论数据 -- getComments(queryData: RequestPage): Promise<CommentItem[]>
```typescript
const comments: CommentItem[] = await Evp.Comment.getComments({ page_size: 10, page_num: 1 });
```
#### 获取当前页评论数据 -- getCurrentPageComments(): Promise<CommentItem[]>
```typescript
const comments: CommentItem[] = await Evp.Comment.getCurrentPageComments();
```
#### 获取下一页评论数据 -- getNextPageComments(): Promise<CommentItem[]>
```typescript
const comments: CommentItem[] = await Evp.Comment.getNextPageComments();
```
#### 发送评论 -- sendComment(message: string): Promise<CommentItem>
```javascript
const message = '这是评论内容'；
// 发送成功会返回comment: CommentItem
const comment: CommentItem = await Evp.Comment.sendComment(message);
```
#### 事件监听
```typescript
const { Comment, Event } = Evp;
// 监听对应的组件，根据type来区分事件类型，不同的事件类型对应不同的数据
Event.on(Comment.name, (v: EventData) => {
  const { type, data } = v;
  switch(type) {
    case 'comment.new':
      // 新评论
      // data为CommentItem
      break;
    case 'comment.top':
      // 置顶/取消置顶评论
      // data为CommentItem
      break;
    case 'comment.delete':
      // 删除评论
      // data为CommentItem
      break;
    case 'comment.reply.update':
      // 评论回复
      // data为CommentItem
      break;
    case 'comment.config.update':
      // 评论配置更新
      // data为CommentConfig
      break;
    case 'comment.barrage.new':
      // 新弹幕
      // data为string
      break;
    case 'comment.barrage.open':
      // 弹幕开启
      // data为boolean
      break;
    case 'comment.barrage.close':
      // 弹幕关闭
      // data为boolean
      break;
  }
});
```
### 用户组件 -- User
#### 数据类型定义
```typescript
// 用户身份信息
export interface UserInfo {
  id: number; // 用户id
  username: string; // 用户名称
  nickname: string; // 用户昵称
  avatar: string; // 用户头像
  third_party_id: string; // 第三方id
  is_admin: boolean; // 是否为管理员: true-是 false-否
  is_root: boolean; // 是否为root用户: true-是 false-否
  is_wechat_auth: boolean; // 是否微信授权: true-是 false-否
  signature: string; // 用户鉴权用的签名
  analytic_session: string; // 用户分析session
  page_view_id: number; // 用于在观看页的行为id
  is_banned: boolean; // 是否被禁言
}

// 更新的用户信息
export interface UserUpdateInfo {
  nickname?: string;
  avatar?: string;
  third_party_id?: string;
}
```
#### 获取用户身份信息 -- info: UserInfo
```javascript
const user: UserInfo = Evp.User.info;
```
#### 获取并发管控下等待人数 -- waiterNumber: number
```typescript
const waiterNumber: number = Evp.User.waiterNumber;
```
#### 查询用户是否在队列中 -- isQueuing: boolean
```typescript
/**
 * 如果isQueuing = true表示开启了并发管控，并且在排队中
 * 在队列中时，调用其他接口会受到权限限制
 * 可通过Event.on('user.dequeued')接收出队通知
 */
const { User, Event } = Evp
const isQueuing: boolean = User.isQueuing;
Event.on('user.dequeued', () => {
  console.log('用户出队了');
});
```
#### 更新用户身份信息 -- update(userUpdateInfo: UserUpdateInfo): Promise<boolean>
```javascript
const success = await Evp.User.update({ nickname: '自定义昵称', avatar: '自定义头像地址链接', third_party_id: '自定义第三方id' });
```
#### 事件监听
```typescript
const { User, Event } = Evp;
// 监听对应的组件，根据type来区分事件类型，不同的事件类型对应不同的数据
Event.on(User.name, (v: EventData) => {
  const { type, data } = v;
  switch(type) {
    case 'user.update':
      // 用户信息更新
      // data为UserInfo
      break;
    case 'user.banned':
      // 用户禁言/取消用户禁言
      // data为boolean
      break;
    case 'user.dequeued':
      // 用户从并发管控队列中出队
      // 不返回data
      break;
  }
});
```
### 播放器组件 -- Player


#### 播放器说明
```
播放器初始化playlist中至少要有一个item才能初始化成功（否则播放器不会有任何行为, 可以再次调用loadPlay来播放）, 也就是要有一个播放地址
当播放器当前播放的流断掉了, 播放器会默认显示报错信息, 当然用户可以自定义错误（展示个图片等等）, PlayerOption中的renderError
后台设置的预告回放和广告片配置可以直接在当前播放器组件中获取
直播, 多流直播, 专业设备直播, 列表直播等可以通过流信息组件中获取多流信息这个API去获取
文档ppt的翻页功能只针对默认流、预告回放
```


#### 数据类型定义


```typescript
// 播放器配置
interface PlayerOption {
  mute?: boolean; // 是否静音
  autoplay?: boolean; // 是否自动播放
  repeat?: boolean; // 是否重复播放
  controls?: boolean; // 是否显示控制条
  aspectratio?: string; // 固定播放器的横宽比, 格式为"width:height"，如: "16:9"
  height?: number | string; // 播放器高度, 默认360
  width?: number | string; // 播放器宽度, 默认640
  stretching?: string; // 定义视频以何种方式拉伸, 有 'contain', 'fill', 'cover', 'none', 'scale-down' 4个值，效果与css3中object-fit属性一致
  preload?: string; // 播放器预加载, auto表示预加载即将播放的视频段, metadata表示仅仅加载视频信息, none表示不进行预加载
  logo?: Logo; // 用于给播放器显示logo
  providerOrder?: string[]; // 用来设置provider的使用顺序, 类型为Array, 默认值为['html5', 'hlsjs']
  videoAttributes?: object; // 额外给video标签上加的attribute, 类型为Object
  playlist?: PlaylistItem[]; // playlist用于管理当前播放器的播放列表, playlist是一个数组, 数组的每个item项是每个视频的信息
  language: string; // 播放器的语言, 使用[语言主码]-[国家地区副码]或者[语言主码]的格式(参考ISO 639-1,  ISO 3166 规范), 如'zh-CN', 'en-US', 'fr', 'zh'; 或者指定值为auto表示使用浏览器默认语言
  localization: object; // 语言包
  renderError: Function: ({message, errorId, detail}) => (string or HTMLElement) // 播放器错误渲染函数, 如果你觉得播放器默认的错误渲染结果对用户不友好, 你可以使用这个函数来自定义渲染内容,
	三个参数都是播放器错误信息, return null表示默认
}

export interface Logo {
  file: string; // logo图片url
  link?: string; // logo点击后跳转的链接
  marginw?: number | string; // logo距离视频左侧或者右侧的margin
  marginh?: number | string; // logo距离视频上面或者下面的margin
  width?: number | string; // logo的宽度
  height?: number | string; // logo的高度
}

export interface PlaylistItem {
  mediaid?: any; // 视频id（用于查询当前播放器播放的视频消息）
  image?: string; // 视频的背景图
  title?: string; // 视频title（全屏时展示）
  isLive?: boolean; // 是否是直播，如果是直播的话，播放器会隐藏进度条/播放速率切换等dom
  reloadAfterPausing?: boolean; // 暂停后再次播放是否重新加载
  reloadAfterPausingTime?: number; // 暂停后过了多久，再次播放才重新加载(小于这个时间不会重新加载)，单位毫秒(默认3000ms)
  highlights?: HighLight[]; // 进度条中高亮的点
  sources: PlaylistItemSource[]; // 从流组件中ViewAddressSource获取
  isAd?: boolean, // 是否是广告片
}

export interface HighLight {
  text: string; // hover改点时显示的文字, 最好不要超过20个中文字符
  time: number; // 打点的时间节点, 单位秒
}

export interface PlaylistItemSource {
  file: string; // 视频地址
  label?: string; // 展示在视频切换时的文字: 如720p, HD
  defaultPlay?: boolean; // 是否默认播放该source
  path?: string; // 线路名称: 如aliyun，tencent
  path_name?: string; // 展示在线路切换时的文字: 如线路一, 线路二
}

// 视频回放
export interface PlaybackConfig {
  is_auto_play: boolean; // 是否开启自动播放: true-是 false-否
  is_available: boolean; // 是否有效: true-是 false-否
  expire_at: number; // 视频回放的指定过期时间
  video: Video; // 视频回放信息
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

// 广告片配置
export interface AdvertisementConfig {
  is_open: boolean; // 是否开启广告片展示: true-是 false-否
  video: Video; // 广告片视频信息
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

export interface Video {
  duration: number; // 视频的时长, 单位: 秒
  end_at: number; // 视频结束时间戳
  id: number; // 视频的id
  name: string; // 视频的名称
  size: number; // 视频的大小, 单位: 字节
  start_at: number; // 视频开始时间戳
  status: VideoStatus; // 视频的状态
  cover: string; // 视频的封面
  url: string; // 视频的拉流/下载地址
  playback: VideoPlayback[]; // 视频回放信息
  video_dot: VideoDot[]; // 视频打点信息
  doc_dot: DocDot[]; // 文档打点信息
}
```


#### 初始化播放器 -- setup(dom: string, option: PlayerOption): Player


```typescript
// dom表示播放器要挂载的节点id, option代表播放器配置
const player1 = Evp.Player.setup(dom1, {
    width: '100%',
    height: '100%',
  	autoplay: true,
    language: 'zh',
    localization: {},
  	renderError: ({ message, errorId, detail }: any) => { // 播放器报错时显示直播背景图
      const bgImg = document.createElement('img');
      bgImg.src = Evp.Basis.decoration;
      bgImg.style.width = '100%';
      bgImg.style.height = '100%';
      return bgImg;
    },
  	playlist: [{
      image: 'https://myun-hw-s3.myun.tv/n856xo5m/5r1nnkkk/bugu-doc/upload/yunlivetest.bugu.mudu.tv/1598941825760-199/d1e3af82d922f4ac5f0f37f08ec17c7b.png',
      mediaid: 666,
      isAd: false, // 是否是广告片
      sources: Evp.StreamView.defaultStreamView.view_address.sources
    }]
});
const player2 = Evp.Player.setup(dom2, option2);
```


#### 获取具体播放器实例 -- getPlayerInstance(dom: string): PlayerModel


```typescript
const playerInstance: PlayerModel = Evp.player.getPlayerInstance('播放器挂载的domId');
```
####
#### 获取预告回放配置 -- playback: PlaybackConfig


```typescript
const playback: PlaybackConfig = player1.playback;
```


#### 获取广告片配置 -- advertisement: AdvertisementConfig


```typescript
const advertisement: AdvertisementConfig = player1.advertisement;
```


#### 获取当前播放器播放的视频信息（playlistItem） -- currentPlayListItem: PlaylistItem


```typescript
const currentPlayListItem: PlaylistItem = player1.currentPlayListItem;
```


#### 获取是否有视频源（没有广告片、预告回放、可用流地址） -- isVideoExist: boolean


```typescript
const isVideoExist: boolean = player1.isVideoExist;
```


#### 播放视频 -- play(): void


```typescript
player1.play();
```


#### 暂停播放 -- pause(): void


```typescript
player1.pause();
```


#### 播放下一个(playlist下一个item)视频的第一个源 -- next(): void


```typescript
player1.next();
```


#### 播放上一个(playlist上一个item)视频的第一个源 -- prev(): void


```typescript
player1.prev();
```


#### 获取当前播放器播放的流是否是默认流（vtt翻页功能只针对默认流）-- isDefalutLivingView: boolean


```typescript
const isDefalutLivingView: boolean = player1.isDefalutLivingView;
```


#### 获取当前播放器播放的流是否是预告回放 -- isLivingPlayback: boolean


```typescript
const isLivingPlayback: boolean = player1.isLivingPlayback;
```


#### 获取当前预告回放是否存在vtt翻页打点信息 -- isDocPlayback: boolean


```typescript
const isDocPlayback: boolean = player1.isDocPlayback;
```


#### 设置当前播放器控制条显示(state=true)或隐藏(state=false), 默认state为true -- setControls(state: boolean): void


```typescript
player1.setControls(true);
```


#### 设置播放器全屏(state=true)或者不全屏(state=false) -- setFullscreen(state: boolean): void


```typescript
player1.setFullscreen(true);
```


#### 从头开始播放整个playlist -- loadPlay(playlist: PlaylistItem[]): void


```typescript
const newPlaylist: PlaylistItem[] = []
player1.loadPlay(newPlaylist);
```


#### 播放器销毁 -- destroy(): void


```typescript
player1.destroy();
```
#### 设置弹幕速度 -- setBarrageSpeed(speed: number): void
```typescript
// 默认速度为144
// 弹幕速度 = (弹幕长度 + 播放器宽度) / 弹幕移动时长
const speed = 100;
const player1 = Evp.Player.setup(dom1, option1);
player1.setBarrageSpeed(speed);
```
#### 发送弹幕 -- sendBarrage(text: string, style: DanmuStyle = { color: '#ffffff', fontSize: '20px'}): void


```
可以从评论组件事件监听中去拿到弹幕消息, 是否开启弹幕消息
```


```typescript
const player1Text = '这是实例的第一个播放器的弹幕';
const player2Text = '这是实例的第二个播放器的弹幕';
const player1 = Evp.Player.setup(dom1, option1);
const player2 = Evp.Player.setup(dom2, option2);
player1.sendBarrage(player1Text);
player2.sendBarrage(player2Text, {color: red, fontSize: '25px'})
```


#### 设置播放器资源路径 -- setPath(path: string)
```
使用场景
	1.内网部署
  2.需要将播放器资源一起打包
  3.其他不希望使用目睹播放器cdn资源文件的场景

支持的版本：
	v0.0.10及以上

准备工作：
	1.下载https://static.mudu.tv/evp-websdk/v{指定版本号，例如1.0.0}/mudu-player-assets.zip
  2.本地解压mudu-player-assets.zip得到mudu-player-assets文件夹（可重命名）
  3.将文件夹上传到目标服务器或者项目中

使用方法：
	/**
  	* path可以为具体的cdn地址: 'https://static.xxx.com/mudu-player-assets'
    * 也可以为项目路径: './mudu-player-assets'
    * 但不可以为别名
    */
	Evp.Player.setPath(path);
```


#### 事件监听


```typescript
const { Player, Event } = Evp;
// 监听对应的组件，根据type来区分事件类型，不同的事件类型对应不同的数据
Event.on(Player.name, (v: EventData) => {
  const { type, data } = v;
  switch(type) {
    case 'player.playlist.item.change':
      // 当前播放器播放的信息
      // data为 {
     	  currentPlayListItem: PlaylistItem,
        currentPlayListIndex: number, // PlaylistIndex
  		}
      break;
    case 'player.play':
      // 播放器播放时触发
      break;
    case 'player.pause':
      // 播放器暂停时触发
      break;
    case 'player.error':
      // 播放器出错时触发
      // data为 {
        code: number;
        message: string
      }
      break;
  }
});
```


### 流信息组件 -- StreamView
#### 数据类型定义


```typescript
// 多流直播配置
export interface StreamViewItem {
  cover: string; // 直播画面图片
  is_default: boolean; // 是否为默认直播画面: true-是 false-否
  is_master: boolean; // 是否为主流直播画面, 优先级 > is_default， : true-是 false-否
  is_live: boolean; // 当前画面是否正在直播: true-是 false-否
  name: string; // 直播画面展示名称
  view_page: number; // 直播画面索引值
  view_id: number; // 直播画面id
  view_address: ViewAddressSource; // 当前画面的直播拉流地址列表
}

// 多流直播 -- 单流地址
export interface ViewAddressSource {
  is_abroad: boolean; // 是否为海外地址: true-是 false-否
  sources: ViewAddressItemSource[]; // 对应播放器组件playlist中的PlaylistItemSource[]
}

export interface ViewAddressItemSource {
  file: string, // 直播拉流地址
  label: string, // 直播流分辨率: origin, 720p等
  path: string, // 直播流线路id
  path_name: string, // 直播流线路名称
}

export enum ChannelLiveType {
  Standard = 0, // 标准直播
  Camera = 1, // 摄像头
  Vr = 3, // Vr
}
```


#### 获取多流默认的封面 -- defaultCoverImage: string
```typescript
const defaultCoverImage: string = Evp.StreamView.defaultCoverImage;
```


#### 获取是否是多流 -- getIsMultithread: boolean


```typescript
const isMultithread: boolean = Evp.StreamView.isMultithread;
```


#### 获取多流信息 -- views: StreamViewItem[]


```typescript
const views: StreamViewItem[] = Evp.StreamView.views;
```


#### 获取主画面流信息 -- masterStreamView: StreamViewItem


```typescript
const masterStreamView: StreamViewItem = Evp.StreamView.masterStreamView;
```


#### 获取默认流信息 -- defaultStreamView: StreamViewItem


```typescript
const defaultStreamView: StreamViewItem = Evp.StreamView.defaultStreamView;
```


#### 事件监听


```typescript
const { StreamView, Event } = Evp;
// 监听对应的组件，根据type来区分事件类型，不同的事件类型对应不同的数据
Event.on(StreamView.name, (v: EventData) => {
  const { type, data } = v;
  switch(type) {
    case 'stream-view.add':
      // 多流直播增加画面
      // data为StreamViewItem
      break;
    case 'stream-view.delete':
      // 多流直播删除页面
      // data为 {
      	views: StreamViewItem[], // 删除过后的整个views
        deleteId: number, // 删除画面的id
  		}
      break;
    case 'stream-view.master.change':
      // 多流直播主页面切换
      // data为 views: StreamViewItem[], // 变更后的整个views
      break;
    case 'stream-view.update':
      // 多流的基础信息配置修改
      // data为 views: StreamViewItem[], // 变更后的整个views
      break;
    case 'stream-view.live':
      // 推流开始结束、直播开始停止的流监听
      // data为 {
        views: StreamViewItem[], // 变更后的整个views
        view_page: number, // 对哪个流进行操作，对应到StreamViewItem的view_page
        live: boolean, // false:直播暂停 true:直播开始
  		}
      break;
  }
});
```
### 文档组件 -- Document
#### 数据类型定义
```typescript
/**
 * 文档配置
 */
export interface DocumentConfig {
  is_doc_show: boolean; // 是否展示文档
  bgimg: string; // 文档背景图片
  doc_type: DocType; // 文档的类型
  board: DocBoard; // 白板信息
  ppt: DocPPT; // PPT信息
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
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
```
#### 获取文档配置信息 -- config: DocumentConfig


```javascript
const config: DocumentConfig = Evp.Document.config;
```


#### 获取文档列表 -- getDocumentList(queryData: RequestDocPage): Promise<DocumentList>
```typescript
const documentLists: DocumentList = await Evp.Document.getDocumentList({
  page_num: 1,
  page_size: 15,
  is_doc_download: false,
});
```


#### 获取具体文档下载链接 -- getDocumentDownloadLink(docId: number): Promise<DocumentDownload>
```typescript
const downloadInfo: DocumentDownload = await Evp.Document.getDocumentDownloadLink(450);
```


#### 是否使用Webvtt -- isUseWebvtt: boolean
```typescript
const isUseWebvtt: boolean = Evp.Document.isUseWebvtt;
```


#### 设置非Webvtt延时 -- setDelayTime(time: number): Void
```typescript
Evp.Document.setDelayTime(20000); // time为ms, 默认值为30000
```


#### 事件监听


```typescript
const { Document, Event } = Evp;
// 监听对应的组件，根据type来区分事件类型，不同的事件类型对应不同的数据
Event.on(Document.name, (v: EventData) => {
  const { type, data } = v;
  switch(type) {
    case 'document.config.update':
      // 文档配置更新（直播）
      // data为DocumentConfig
      break;
    case 'document.playback.paging.update':
      // 文档配置更新（预告回放）
      // data为{
      	docid: number, // 文档id
        url: string, // 图片url
        playerId: string, // 播放打点预告回放的播放器domId
  		}
      break;
    case 'document.paging.update':
      // 翻页信息更新
      // data为DocumentConfig
      break;
    case 'document.list.download':
      // 文档是否可下载
      // data为{
  			docid: number, // 文档id
        is_doc_downLoad: boolean, // 是否可下载
  		}
      break;
    case 'document.list.add':
      // 添加文档（此时未转码成功）
      // data为添加的文档id
      break;
    case 'document.list.transcode':
      // 转码状态
      // data为{
      	docid: number; // 文档id
      	status: 1 | 2; // 1代表转码成功 可以重新调用getDocumentList获取文档列表; 2代表正在转码中
  		}
      break;
    case 'document.list.delete':
      // 文档删除
      // data为删除的文档id
      break;
  }
});
```
### 问卷组件 -- Questionnaire
#### 数据类型定义
```typescript
/**
 * 问卷配置
 */
export interface QuestionnaireConfig {
  id: string; // 问卷id
  name: string; // 问卷展示名称
  description: string; // 问卷的描述信息
  is_force: boolean; // 是否强制填写: true-是 false-否
  open_at: number; // 问卷开启时间
  pic: string; // 问卷展示图片
  updated_at: number; // 问卷更新时间
  is_open: boolean; // 是否开启问卷: true-是 false-否
  items: string | QuestionnaireItem[]; // 问卷选项信息
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
  exist: boolean; // 是否有填写过该问券
}

/**
 * 用户端提交类型
 */
export type SubmitType = {
  [key: number]: any; // key从0开始代表题号 value值为答案（可以看submit方法中的例子）
}

/**
 * 问卷选择题题目
 */
export interface QuestionnaireChoiceItem {
  inEdit: boolean;
  value: string; // 选项名称
}

/**
 * 问卷类型
 */
export enum QuestionnaireType {
  Phone = 'phone', // 手机号
  Input = 'input', // 单行文字
  Textarea = 'textarea', // 多行文字
  Question = 'question', // 选择题
  QuestionAnswer = 'questionAnswer' // 问答题
}

/**
 * 问卷题目
 */
export interface QuestionnaireItem {
  allow_fill_by_self?: boolean; // 选择题允许用户填写答案
  inEdit: boolean;
  multi_select?: 0 | 1; // 选择题是否多选 0：单选 1：多选
  must: 0 | 1; // 是否必填
  name: string; // 问题名称
  num?: number;
  options?: QuestionnaireChoiceItem[]; // 多选题
  type: QuestionnaireType;
}
```
#### 获取问卷配置信息 -- config: QuestionnaireConfig


```javascript
const config: QuestionnaireConfig = Evp.Questionnaire.config;
```


#### 提交问卷 -- submit(content: SubmitType): Promise<boolean>


```javascript
const contentExm = {
	0: 15727860887, // 手机号
  1: '这是单行文字', // 单行文字
  2: '这是多行文字', // 多行文字
  3: ['用户的选项值'], // 单选题value(不允许用户填写答案)
  4: ['用户的选项值', '用户填写答案'], // 单选题value(允许用户填写答案)
  4: ['选项2', '选项3'], // 多选题value(不允许用户填写答案)
  5: ['选项2', '选项3', '用户填写答案'], // 多选题value(允许用户填写答案)
  6: '这是问答题', // 问答题
  ...
}
const success: boolean = Evp.Questionnaire.submit(contentExm);
```


#### 事件监听


```typescript
const { User, Event } = Evp;
// 监听对应的组件，根据type来区分事件类型，不同的事件类型对应不同的数据
Event.on(Questionnaire.name, (v: EventData) => {
  const { type, data } = v;
  switch(type) {
    case 'questionnaire.hide':
      // 取消当前问卷
      break;
    case 'questionnaire.pop':
      // 使用问卷
      // data为QuestionnaireConfig
      break;
  }
});
```
### 抽奖组件 -- Lottery
#### 抽奖说明
```
抽奖有两种方式：
	A.昵称参与抽奖
  B.手机号参与抽奖
A.昵称参与抽奖流程：
	1.调用join报名参与（前提为昵称不为空）
B.手机号参与抽奖流程：
	1.填写手机号，调用joinWithPhone，后台会发送短信到填写的手机号
	2.验证短信验证码是否正确，并参与抽奖
```
#### 数据类型定义
```typescript
// 抽奖配置信息
export interface LotteryConfig {
  id: number; // 抽奖id
  name: string; // 抽奖名称
  is_allow_watch: boolean; // 是否让观众看到: true-是 false-否
  join_types: LotterJoinType[]; // 抽奖报名方式
  status: LotteryStatus;
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
  prize?: LotteryPrizeItem[];
}

// 抽奖报名方式
export enum LotterJoinType {
  LocalImport = 'local_import', // 本地名单导入
  Phone = 'phone', // 手机号
  Nickname = 'nickname' // 昵称
}

// 抽奖结果
export interface LotteryResult {
  is_join: boolean; // 是否参与抽奖
  is_allow_watch: boolean; // 是否允许查看中奖人列表
  is_ok: boolean;
  prize: LotteryPrizeResult[];
}

// 奖品
export interface LotteryPrizeItem {
  award_name: string; // 奖品名称
  count: number; // 中奖名额
  prize_id: number; // 奖品id
  image: string; // 奖品图片
  name: string; // 奖品名称
  open_at: string; // 开奖时间
  open_type: LotteryPrizeOpenType; // 开奖类型 1 手动开奖 0 定时开奖
  start_at: number; // 定时开奖时间戳
  status: LotteryPrizeStatus; // 奖项开奖状态 0 未开奖 1 开奖中 2 开奖失败 100 已开奖
}

// 抽奖奖品结果
export interface LotteryPrizeResult {
  prize_id: number; // 奖品id
  is_lucky: boolean; // 是否中奖
  people: PrizeResultPeopleItem[]; // 中奖人列表
}

// 中奖人
export interface PrizeResultPeopleItem {
  viewer_name: string; // 中奖人名称
  viewer_message: string; // 中奖人信息
}

// 抽奖状态
export enum LotteryStatus {
  Close = 0, // 关闭
  Open = 1, // 开启
  Unknow = 100, // 观看页未使用
}

// 抽奖开启类型
export enum LotteryPrizeOpenType {
  Timing = 0, // 定时
  Manual = 1, // 手动
}

// 抽奖奖品状态
export enum LotteryPrizeStatus {
  NotLotteryYet = 0, // 未开奖
  Drawing = 1, // 开奖中
  Completed = 100, // 开奖完成
}
```
#### 获取抽奖配置信息 -- config: LotteryConfig
```typescript
const config: LotteryConfig = Evp.Lottery.config;
```
#### 查询用户是否已经报名 -- isJoin: boolean
```typescript
const isJoin: boolean = Evp.Lottery.isJoin;
```
#### 查询抽奖是否允许查看中奖人 -- isAllowWatch: boolean
```typescript
const isAllowWatch: boolean = Evp.Lottery.isAllowWatch;
```
#### 获取抽奖报名方式 -- joinTypes: LotteryJoinType[]
```typescript
// 抽奖报名方式有三种：1.非公开报名--本地名单导入 2.公开报名--手机号报名 3.公开报名--昵称报名
const joinTypes: LotteryJoinType[] = Evp.Lottery.joinTypes;
```
#### 获取抽奖结果 -- getLotteryResult(): Promise<LotteryResult>
```typescript
const result: LotteryResult = await Evp.Lottery.getLotteryResult();
```
#### 获取抽奖奖品结果 -- getPrizeResult(prize_id: number): Promise<LotteryPrizeResult>
```typescript
const result: LotteryPrizeResult = await Evp.Lottery.getPrizeResult(prize_id);
```
#### 报名参与抽奖 -- join(): Promise<boolean>
```typescript
// 默认使用昵称参与抽奖
// 报名之前需保证Evp.User.info.nickname不为空
const success: boolean = Evp.Lottery.join();
```
#### 手机号报名参与抽奖 -- joinWithPhone(phone: string): Promise<boolean>
```typescript
const success: boolean = await Evp.Lottery.joinWithPhone(phone);
```
#### 手机号短信验证 -- smsVerify(phone: string, code: string): Promize<boolean>
```typescript
const success: boolean = await Evp.Lottery.smsVerify(phone, code);
```
#### 事件监听
```typescript
const { Lottery, Event } = Evp;
// 监听对应的组件，根据type来区分事件类型，不同的事件类型对应不同的数据
Event.on(Lottery.name, (v) => {
  const { type, data } = v;
  switch(type){
    case 'lottery.config.update':
      // 抽奖配置信息更新
      // data为LotteryConfig
      break;

    case 'lottery.open':
      // 抽奖打开
      // 无data
      break;

    case 'lottery.prize.update':
      // 抽奖奖品信息更新
      // data为LotteryPrizeItem
      break;

    case 'lottery.result.update':
      // 抽奖奖品结果更新
      // data为LotteryResult

    case 'lottery.prize.status.update':
      // 抽奖奖品状态更新
      // data为 0 -- 未开奖，1 -- 开奖中，100 -- 已开奖
      break;
  }
});
```
### 倒计时组件 -- Countdown
#### 倒计时说明
```
该倒计时为直播开始时间的倒计时
```
#### 数据类型定义
```typescript
// 倒计时配置信息
export interface CountdownConfig {
  is_open: boolean; // 是否开启倒计时: true-是 false-否
  title: string; // 倒计时展示的标题信息
  date_time: number; // 倒计时选定的时间
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}
```
#### 获取倒计时配置信息 -- config: CountdownConfig
```typescript
const config: CountdownConfig = Evp.Countdown.config;
```
#### 事件监听
```typescript
const { Countdown, Event } = Evp;
// 监听对应的组件，根据type来区分事件类型，不同的事件类型对应不同的数据
Event.on(Countdown.name, (v) => {
  const { type, data } = v;
  switch(type){
    case 'countdown.start':
      // 倒计时开始
      break;

    case 'countdown.counting':
      // 倒计时中
      // data为剩余时间，单位为秒
      break;

    case 'countdown.end':
      // 倒计时结束
      break;
  }
});
```
### sdk错误码
#### 错误码命名规范
```
错误码的格式为：4[组件序列号][错误序列号]
组件序列号与错误序列号范围为：00 - 99
```
#### 模块序列号参照表
| **组件描述** | **组件序列号** |
| --- | --- |
| 系统提示 | 00 |
| 频道组件 -- Room | 01 |
| 事件监听组件 -- Event | 02 |
| 基本信息组件 -- Basis | 03 |
| 观众组件 -- User | 04 |
| 打赏组件 -- Reward | 05 |
| 自定义菜单栏组件 -- Menus | 06 |
| 评论组件 -- Comment | 07 |
| 流信息组件 -- StreamView | 08 |
| 播放器组件 -- Player | 09 |
| 报名组件 -- Signup | 10 |
| 问卷组件 -- Questionnaire | 11 |
| 抽奖组件 -- Lottery | 12 |
| 考试组件 -- Examination | 13 |
| 文档组件 -- Document | 14 |
| 倒计时组件 -- Countdown | 15 |
| 公告组件 | 16 |
| 红包组件 -- Redpacket | 17 |

#### 错误码列表
| **错误码** | **错误消息** | **详细描述及解决办法** |
| --- | --- | --- |
| 40000 | 存在无效的请求参数 | 检查请求的参数是否正确 |
| 40001 | 获取微信平台信息失败 |  |
| 40002 | 无效的微信用户身份 |  |
| 40003 | 无效的频道HashID |  |
| 40004 | 无效的媒体中心域名 |  |
| 40005 | 频道与媒体中心域名不匹配 |  |
| 40006 | 请求域名和开发者申请的媒体中心域名不匹配 |  |
| 40007 | 无效的观众身份签名 |  |
| 40008 | 观众身份签名过期了 |  |
| 40009 | 该频道禁止匿名观众 |  |
| 40010 | 获取媒体中心配置信息失败 |  |
| 40011 | 获取oauth2用户信息失败 |  |
| 40012 | 未知错误 |  |
| 40100 | 获取频道信息失败 |  |
| 40101 | 获取频道的UV和PV信息失败 |  |
| 40102 | 获取频道的直播状态信息失败 |  |
| 40103 | 当前频道人数已满，请排队等待 |  |
| 40300 | 获取频道的配置信息失败 |  |
| 40301 | 获取频道的基本配置信息失败 |  |
| 40302 | 获取频道的装修配置信息失败 |  |
| 40303 | 获取频道的分享配置信息失败 |  |
| 40304 | 获取频道的连麦配置信息失败 |  |
| 40305 | 获取频道的微信SDK配置信息失败 |  |
| 40306 | 获取频道的授权观看配置信息失败 |  |
| 40400 | 该观众被禁止了 |  |
| 40401 | 更新观众身份信息失败 |  |
| 40402 | 该观众不存在 |  |
| 40403 | 新增观众失败 |  |
| 40404 | 获取观众身份信息失败 |  |
| 40405 | 获取不到analytic_session |  |
| 40406 | 上报观众进入观看页事件失败 |  |
| 40407 | 上报观众在线心跳事件失败 |  |
| 40408 | 上报观众离线事件失败 |  |
| 40409 | 上报页面事件失败 |  |
| 40500 | 获取频道的打赏配置信息失败 |  |
| 40501 | 打赏功能被禁止使用 |  |
| 40502 | 获取频道的打赏记录信息失败 |  |
| 40503 | 新增打赏订单记录失败 |  |
| 40600 | 获取频道的自定义菜单栏信息失败 |  |
| 40601 | 获取频道的自定义菜单栏的精彩图文信息失败 |  |
| 40602 | 获取频道的自定义菜单栏的互动视频信息失败 |  |
| 40700 | 获取频道的评论配置信息失败 |  |
| 40701 | 发送评论频率太快了 |  |
| 40702 | 发送评论失败 |  |
| 40703 | 发送评论的内容存在敏感词 |  |
| 40704 | 获取评论列表失败 |  |
| 40800 | 获取频道的多流画面配置信息失败 |  |
| 40801 | 获取视频信息失败 |  |
| 40802 | 直播资源不足，请及时充值 |  |
| 40900 | 获取频道的广告配置信息失败 |  |
| 40901 | 获取频道的回放配置信息失败 |  |
| 40902 | 播放器初始化失败，请检查传入配置 |  |
| 40903 | 播放器播放错误，请确保播放地址有效 |  |
| 41000 | 获取频道的报名配置信息失败 |  |
| 41001 | 观众上报报名信息失败 |  |
| 41002 | 无效的报名信息内容 |  |
| 41003 | 未开启报名功能  |  |
| 41004 | 更新报名配置错误 |  |
| 41005 | 获取报名配置错误 |  |
| 41006 | 写入用户信息错误 |  |
| 41007 | 查询用户信息集错误 |  |
| 41008 | 查询用户信息错误 |  |
| 41009 | 新建门户用户错误 |  |
| 41010 | 更新门户用户错误 |  |
| 41011 | 获取门户用户错误 |  |
| 41012 | 解析报名表格式错误 |  |
| 41013 | save wechat auth error |  |
| 41014 | get wechat auth error |  |
| 41015 | request wechat auth error |  |
| 41016 | update wechat auth config error |  |
| 41017 | get wechat auth config error |  |
| 41100 | 获取频道的问卷配置信息失败 |  |
| 41101 | 存在重复问题 |  |
| 41102 | 未设定问题名称 |  |
| 41103 | 未设定问题类型 |  |
| 41104 | 未定义是否必填 |  |
| 41105 | 图片Url格式错误 |  |
| 41106 | 问卷创建失败 |  |
| 41107 | 用户答题已存在 |  |
| 41108 | 提交问卷失败 |  |
| 41109 | 上传问卷失败 |  |
| 41110 | 获取问卷URL失败 |  |
| 41111 | 获取问卷失败 |  |
| 41112 | 获取提交问卷失败 |  |
| 41113 | 空问卷 |  |
| 41114 | 存在已开启问卷 |  |
| 41115 | 删除问卷失败 |  |
| 41200 | 获取频道的抽奖配置信息失败 |  |
| 41201 | 验证码发送太频繁 |  |
| 41202 | 验证码失效或者不存在 |  |
| 41203 | 已经报名抽奖了 |  |
| 41204 | 参与抽奖失败 |  |
| 41205 | 已经存在正在开奖的抽奖项 |  |
| 41206 | 开奖失败 |  |
| 41207 | 抽奖活动不存在 |  |
| 41208 | 上传名单超过上限 |  |
| 41209 | 已经存在处于开启的抽奖活动 |  |
| 41210 | 活动抽奖下不存在抽奖 |  |
| 41211 | 手机号已经被使用了 |  |
| 41212 | 不符合条件，请进行微信授权 |  |
| 41213 | 抽奖数量达到上限 |  |
| 41214 | 上传名单存在错误 |  |
| 41215 | 活动下存在开奖完成的奖项 |  |
| 41216 | 不是具名用户 |  |
| 41217 | 请先设置抽奖范围 |  |
| 41300 | 获取频道的考试配置信息失败 |  |
| 41400 | 获取频道的文档配置信息失败 |  |
| 41500 | 获取频道的倒计时配置信息失败 |  |
| 41600 | 获取频道的公告配置信息失败 |  |
| 41700 | 获取频道的红包配置信息失败 |  |



