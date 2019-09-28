/*
 * @Author: ao.xia 
 * @Date: 2019-09-22 16:34:32 
 * @Last Modified by: ao.xia
 * @Last Modified time: 2019-09-24 23:32:41
 */

import axios from "axios";
import {message} from "antd";


// 获取列表
export const getList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get('/project/project_list', params)
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

// 添加设备
export const addProject = (params) => {
  return new Promise((resolve, reject) => {
    axios.post('/project/create_project', params)
      .then((res) => {
        if (res.status === 200 && res.data) {
          resolve(res.data);
        } else {
           message.error(res.data.message || '返回数据错误！');
        }
      }).catch((err) => {
      reject(err);
      message.error('请求数据错误！');
    });
  })
};


// 修改设备
export const editProject = (params) => {
  return new Promise((resolve, reject) => {
    axios.post('/project/create_project', params)
      .then((res) => {
        if (res.status === 200 && res.data) {
          resolve(res.data);
        } else {
           message.error(res.data.message || '返回数据错误！');
        }
      }).catch((err) => {
      reject(err);
      message.error('请求数据错误！');
    });
  })
};