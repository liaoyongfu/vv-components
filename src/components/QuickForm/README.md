快捷生成 `Form.Item`：

````jsx harmony
import { Form, Input, Tooltip, Icon } from 'antd';
import React from 'react';
import { QuickForm } from 'vv-components';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

class Demo extends React.Component{
    get config(){
      return [
          {
              field: 'username',
              label: (
                 <span>
                   User Name
                   <Tooltip title="What do you want others to call you?">
                     <Icon type="question-circle-o" />
                   </Tooltip>
                 </span>
               ),
              config: {
                  required: true,
                  initialValue: ''
              },
              component: <Input />
          },
          {
              field: 'password',
              label: 'Password',
              config: {
                  initialValue: ''
              },
              component: <Input type="password" />
          }
     ]
    }
    render(){
        return (
            <Form layout="horizontal" {...formItemLayout}>
                <QuickForm
                    form={this.props.form}
                    config={this.config}
                />
            </Form>
        );
    }
};

Demo = Form.create()(Demo);

<Demo/>
````

> 不知道有没有其他更好的方式？