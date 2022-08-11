const topic_op = {
  'bugu.activity.comments': 10000,
  'bugu.activity.admin.comments': 10001,
  'bugu.activity.livecomments': 10002,
  'bugu.activity.banlist': 10003,
  'bugu.custom': 10004,
  'doc.admin.sync': 10100,
  'doc.sync': 10101,
  'bugu.mediahub.announcement': 10200,
  'bugu.activity.live': 10300,
  'bugu.activity.viewlive': 10301,
  'bugu.activity.examination': 10400,
  'bugu.signup.wechat': 10500,
  'bugu.activity.question': 10600,
  'bugu.hubuser.user_online': 10700,
  'bugu.activity.announcement': 10800,
  'bugu.activity.view': 10801,
  'bugu.reward.special_effects': 10900,
  'bugu.reward.pay.success': 10901,
  'bugu.reward.prop': 10902,
  'bugu.red_packet.send': 11000,
  'bugu.payment': 11100,
  actqueue_dequeued: 11200,
  'bugu.market.prize': 11300,
  'mudu.webtool': 11400,
};

const topicCompatible = (topic: string, mid?: number) => {
  if (mid) {
    for (const key of Object.keys(topic_op)) {
      const reg = new RegExp(`^${key}.*`);
      if (typeof topic === 'string' && reg.test(topic)) {
        return topic_op[key];
      }
    }
  }
  return topic;
};

export { topicCompatible };
