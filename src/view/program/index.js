import React, { PureComponent, Fragment } from 'react';
import { Table, Divider, Tag, Button, Popconfirm, Modal, message } from 'antd';

import AddOrEditForm from './AddOrEditForm';

import { dateFormat } from '../../common/utils';
import {getList}  from './api';
import './index.less'

class DataCenter extends PureComponent {
  constructor(porps) {
    super(porps);
    this.state = {
      tableData: [],
      createDialogShow: false,
      pagination: {
        showSizeChanger: true,
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `总条数${total}`,
        onChange: null,
        onShowSizeChange: null
      },
      record: {},
      searchKey: '',
      filterFormParams: {}, // 暂存过滤器数据
    }
  }

  columns = [
    {
      key: 'projectKey',
      title: '应用标识符Key',
      dataIndex: 'projectKey',
      align: 'center',
    },
    {
      key: 'projectName',
      title: '应用名称',
      dataIndex: 'projectName',
      align: 'center',
    },
    {
      key: 'repository',
      title: '应用仓库地址',
      dataIndex: 'repository',
      align: 'center',
    },
    {
      key: 'createTime',
      title: '应用创建时间',
      dataIndex: 'createTime',
      align: 'center',
      render: time => dateFormat(new Date(time).getTime(), 'yyyy-MM-dd hh:mm:ss')
    },
    {
      key: 'action',
      title: '操作',
      align: 'center',
      width: 140,
      fixed: 'right',
      render: (text, record) => {
        return (
          <div className="">
            <Button type="primary" size="small" onClick={() => this.showCreateDialog(record)}>修改</Button>
          </div>)
      },
    },
  ];

  showCreateDialog = (record = {}) => {
    this.setState({
      createDialogShow: true,
      record,
    });
  };

  modalCancel = (flag = false) => {
    this.setState({
      createDialogShow: false,
    });
    flag && this.init();
  };

  // 初始化获取数据
  init(params = {}) {
    const { pagination, searchKey } = this.state;
    params.pageIndex = params.pageIndex || pagination.current;
    params.pageSize = params.pageSize || pagination.pageSize;
    pagination.current = params.pageIndex;
    pagination.pageSize = params.pageSize;
    // 获取列表数据
    getList(params).then((data) => {
      pagination.total = data.total;
      this.setState({
        tableData: data.list,
        pagination,
        searchKey: params.key,
      })
    })
  };

  componentDidMount() {
    this.init();
  }


  render() {
    const {tableData, pagination, createDialogShow, record } = this.state;
    return <Fragment>
      <div className="publish-plan-wrapper">
        <div className="title">应用列表</div>
        <Button type="primary" className='marginTop20' onClick={this.showCreateDialog}>接入新应用</Button>
        <Divider/>
        <Table columns={this.columns} dataSource={tableData} pagination={pagination} rowKey='projectKey' size='default'/>


        <Modal title={!record.projectKey ? '创建应用' : '修改应用'}
          visible={createDialogShow}
          onCancel={this.modalCancel}
          footer={null}
          destroyOnClose
        >
          <AddOrEditForm data={{ record, modalCancel: this.modalCancel.bind(this) }} />
        </Modal>
      </div>
    </Fragment>;
  }
}

export default DataCenter;
