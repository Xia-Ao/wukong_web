import React, {PureComponent, Fragment} from 'react';
import {Menu, Icon, Row, Col, Form} from 'antd';
import Registry from './registry';
import UserLogin from './userLogin'
import {login, menuApi} from './api';
import './index.less'

import {roleTypeStorage} from "../../common/auth";


class Login extends PureComponent {
  constructor() {
    super();
    this.state = {
      showForm: 'login',
    }
  }


  handleClick = (e) => {
    this.setState({
      showForm: e.key,
    });
  };

  /**
   * 用户登录
   * @param {Object} values
   */
  loginSubmit(values) {
    login(values).then((data) => {
      this.props.tokenInit(data);
      roleTypeStorage.set(data.RoleId || 0);
      this.fetchMenuList();
    });
  };


  // 获取菜单
  fetchMenuList() {
    menuApi().then(res => {
      this.props.history.push('/index');
    }).catch(e => {

    });
  };

  render() {
    const {showForm} = this.state;
    const formClassName = showForm === 'admin' ? 'form-show' : 'form-hide';
    return <div className="login-bg">
      <div className="login-wrapper">
        <div className="login-header">
          <span className="title">wukong</span>
        </div>
        <Menu style={{textAlign: 'center', marginBottom: '20px'}}
          onClick={this.handleClick}
          selectedKeys={[showForm]}
          mode="horizontal"
        >

          <Menu.Item key="admin" className='form-item'>
            <Icon type="user" />用户登录
          </Menu.Item>
          {/* <Menu.Item key="business" className='form-item'>
            <Icon type="team" />用户注册
          </Menu.Item> */}
        </Menu>
        {/* {showForm === 'register' ? (<Registry/>) : (<UserLogin/>)} */}
        {/* <Registry data={{showForm, history: this.props.history}}/> */}
        <UserLogin data={{showForm, loginSubmit: this.loginSubmit.bind(this)}} />

      </div>
    </div>
  }
}


export default Login
