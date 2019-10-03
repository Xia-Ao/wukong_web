import React, { PureComponent, Fragment } from 'react';
import { Table, Divider, Tag, Button, Popconfirm, Modal, message } from 'antd';
import {withRouter} from "react-router-dom";


import { dateFormat } from '../../common/utils';
import { getHistoryList } from './api';
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
      key: 'publishedTime',
      title: '上线时间',
      dataIndex: 'publishedTime',
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
          return <Tag color={'grey'}>发布成功</Tag>
        }
      },
    },
    {
      key: 'action',
      title: '操作',
      dataIndex: 'status',
      align: 'center',
      render: (status, record) => (
        // <Fragment>
          <Button type="default" size="small" onClick={() => this.goPublishQuen(record)}>查看</Button>
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


  // 初始化获取数据
  init(params = {}) {
    const { pagination, searchKey } = this.state;
    params.page = params.page || pagination.current;
    params.pageSize = params.pageSize || pagination.pageSize;
    pagination.current = params.page;
    pagination.pageSize = params.pageSize;
    // 获取列表数据
    getHistoryList(params).then((data) => {
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
      <Divider />
      <Table columns={this.columns} dataSource={tableData} pagination={pagination} rowKey='id' size='default' />
    </div>;
  }
}

export default withRouter(PublishPlan);
