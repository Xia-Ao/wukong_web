/**
 * @author: xiaao
 * @data: 2019/6/23 12:16
 * @description:
 */

/**
 *
 * @param {Array} list 排序数组
 * @param {String} updateTime // 排序依据 默认updateTime
 * @returns {Array} list
 */
const sortListByTime = (list = [], time = 'updateTime') => {
  return list.sort((a, b) => new Date(b[time]) - new Date(a[time]));
};


/**
 * 时间格式化
 * @param {number} time 时间戳（毫秒)
 * @param {string} fmt  时间格式
 * @returns {string}
 */
const dateFormat = function (time, fmt = 'yyyy.MM.dd') {
  if (typeof time !== 'number' || time <= 0) {
      throw Error(`Type Error: Export number, got ${typeof time}`);
  }
  if (typeof fmt !== 'string') {
      throw Error(`Type Error: Export string, got ${typeof fmt}`);
  }
  const date = new Date(time);
  const obj = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  Object.keys(obj).forEach((k) => {
      if (new RegExp(`(${k})`).test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[k]) :
              ((`00${obj[k]}`).substr((`${obj[k]}`).length)));
      }
  });
  return fmt;
};

export  {
  dateFormat,
  sortListByTime,
}
