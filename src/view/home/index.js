import React, {Component} from 'react';
import axios from 'axios';
import {message} from "antd";
import './index.less'


class DataCenter extends Component {
  constructor (porps) {
    super(porps);
    this.state = {
      mainData: [],

    }
  }

  componentDidMount () {
   
  }

 


  render () {
    const {mainData} = this.state;
    return <div className="home-wrapper">
      <div className="title">首页</div>
     
    </div>;
  }
}

export default DataCenter;
