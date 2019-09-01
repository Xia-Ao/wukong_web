import React, {PureComponent} from 'react'
import {
  Form, Icon, Input, Button,
} from 'antd';

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class FilterForm extends PureComponent {
  constructor (props) {
    super(props)
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.key = values.key || '';
        this.props.submitForm(values);
      }
    });
  };

  render () {
    const {getFieldDecorator, resetFields} = this.props.form;

    return <Form layout="inline" onSubmit={this.handleSubmit}>
      <Form.Item label='关键字'>
        {getFieldDecorator('key', {
          rules: [{required: false,}],
        })(
          <Input placeholder="设备编号或者商家"/>
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className='marginRight10'><Icon type="search"/>查询</Button>
        <Button onClick={()=>resetFields()}><Icon type="close"/>清除</Button>
      </Form.Item>
    </Form>;
  }
}

export default Form.create({name: 'deviceFilter'})(FilterForm)
