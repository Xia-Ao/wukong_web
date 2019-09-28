import React, { PureComponent } from 'react'
import {
  Form, Icon, Input, Button, message
} from 'antd';
import {addProject, editProject } from "./api";



function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class AddOrEditForm extends PureComponent {
  constructor(props) {
    super(props)
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const {record, modalCancel} = this.props.data;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (record.$id) {
          // 修改
          editProject(values).then((res) => {
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
          addProject(values).then((res) => {
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

  render() {
    const { record, modalCancel } = this.props.data;
    const { getFieldDecorator, resetFields } = this.props.form;

    return <Form layout="vertical" onSubmit={this.handleSubmit} >
      <Form.Item label='应用名称'>
        {getFieldDecorator('projectName', {
          rules: [{
            required: true,
            message: '请输入应用名称'
          }],
        })(
          <Input placeholder="请输入应用名称" />
        )}
      </Form.Item>
      <Form.Item label='应用标识key'>
        {getFieldDecorator('projectKey', {
          rules: [{ required: true, message: '请输入设备应用标识key' }],
        })(
          <Input placeholder="请输入设备应用标识key" />
        )}
      </Form.Item>
      <Form.Item label='代码路径'>
        {getFieldDecorator('sourcePath', {
          rules: [{ required: true, message: '请输入代码路径'}],
        })(
          <Input placeholder="请输入代码路径" />
        )}
      </Form.Item>
      <Form.Item label='预发环境路径'>
        {getFieldDecorator('yufaPath', {
          rules: [{ required: true, message: '请输入预发环境路径'}],
        })(
          <Input placeholder="请输入预发环境路径" />
        )}
      </Form.Item>
      <Form.Item label='线上环境路径'>
        {getFieldDecorator('onlinePath', {
          rules: [{ required: true, message: '请输入线上环境路径'}],
        })(
          <Input placeholder="请输入线上环境路径" />
        )}
      </Form.Item>
      <Form.Item label='代码仓库地址'>
        {getFieldDecorator('repository', {
          rules: [{ required: true, message: '请输入代码仓库地址'}],
        })(
          <Input placeholder="请输入代码仓库地址" />
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

export default Form.create({ name: 'deviceFilter' })(AddOrEditForm)
