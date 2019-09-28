import React, { PureComponent, Fragment } from 'react';
import { Table, Divider, Tag, Button, Popconfirm, Modal, message } from 'antd';
import {withRouter} from "react-router-dom";

import AddOrEditForm from './AddOrEditForm';

import { dateFormat } from '../../common/utils';
import { getList } from './api';
import './index.less'

class PublishPlan extends PureComponent {
  constructor(porps) {
    super(porps);
    this.state = {
      tableData: [],
      addAndEditDialogShow: true,
      addAndEditDialogShow: false,
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
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: status => {
        if (status === 0) {
          return <Tag color={'red'}>未发布</Tag>
        } else if (status === 1) {
          return <Tag color={'green'}>发布中</Tag>
        } else if (status === 2) {
          return <Tag color={'grey'}>已发布</Tag>
        }
        // status === 0 && (<Tag color={'green'}>未发布</Tag>)
        // status === 1 && <Tag color={'green'}>发布中</Tag>
        // status === 2 && <Tag color={'green'}>已发布</Tag>
      },
    },
    {
      key: 'action',
      title: '操作',
      dataIndex: 'status',
      align: 'center',
      render: (status, record) => (
        // <Fragment>
          !status ? 
          <Button type="primary" size="small" className="marginRight10" onClick={() => this.goPublishQuen(record)}>去发布</Button>
          : <Button type="default" size="small">查看</Button>
        // </Fragment>
      ),
    },
  ];

  // 跳转发布队列
  goPublishQuen(record) {
    this.props.history.push({
      pathname: '/index/publish/queen',
      query: record || {}
    })
  }

  showDialog = () => {
    this.setState({
      addAndEditDialogShow: true,
      // record
    });
  };

  modalCancel = (flag = false) => {
    this.setState({
      addAndEditDialogShow: false,
    });
    flag && this.init();
  };

  // 初始化获取数据
  init(params = {}) {
    const { pagination, searchKey } = this.state;
    params.page = params.page || pagination.current;
    params.pageSize = params.pageSize || pagination.pageSize;
    pagination.current = params.page;
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

   componentDidMount () {
    let pagination = this.state.pagination;
    pagination.onChange = this.onPaginationChange.bind(this);
    pagination.onShowSizeChange = this.onPaginationChange.bind(this);
    this.setState({
      pagination,
    });
    this.init();
  }

  onPaginationChange (page, pageSize) {
    let {pagination} = this.state;
    pagination.current = page;
    pagination.pageSize = pageSize;
    this.init({page, pageSize});
    this.setState({
      pagination,
    })
  }
Ô


  render() {
    const { tableData,pagination, addAndEditDialogShow, record } = this.state;
    return <div className="publish-plan-wrapper">
      <div className="title">发布计划</div>
      <Button type="primary" className='marginTop20' onClick={this.showDialog}>创建发布计划</Button>
      <Divider />
      <Table columns={this.columns} dataSource={tableData} pagination={pagination} rowKey='id' size='default' />

      <Modal title={'新建发布计划'}
        visible={addAndEditDialogShow}
        onCancel={this.modalCancel}
        footer={null}
        destroyOnClose
      >
        <AddOrEditForm data={{record, modalCancel: this.modalCancel.bind(this)}} />
      </Modal>
    </div>;
  }
}

export default withRouter(PublishPlan);
