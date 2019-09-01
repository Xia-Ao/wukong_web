import React, {PureComponent, Fragment} from 'react';
import {Menu, Icon, Row, Col, Form} from 'antd';
import BusinessLogin from './businessLogin';
import AdminLogin from './adminLogin'
import {login, menuApi} from './api';
import './login.less'
import * as actionCreator from "./store/actionCreator";
import connect from "react-redux/es/connect/connect";
import {roleTypeStorage} from "../../common/auth";


class Login extends PureComponent {
  constructor () {
    super();
    this.state = {
      showForm: 'admin',
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
  loginSubmit (values) {
    login(values).then((data) => {
      this.props.tokenInit(data);
      roleTypeStorage.set(data.RoleId || 0);
      this.fetchMenuList();
    });
  };


  // 获取菜单
  fetchMenuList () {
    menuApi().then(res => {
      this.props.history.push('/index');
      // let list = res.InnerData || [];
      // let router = [];
      // list.map((item, index) => {
      //   if (item.sf_pid === 0) {
      //     let temp = {
      //       key: 'dataCenter',
      //       icon: 'icon-shujuzhongxin',
      //       name: item.sf_name || '',
      //       path: '/index/home',
      //       slideLeft: item.sf_status,
      //       index: item.sf_orderby,
      //       component: DataCenter,
      //     };
      //     router.push()
      //   }
      // });
    }).catch(e => {

    });
  };

  render () {
    const {showForm} = this.state;
    const formClassName = showForm === 'admin' ? 'form-show' : 'form-hide';
    return <div className="login-bg">
      <div className="login-wrapper">
        <div className="login-header">
          <img src="http://img.youerheshui.com/logo.png" alt="" className="logo"/>
          <span className="title">之源饮水管理系统</span>
        </div>
        <Menu style={{textAlign: 'center', marginBottom: '20px'}}
              onClick={this.handleClick}
              selectedKeys={[showForm]}
              mode="horizontal"
        >
          {/*<Menu.Item key="business" className='form-item'>*/}
          {/*<Icon type="team"/>用户*/}
          {/*</Menu.Item>*/}

          <Menu.Item key="admin" className='form-item'>
            <Icon type="user"/>用户登录
          </Menu.Item>
        </Menu>
        {/*{showForm === 'business' ? (<BusinessLogin/>) : (<AdminLogin/>)}*/}
        {/*<BusinessLogin data={{showForm, history: this.props.history}}/>*/}
        <AdminLogin data={{showForm, loginSubmit: this.loginSubmit.bind(this)}}/>

      </div>
    </div>
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.global
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    tokenInit (data) {
      dispatch(actionCreator.tokenInit(data));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
// export default Login
