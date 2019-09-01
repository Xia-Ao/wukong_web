import React, {PureComponent, Fragment} from 'react'
import {Layout, Menu, Dropdown, Icon, message} from 'antd';
import {NavLink, Route, Redirect, Switch} from 'react-router-dom';
import Bread from './bread';
import {clearUserInfo} from '../../common/auth';
import './layout.less'

const {Header, Sider, Content, Footer} = Layout;
const {SubMenu} = Menu;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_569607_4bodp9kntpi.js',
});


class HomeLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      sliderMenu: [],
      routerContent: [],
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  // 个人信息下拉框
  //
  personMenu = (
    <Menu>
      <Menu.Item key="1">
        <NavLink to='/index/personInfo'>
          <span>个人资料</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <span onClick={() => {
          this.loginOut()
        }}>退出</span>
      </Menu.Item>
    </Menu>
  );


  loginOut = () => {
    try {
      clearUserInfo();
      message.warning('成功退出');
      this.props.history.push('/login');
    } catch (e) {
      message.warning('退出发生错误');
    }
  };

  /**
   * 初始化菜单路由
   */
  initRouter() {
    import('../../router.config.js').then(module => {
      // 侧边栏内容
      const {router = []} = module;
      const sliderMenu = router.map((route) => {
        if (route.slideLeft) {
          if (!route.children) {
            return (
              <Menu.Item key={route.path}>
                <NavLink to={route.path}>
                  <IconFont type={route.icon} />
                  <span>{route.name}</span>
                </NavLink>
              </Menu.Item>)
          } else {
            return (
              <SubMenu key={route.path}
                title={<span><IconFont type={route.icon} />
                  <span>{route.name}</span></span>}>
                {route.children.map((child) => {
                  if (child.slideLeft) {
                    return <Menu.Item key={child.path}>
                      <NavLink to={child.path}>
                        <IconFont type={child.icon} />
                        <span>{child.name}</span>
                      </NavLink>
                    </Menu.Item>
                  }
                })}
              </SubMenu>
            )
          }
        }
      }
      );
      // router内容
      const routerContent = router.map((item) => {
        if (!item.children) {
          return <Route key={item.key} path={item.path} component={item.component} />
        } else {
          return item.children.map((child => (
            <Route key={child.path} path={child.path} component={child.component} />
          )))
        }
      }
      );
      this.setState({
        sliderMenu,
        routerContent,
      })
    });
  }

  componentWillMount() {
    this.initRouter();
  }


  render() {
    const pathname = this.props.location.pathname;
    const propPath = pathname.replace(/\/\w*$/, '');
    const {collapsed, sliderMenu, routerContent} = this.state;
    return <Fragment>
      <Layout style={{height: '100vh'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width='300'
          breakpoint="lg"
          onBreakpoint={() => {
            this.setState({
              collapsed: false,
            });
          }}
          onCollapse={() => {
            this.setState({
              collapsed: true,
            });
          }}
        >
          <div className="logoWrapper">
            {!collapsed && <span>wukong</span>}
          </div>
          <Menu
            defaultOpenKeys={[propPath]}
            selectedKeys={[pathname]}
            mode="inline"
            theme="dark"
          >
            {/* 侧边栏*/}
            {sliderMenu}
          </Menu>

        </Sider>
        <Layout>
          <Header className='header'>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            {/* 个人下拉框 */}
            <span className='person-info' onClick={() => {
              this.loginOut()
            }}>退出</span>

            <Dropdown overlay={this.personMenu} className='person-info'>
              <a className="ant-dropdown-link">
                用户名 <Icon type="down" />
              </a>
            </Dropdown>

          </Header>
          {/* 面包屑*/}
          <Bread></Bread>
          {/* 正文内容*/}
          <Content className='main-content'>
            <Switch>
              <Redirect exact from='/index' to='/index/home' />
              {routerContent}
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Fragment>
  }
}

export default HomeLayout;
