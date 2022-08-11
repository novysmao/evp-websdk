import { ErrorRes } from '@type/backend.type';
import { ErrorMap } from '@type/error.type';

export const statusCodeMap: ErrorMap = {
  400000: {
    code: 40000,
    message: '存在无效的请求参数',
  },
  400001: {
    code: 40001,
    message: '获取微信平台信息失败',
  },
  400002: {
    code: 40002,
    message: '无效的微信用户身份',
  },
  400003: {
    code: 40003,
    message: '无效的频道HashID',
  },
  400004: {
    code: 40004,
    message: '无效的媒体中心域名',
  },
  400005: {
    code: 40005,
    message: '频道与媒体中心域名不匹配',
  },
  400006: {
    code: 40006,
    message: '请求域名和开发者申请的媒体中心域名不匹配',
  },
  400007: {
    code: 40007,
    message: '无效的观众身份签名',
  },
  400008: {
    code: 40008,
    message: '观众身份签名过期了',
  },
  400009: {
    code: 40009,
    message: '该频道禁止匿名观众',
  },
  400026: {
    code: 40010,
    message: '获取媒体中心配置信息失败',
  },
  2500: {
    code: 40012,
    message: '未知错误',
  },
  500000: {
    code: 40011,
    message: '获取oauth2用户信息失败',
  },
  400050: {
    code: 40100,
    message: '获取频道信息失败',
  },
  400051: {
    code: 40101,
    message: '获取频道的UV和PV信息失败',
  },
  400052: {
    code: 40102,
    message: '获取频道的直播状态信息失败',
  },
  400053: {
    code: 40103,
    message: '当前频道人数已满，请排队等待',
  },
  400020: {
    code: 40300,
    message: '获取频道的配置信息失败',
  },
  400025: {
    code: 40301,
    message: '获取频道的基本配置信息失败',
  },
  400027: {
    code: 40302,
    message: '获取频道的装修配置信息失败',
  },
  400028: {
    code: 40303,
    message: '获取频道的分享配置信息失败',
  },
  400033: {
    code: 40304,
    message: '获取频道的连麦配置信息失败',
  },
  400038: {
    code: 40305,
    message: '获取频道的微信SDK配置信息失败',
  },
  400041: {
    code: 40306,
    message: '获取频道的授权观看配置信息失败',
  },
  400010: {
    code: 40400,
    message: '该观众被禁止了',
  },
  400011: {
    code: 40401,
    message: '更新观众身份信息失败',
  },
  400012: {
    code: 40402,
    message: '该观众不存在',
  },
  400013: {
    code: 40403,
    message: '新增观众失败',
  },
  400014: {
    code: 40404,
    message: '获取观众身份信息失败',
  },
  400015: {
    code: 40405,
    message: '获取不到analytic_session',
  },
  400016: {
    code: 40406,
    message: '上报观众进入观看页事件失败',
  },
  400017: {
    code: 40407,
    message: '上报观众在线心跳事件失败',
  },
  400018: {
    code: 40408,
    message: '上报观众离线事件失败',
  },
  400019: {
    code: 40409,
    message: '上报页面事件失败',
  },
  400036: {
    code: 40500,
    message: '获取频道的打赏配置信息失败',
  },
  400060: {
    code: 40501,
    message: '打赏功能被禁止使用',
  },
  400061: {
    code: 40502,
    message: '获取频道的打赏记录信息失败',
  },
  400062: {
    code: 40503,
    message: '新增打赏订单记录失败',
  },
  400024: {
    code: 40600,
    message: '获取频道的自定义菜单栏信息失败',
  },
  400070: {
    code: 40601,
    message: '获取频道的自定义菜单栏的精彩图文信息失败',
  },
  400071: {
    code: 40602,
    message: '获取频道的自定义菜单栏的互动视频信息失败',
  },
  400029: {
    code: 40700,
    message: '获取频道的评论配置信息失败',
  },
  400080: {
    code: 40701,
    message: '发送评论频率太快了',
  },
  400081: {
    code: 40702,
    message: '发送评论失败',
  },
  400082: {
    code: 40703,
    message: '发送评论的内容存在敏感词',
  },
  400083: {
    code: 40704,
    message: '获取评论列表失败',
  },
  400021: {
    code: 40800,
    message: '获取频道的多流画面配置信息失败',
  },
  400084: {
    code: 40801,
    message: '获取视频信息失败',
  },
  400100: {
    code: 40802,
    message: '直播资源不足，请及时充值',
  },
  400034: {
    code: 40900,
    message: '获取频道的广告配置信息失败',
  },
  400035: {
    code: 40901,
    message: '获取频道的回放配置信息失败',
  },
  40902: {
    code: 40902,
    message: '播放器初始化失败，请检查传入配置',
  },
  40903: {
    code: 40903,
    message: '播放器播放错误',
  },
  400039: {
    code: 41000,
    message: '获取频道的报名配置信息失败',
  },
  400090: {
    code: 41001,
    message: '观众上报报名信息失败',
  },
  400091: {
    code: 41002,
    message: '无效的报名信息内容',
  },
  400092: {
    code: 41003,
    message: '未开启报名功能',
  },
  2676: {
    code: 41004,
    message: '更新报名配置错误',
  },
  2677: {
    code: 41005,
    message: '获取报名配置错误',
  },
  2678: {
    code: 41006,
    message: '写入用户信息错误',
  },
  2679: {
    code: 41007,
    message: '查询用户信息集错误',
  },
  2680: {
    code: 41008,
    message: '查询用户信息错误',
  },
  2502: {
    code: 41009,
    message: '新建门户用户错误',
  },
  2560: {
    code: 41010,
    message: '更新门户用户错误',
  },
  2531: {
    code: 41011,
    message: '获取门户用户错误',
  },
  2681: {
    code: 41012,
    message: '解析报名表格式错误',
  },
  2695: {
    code: 41013,
    message: 'save wechat auth error',
  },
  2696: {
    code: 41014,
    message: 'get wechat auth error',
  },
  2697: {
    code: 41015,
    message: 'request wechat auth error',
  },
  2699: {
    code: 41016,
    message: 'update wechat auth config error',
  },
  2700: {
    code: 41017,
    message: 'get wechat auth config error',
  },
  400022: {
    code: 41100,
    message: '获取频道的问卷配置信息失败',
  },
  2624: {
    code: 41101,
    message: '存在重复问题',
  },
  2625: {
    code: 41102,
    message: '未设定问题名称',
  },
  2626: {
    code: 41103,
    message: '未设定问题类型',
  },
  2627: {
    code: 41104,
    message: '未定义是否必填',
  },
  2628: {
    code: 41105,
    message: '图片Url格式错误',
  },
  2629: {
    code: 41106,
    message: '问卷创建失败',
  },
  2630: {
    code: 41107,
    message: '用户答题已存在',
  },
  2631: {
    code: 41108,
    message: '提交问卷失败',
  },
  2632: {
    code: 41109,
    message: '上传问卷失败',
  },
  2633: {
    code: 41110,
    message: '获取问卷URL失败',
  },
  2634: {
    code: 41111,
    message: '获取问卷失败',
  },
  2635: {
    code: 41112,
    message: '获取提交问卷失败',
  },
  2636: {
    code: 41113,
    message: '空问卷',
  },
  2637: {
    code: 41114,
    message: '存在已开启问卷',
  },
  2638: {
    code: 41115,
    message: '删除问卷失败',
  },
  400037: {
    code: 41200,
    message: '获取频道的抽奖配置信息失败',
  },
  150001: {
    code: 41201,
    message: '验证码发送太频繁',
  },
  150002: {
    code: 41202,
    message: '验证码失效或者不存在',
  },
  150003: {
    code: 41203,
    message: '已经报名抽奖了',
  },
  150004: {
    code: 41204,
    message: '参与抽奖失败',
  },
  150005: {
    code: 41205,
    message: '已经存在正在开奖的抽奖项',
  },
  150006: {
    code: 41206,
    message: '开奖失败',
  },
  150007: {
    code: 41207,
    message: '抽奖活动不存在',
  },
  150008: {
    code: 41208,
    message: '上传名单超过上限',
  },
  150009: {
    code: 41209,
    message: '已经存在处于开启的抽奖活动',
  },
  150010: {
    code: 41210,
    message: '活动抽奖下不存在抽奖',
  },
  150011: {
    code: 41211,
    message: '手机号已经被使用了',
  },
  150012: {
    code: 41212,
    message: '不符合条件，请进行微信授权',
  },
  150013: {
    code: 41213,
    message: '抽奖数量达到上限',
  },
  150014: {
    code: 41214,
    message: '上传名单存在错误',
  },
  150015: {
    code: 41215,
    message: '活动下存在开奖完成的奖项',
  },
  150016: {
    code: 41216,
    message: '不是具名用户',
  },
  150017: {
    code: 41217,
    message: '请先设置抽奖范围',
  },
  400023: {
    code: 41300,
    message: '获取频道的考试配置信息失败',
  },
  400030: {
    code: 41400,
    message: '获取频道的文档配置信息失败',
  },
  400031: {
    code: 41500,
    message: '获取频道的倒计时配置信息失败',
  },
  400032: {
    code: 41600,
    message: '获取频道的公告配置信息失败',
  },
  400040: {
    code: 41700,
    message: '获取频道的红包配置信息失败',
  },
};

// export const statusCodeMap = {
// 400000: '存在无效的请求参数',
// 400001: '获取微信平台信息失败',
// 400002: '无效的微信用户身份',
// 400003: '无效的频道HashID',
// 400004: '无效的媒体中心域名',
// 400005: '频道与媒体中心域名不匹配',
// 400006: '无效的观众身份签名',
// 400007: '观众身份签名过期了',
// 400008: '该频道禁止匿名观众',
// 400010: '该观众被禁止了',
// 400011: '更新观众身份信息失败',
// 400012: '该观众不存在',
// 400013: '新增观众失败',
// 400014: '获取观众身份信息失败',
// 400015: '获取不到analytic_session',
// 400016: '上报观众进入观看页事件失败',
// 400017: '上报观众在线心跳事件失败',
// 400018: '上报观众离线事件失败',
// 400019: '上报页面事件失败',
// 400020: '获取频道的配置信息失败',
// 400021: '获取频道的多流画面配置信息失败',
// 400022: '获取频道的问卷配置信息失败',
// 400023: '获取频道的考试配置信息失败',
// 400024: '获取频道的自定义菜单栏信息失败',
// 400025: '获取频道的基本配置信息失败',
// 400026: '获取媒体中心配置信息失败',
// 400027: '获取频道的装修配置信息失败',
// 400028: '获取频道的分享配置信息失败',
// 400029: '获取频道的评论配置信息失败',
// 400030: '获取频道的文档配置信息失败',
// 400031: '获取频道的倒计时配置信息失败',
// 400032: '获取频道的公告配置信息失败',
// 400033: '获取频道的连麦配置信息失败',
// 400034: '获取频道的广告配置信息失败',
// 400035: '获取频道的回放配置信息失败',
// 400036: '获取频道的打赏配置信息失败',
// 400037: '获取频道的抽奖配置信息失败',
// 400038: '获取频道的微信SDK配置信息失败',
// 400039: '获取频道的报名配置信息失败',
// 400040: '获取频道的红包配置信息失败',
// 400041: '获取频道的授权观看配置信息失败',
// 400050: '获取频道信息失败',
// 400051: '获取频道的UV和PV信息失败',
// 400052: '获取频道的直播状态信息失败',
// 400053: '当前频道人数已满，请排队等待',
// 400060: '打赏功能被禁止使用',
// 400061: '获取频道的打赏记录信息失败',
// 400062: '新增打赏订单记录失败',
// 400070: '获取频道的自定义菜单栏的精彩图文信息失败',
// 400071: '获取频道的自定义菜单栏的互动视频信息失败',
// 400080: '发送评论频率太快了',
// 400081: '发送评论失败',
// 400082: '发送评论的内容存在敏感词',
// 400083: '获取评论列表失败',
// 400084: '获取视频信息失败',
// 400090: '观众上报报名信息失败',
// 400091: '无效的报名信息内容',
// 400092: '未开启报名功能',
// 400100: '直播资源不足，请及时充值',
// 150001: '验证码发送太频繁',
// 150002: '验证码失效或者不存在',
// 150003: '已经报名抽奖了',
// 150004: '参与抽奖失败',
// 150005: '已经存在正在开奖的抽奖项',
// 150006: '开奖失败',
// 150007: '抽奖活动不存在',
// 150008: '上传名单超过上限',
// 150009: '已经存在处于开启的抽奖活动',
// 150010: '活动抽奖下不存在抽奖',
// 150011: '手机号已经被使用了',
// 150012: '不符合条件，请进行微信授权',
// 150013: '抽奖数量达到上限',
// 150014: '上传名单存在错误',
// 150015: '活动下存在开奖完成的奖项',
// 150016: '不是具名用户',
// 150017: '请先设置抽奖范围',
// 2624: '存在重复问题',
// 2625: '未设定问题名称',
// 2626: '未设定问题类型',
// 2627: '未定义是否必填',
// 2628: '图片Url格式错误',
// 2629: '问卷创建失败',
// 2630: '用户答题已存在',
// 2631: '提交问卷失败',
// 2632: '上传问卷失败',
// 2633: '获取问卷URL失败',
// 2634: '获取问卷失败',
// 2635: '获取提交问卷失败',
// 2636: '空问卷',
// 2637: '存在已开启问卷',
// 2638: '删除问卷失败',
// 2676: '更新报名配置错误',
// 2677: '获取报名配置错误',
// 2678: '写入用户信息错误',
// 2679: '查询用户信息集错误',
// 2680: '查询用户信息错误',
// 2502: '新建门户用户错误',
// 2560: '更新门户用户错误',
// 2531: '获取门户用户错误',
// 2681: '解析报名表格式错误',
// 2695: 'save wechat auth error',
// 2696: 'get wechat auth error',
// 2697: 'request wechat auth error',
// 2699: 'update wechat auth config error',
// 2700: 'get wechat auth config error'
// }

export const resolve = (v: ErrorRes) => {
  if (statusCodeMap.hasOwnProperty(v.code)) {
    return statusCodeMap[v.code];
  }
  return v;
};
