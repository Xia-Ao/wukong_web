/*
 * @Author: ao.xia 
 * @Date: 2019-09-22 16:34:32 
 * @Last Modified by: ao.xia
 * @Last Modified time: 2019-10-02 22:28:04
 */

import axios from "axios";
import {message} from "antd";

// 获取发布历史
export const getHistoryList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get('/branch/history_list', {params,})
      .then((res) => {
        if (res.status === 200 && res.data.success) {
          resolve(res.data.data);
        } else {
          message.error(res.data.message || '返回数据错误！');
        }
      }).catch((err) => {
      reject(err);
      message.error('请求数据错误！');
    });
  })
};

