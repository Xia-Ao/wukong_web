import axios from "axios";
import {message} from "antd";

/**
 * @author: xiaao
 * @data: 2019/5/2 16:19
 * @description:
 */

export const login = (params) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/Login/Login', params)
      .then((res) => {
        if (res.status === 200 && res.data && res.data.Result) {
          sessionStorage.setItem('token',res.data.Token);
          resolve(res.data);
        } else {
          reject(res);
          message.error('返回数据错误！');
        }
      }).catch((err) => {
      reject(err);
      message.error('请求数据错误！');
    });
  })
};


export const menuApi = () => {
  return new Promise((resolve, reject) => {
    axios.post('/api/Login/getUserFun',{})
      .then((res) => {
        if (res.status === 200 && res.data && res.data.Result) {
          resolve(res.data);
        } else {
          reject(res);
          message.error('返回数据错误！');
        }
      }).catch((err) => {
      reject(err);
      message.error('请求数据错误！');
    });
  })
};
