const aliCdnUrl = require('ali-cdn-url');
const request = require('request');

const pubArgs = {
  Format: 'JSON',
  AccessKeyId: process.env.OSS_ID || 'TApKg3jxf7Myf7I1',
  AccessKeySecret: process.env.OSS_SECRET || 'KPq7vrowBbkuD7DsIDMH9c7WcTeucR',
};

const otherArgs = {
  ObjectPath: 'static.mudu.tv/evp-websdk/latest/',
  Action: 'RefreshObjectCaches',
  ObjectType: 'Directory'
};

const url = aliCdnUrl(pubArgs, otherArgs);
request(url, function (error, response, body) {
  console.error('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);
});
