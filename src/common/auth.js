/**
 * @author: xiaao
 * @data: 2019/6/26 22:42
 * @description:
 */
/**
 * 用户角色值get set方法
 * @type {{set: roleTypeStorage.set, get: (function(): (string | any))}}
 */
export const roleTypeStorage = {
  /**
   * 设置role值
   * @param {string/Number} value
   */
  set: (value) => {
    window.sessionStorage.setItem('roleType', value);
  },
  /**
   *
   * @returns {string}
   */
  get: () => window.sessionStorage.getItem('roleType') && JSON.parse(window.sessionStorage.getItem('roleType'))
};

/**
 *
 * @param type 权限类型 type=null 默认为true   type='admin'管理员权限   type='op'操作员权限  type='agent'代理商权限
 * @returns {{add: boolean, modify: boolean, list: boolean}}
 */
export const getUserType = (type) => {
  const roleType = roleTypeStorage.get();
  switch (type) {
    case 'admin':
      return roleType === 1 || roleType === 2;
    case 'op':
      return roleType === 1 || roleType === 2 || roleType === 4;
    case 'agent':
      return roleType === 1 || roleType === 2 || roleType === 4 || roleType === 7;
    default:
      return true;
  }
};
export const clearUserInfo = () => {
  sessionStorage.removeItem('roleType');
  sessionStorage.removeItem('token');
};
