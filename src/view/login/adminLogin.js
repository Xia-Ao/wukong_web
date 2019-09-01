/**
 * @author: xiaao
 * @data: 2019/4/2 20:07
 * @description:
 */

import React, {PureComponent} from 'react'
import {
  Form, Icon, Input, Button, message,
} from 'antd';
import {actionCreator} from './store';
import connect from 'react-redux/es/connect/connect';
import axios from "axios";
import {login} from './api';

class AdminLogin extends PureComponent {
  constructor (props) {
    super(props)
  }

  static formName = 'admin';

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {loginSubmit} = this.props.data;
        loginSubmit(values);
        // login(values).then((data) => {
        //   this.props.tokenInit(data);
        //   fetchMenuList();
        //   // this.props.data.history.push('/index');
        // });
      }
    });
  };


  render () {
    const {
      getFieldDecorator,
    } = this.props.form;
    const {showForm} = this.props.data;
    const formClassName = showForm === AdminLogin.formName ? 'form-show' : 'form-hide';
    return <Form layout='horizontal' onSubmit={this.handleSubmit} className={`form-center ${formClassName}`}>
      <Form.Item>
        {getFieldDecorator('UserName', {
          rules: [{required: true, message: '请输入用户名!'}],
        })(
          <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('Password', {
          rules: [
            {required: true, message: '请输入密码!'},
          ],
        })(
          <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="密码"/>
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className='login-button'>登录</Button>
      </Form.Item>
    </Form>;
  }
}


// const mapStateToProps = (state) => {
//   return {
//     token: state.global
//   }
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     tokenInit (data) {
//       dispatch(actionCreator.tokenInit(data));
//     }
//   }
// };


export default Form.create()(AdminLogin)
