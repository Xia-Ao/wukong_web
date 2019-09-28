/*
 * @Author: ao.xia 
 * @Date: 2019-09-22 16:34:32 
 * @Last Modified by: ao.xia
 * @Last Modified time: 2019-09-24 13:41:58
 */

import axios from "axios";
import {message} from "antd";


// 获取列表
export const getList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get('/branch/list', {params,})
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

// 获取发布历史
export const getHistoryList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get('/branch/history_list', params)
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

// 创建发布计划
export const addPlan = (params) => {
  return new Promise((resolve, reject) => {
    axios.post('/branch/create_branch', params)
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

// 修改发布计划
export const editPlan = (params) => {
  return new Promise((resolve, reject) => {
    axios.post('/branch/edit_branch', params)
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


// 预发布
export const yufaApi = (params) => {
  return new Promise((resolve, reject) => {
    axios.post('/project/yufa', params)
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

// 正式发布
export const onlineApi = (params) => {
  return new Promise((resolve, reject) => {
    axios.post('/project/publish', params)
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

// 合并主干
export const mergeMasterApi = (params) => {
  return new Promise((resolve, reject) => {
    axios.post('/project/merge_master', params)
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
