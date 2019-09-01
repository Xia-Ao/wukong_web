import axios from "axios";
import {message} from "antd";

const ajax = ({url = '', params = {}} = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then((res) => {
                if (res.status === 200 && res.data) {
                    resolve(res.data);
                } else {
                    message.error('返回数据错误！');
                }
            }).catch((err) => {
                reject(err);
                message.error('请求数据错误！');
            });
    })
};

export default ajax;