import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {Breadcrumb} from "antd";


class Bread extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      path: [],
    };
  }
  componentDidMount () {
    import('../../router.config.js').then(module => {
      const {router = []} = module;
      this.setState({
        path : this.breadChange(router),
      })
      console.log(this.breadChange(router));
    });
  }

  // 匹配路由对应的面包屑名称
  breadChange = (router = []) => {
    let temp = [];
    let pathname = this.props.location.pathname;
    let pathArr = pathname.split('/');
    pathArr.shift();
    if (pathArr.length === 2) {
      router.forEach(item => {
        item.path === pathname && temp.push(item.name)
      })
    } else if (pathArr.length === 3) {
      router.forEach(item => {
        if (item.key === pathArr[1]) {
          temp.push(item.name);
          item.children.forEach(child => {
            child.path === pathname && temp.push(child.name)
          })
        }
      })
    } else {
      temp = []
    }
    return temp
  };


  render () {
    const {path} = this.state;
    return <Breadcrumb style={{margin: '24px 16px 0'}}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      {path.map(name => <Breadcrumb.Item key={name}>{name}</Breadcrumb.Item>)}
    </Breadcrumb>;
  }

}

export default withRouter(Bread);
