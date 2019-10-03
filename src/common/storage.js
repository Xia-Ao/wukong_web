/*
 * @Author: ao.xia 
 * @Date: 2019-10-02 21:47:41 
 * @Last Modified by: ao.xia
 * @Last Modified time: 2019-10-02 22:05:36
 */

/**
 * 发布队列sessionStorage get set方法
 * @type {{set: planQueenStorage.set, get: (function(): (string | any))}}
 */
export const planQueenStorage = {
  /**
   * 设置role值
   * @param {string/Number} value
   */
  set: (value) => {
    window.sessionStorage.setItem('planeQueen', JSON.stringify(value));
  },
  /**
   *
   * @returns {string}
   */
  get: () => window.sessionStorage.getItem('planeQueen') && JSON.parse(window.sessionStorage.getItem('planeQueen')),

  /**
   * clear
   */
  clear: () => window.sessionStorage.removeItem('planeQueen'),

};
