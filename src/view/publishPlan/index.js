import React, {PureComponent} from 'react';
import {Table, Divider, Tag, Button, Popconfirm, Modal, message} from 'antd';

import CreateForm from './createForm';

import {dateFormat} from '../../common/utils';
import ajax from '../../common/ajax';
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
      key: 'publishId',
      title: '发布计划ID',
      dataIndex: 'publishId',
      align: 'center',
    },
    {
      key: 'project',
      title: '所属项目',
      dataIndex: 'project',
      align: 'center',
    },
    {
      key: 'branch',
      title: '分支号',
      dataIndex: 'branch',
      align: 'center',
    },
    {
      key: 'yufaStatus',
      title: '预发布',
      dataIndex: 'yufaStatus',
      align: 'center',
      render: status => (
        <Tag className='aTagNone' color={status ? 'green' : 'red'}>{!status ? '未发布' : '已发布'}</Tag>
      ),
    },
    {
      key: 'publishStatus',
      title: '正式发布',
      dataIndex: 'publishStatus',
      align: 'center',
      render: status => (
        <Tag className='aTagNone' color={status ? 'green' : 'red'}>{!status ? '未发布' : '已发布'}</Tag>
      ),
    },
    {
      key: 'publishTime',
      title: '正式发布时间',
      dataIndex: 'publishTime',
      align: 'center',
      render: time => dateFormat(new Date(time))
    },
    {
      key: 'mergeMaster',
      title: '合并主干',
      dataIndex: 'mergeMaster',
      align: 'center',
      render: status => (
        <Tag className='aTagNone' color={status ? 'green' : 'red'}>{!status ? '未合并' : '已合并'}</Tag>
      ),
    },
  ];

  showCreateDialog = () => {
    this.setState({
      createDialogShow: true,
      // record
    });
  };

  modalCancel = (flag = false) => {
    this.setState({
      createDialogShow: false,
    });
  };

  // 初始化获取数据
  init (params = {}) {
    const {pagination, searchKey} = this.state;
    params.pageIndex = params.pageIndex || pagination.current;
    params.pageSize = params.pageSize || pagination.pageSize;
    pagination.current = params.pageIndex;
    pagination.pageSize = params.pageSize;
    // 获取列表数据
    ajax(params).then((data) => {
      pagination.total = data.total;
      this.setState({
        tableData: data.InnerData,
        pagination,
        searchKey: params.key,
      })
    })
  };

  componentDidMount() {

  }


  render() {
    const {mainData, createDialogShow} = this.state;
    return <div className="publish-plan-wrapper">
      <div className="title">发布计划</div>
      <Button type="primary" className='marginTop20' onClick={this.showCreateDialog}>创建发布计划</Button>

      <Modal title={'新建发布计划'}
             visible={createDialogShow}
             onCancel={this.modalCancel}
             footer={null}
             destroyOnClose
      >
        <CreateForm />
      </Modal>
    </div>;
  }
}

export default DataCenter;
