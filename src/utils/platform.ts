/* eslint-disable */
/**
 * 部分浏览器平台判断
 */
const UA = window.navigator.userAgent.toLowerCase();
export const isAndroid = /android/.test(UA);
export const isIOS = /iphone|ipad|ipod|ios/.test(UA);
export const isWX = /micromessenger/.test(UA);
export const isPC = !/iphone|ipad|ipod|ios|android/.test(UA);
export const isIE = /*@cc_on!@*/ false;
