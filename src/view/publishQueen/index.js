import React, { PureComponent, Fragment } from 'react';
import { Table, Divider, Tag, Button, Popconfirm, Modal, message } from 'antd';


import { dateFormat } from '../../common/utils';
import { getList, yufaApi, onlineApi, mergeMasterApi } from './api';
import './index.less'

class PublishQueen extends PureComponent {
  constructor(porps) {
    super(porps);
    this.state = {
      tableData: [],
      params: {},
    }
  }

  columns = [
    {
      key: 'publishId',
      title: '发布计划ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      key: 'projectName',
      title: '所属项目',
      dataIndex: 'projectName',
      align: 'center',
    },
    {
      key: 'branch',
      title: '分支号',
      dataIndex: 'branch',
      align: 'center',
    },
    {
      key: 'planPublishTime',
      title: '计划发布时间',
      dataIndex: 'planPublishTime',
      align: 'center',
      render: time => time ? dateFormat(new Date(time).getTime(), 'yyyy-MM-dd') : '无',
    },
    {
      key: 'action',
      title: '操作',
      dataIndex: 'status',
      align: 'center',
      render: (status, record) => this.actionDom(record),
    },
  ];

  actionDom(branchInfo = {}) {
    const { yufa, published, mergedMaster } = branchInfo;
    let status = 0;
    if (yufa <= 0 && published <= 0 && mergedMaster <= 0) {
      status = 1;   // 待发布状态
    } else if (yufa === 1 && published <= 0 && mergedMaster <= 0) {
      status = 2;   // 预发布中
    } else if (yufa === 2 && published <= 0 && mergedMaster <= 0) {
      status = 3;   // 预发布完成，等待正式发布
    } else if (yufa === 2 && published === 1 && mergedMaster <= 0) {
      status = 4;   // 正式发布中
    } else if (yufa === 2 && published === 2 && mergedMaster <= 0) {
      status = 5;   // 正式发布完成 等待合并主干
    } else if (yufa === 2 && published === 2 && mergedMaster === 1) {
      status = 6;   // 合并主干完成
    }
    switch (status) {
      case 1:
        return <Button type="primary" onClick={() => this.yufa(branchInfo)}>预发布</Button>;
      case 2:
        return <Button type="primary" loading>预发布中</Button>;
      case 3:
        return <Button type="primary" onClick={() => this.publish(branchInfo)}>正式发布</Button>;
      case 4:
        return <Button type="primary" loading>正式发布中</Button>;
      case 5:
        return <Button type="primary" onClick={() => this.mergeMaster(branchInfo)}>合并主干</Button>;
      case 6:
        return <Button type="default" disabled>发布完成</Button>;
      default:
        return '';
    }
  }

  // 预发布
  yufa(branchInfo) {
    yufaApi(branchInfo).then((res) => {
      if (!res.success) {
        message.error(res.message || '操作失败');
        return;
      }
      this.init(branchInfo);
    })
  }

  // 正式发布
  publish(branchInfo) {
    onlineApi(branchInfo).then((res) => {
      if (!res.success) {
        message.error(res.message || '操作失败');
        return;
      }
      this.init(branchInfo);
    })
  }

  // 合并主干
  mergeMaster(branchInfo) {
    mergeMasterApi(branchInfo).then((res) => {
      if (!res.success) {
        message.error(res.message || '操作失败');
        return;
      }
      this.init(branchInfo);
    })
  }

  // 初始化获取数据
  init(params = {}) {
    // 获取列表数据
    getList(params).then((data) => {
      this.setState({
        tableData: [data],
      })
    })
  };

  componentDidMount() {
    const { query = {} } = this.props.location;
    const {params = {}} = this.state;
    if (query.branch) {
      this.setState({
        params: query
      }, () => {
        this.init(this.state.params);
      });
    } else if(params.branch) {
      this.init(params);
    } else {
      return;
    }
  }




  render() {
    const { tableData } = this.state;
    return <div className="publish-plan-wrapper">
      <div className="title">发布队列</div>
      <Divider />
      <Table columns={this.columns} dataSource={tableData} rowKey='id' size='default' />
    </div>;
  }
}

export default PublishQueen;
