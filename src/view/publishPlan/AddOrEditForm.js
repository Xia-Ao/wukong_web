import React, { PureComponent } from 'react'
import {
  Form, Icon, Input, Button, message, DatePicker, Select,
} from 'antd';
import { addPlan, editPlan } from "./api";
import * as projectApi from '../program/api';
import {dateFormat} from '../../common/utils'

const Option = Select.Option;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class AddOrEditForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      projectOptions: [],
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { record, modalCancel } = this.props.data;
    this.props.form.validateFields((err, values) => {
      values.planPublishTime = dateFormat(new Date(values.planPublishTime).getTime(), 'yyyy-MM-dd');
      if (!err) {
        if (record.$id) {
          // 修改
          editPlan(values).then((res) => {
            if (res.Result) {
              message.success('操作成功！');
              modalCancel(true);
            } else {
              message.error('操作失败！');
              console.warn(res.Message);
            }
          });
        } else {
          // 新增
          addPlan(values).then((res) => {
            debugger;
            if (res.success) {
              message.success(res.message);
              modalCancel(true);
            } else {
              message.error('操作失败！');
              console.warn(res.message);
            }
          });
        }
      }
    });
  };

  /**
   * 学校下拉框搜索规则
   * @param value
   */
  projectOptionsInit = () => {
    projectApi.getList().then((data) => {
      this.setState({
        projectOptions: data.list.map(item => <Option key={item.projectKey}>{item.projectName}</Option>)
      })
    });
  };

  componentDidMount () {
    this.projectOptionsInit();
  };

  render() {
    console.log(this.props);
    const { record = {}, modalCancel } = this.props.data;
    const { getFieldDecorator, resetFields } = this.props.form;
    const { projectOptions } = this.state;

    return <Form layout="vertical" onSubmit={this.handleSubmit} >
      <Form.Item label='自定义分支名称'>
        {getFieldDecorator('branchName', {
          rules: [
            { required: false, message: '请输入自定义分支名称' }
          ],
        })(
          <Input placeholder="请输入自定义分支名称，可不填写" />
        )}
      </Form.Item>
      <Form.Item label="计划发布日期">
        {getFieldDecorator('planPublishTime', {
          rules: [{ type: 'object', required: true, message: '请选择计划发布日期!' }],
        })(
          <DatePicker/>
        )}
      </Form.Item>
      <Form.Item label='应用项目'>
        {getFieldDecorator('projectKey', {
          rules: [{ required: true, message: '请选择应用项目' }],
        })(
          <Select
            showSearch
            placeholder='请选择应用项目'
            defaultActiveFirstOption={false}
            filterOption={false}
          >
            {projectOptions}
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        {
          record.$id ?
            (<div className='edit-button'>
              <Button type="primary" htmlType="submit">修改</Button>
              <Button onClick={modalCancel}>取消</Button>
            </div>) :
            (<Button type="primary" block htmlType="submit">添加</Button>)
        }
      </Form.Item>
    </Form>;
  }
}

export default Form.create({ name: 'AddOrEditForm' })(AddOrEditForm)
