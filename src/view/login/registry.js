/**
 * @author: xiaao
 * @data: 2019/4/2 20:07
 * @description:
 */

import React, {PureComponent} from 'react'
import {
  Form, Icon, Input, Button,
} from 'antd';


class Registry extends PureComponent {
  constructor (props) {
    super(props)
  }

  static formName = 'registry';

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (!err) {
        // this.props.data.history.push('/index');
      }
    });
  };


  render () {
    const {
      getFieldDecorator,
    } = this.props.form;
    const {showForm} = this.props.data;
    const formClassName = showForm === Registry.formName ? 'form-show' : 'form-hide';
    return <Form layout='horizontal' onSubmit={this.handleSubmit} className={`form-center ${formClassName}`}>
      < Form.Item>
        {getFieldDecorator('telephone', {
          rules: [{required: true, message: '请输入手机号!'}],
        })(
          <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="手机号"/>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{required: true, message: '请输入密码!'}],
        })(
          <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="密码"/>
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className='login-button'>登录</Button>
      </Form.Item>
    </Form>;
  }
}

export default Form.create()(Registry)
