## CascaderLoad 地区数据联级选择器 自定义表单控件
> 封装 Cascader 组件 动态加载行政区域数据 asian (国家) province(省份)，city(城市)，area(区)

## 传入参数
- onChange：form onChange 事件
- value： 表单默认值
- cascaderProps：cascader 组件配置项
- asianData： 国家数据字典
- dictUrl：字典接口
- request： request 方法

```jsx static
   <Form>
        <Form.Item label="籍贯">
            {getFieldDecorator('nationalArea', {
                initialValue: []
                    })(
                <CascaderLoad
                      dictUrl='/api/dict/v1/getList'
                      request={request}
                      cascaderProps={{
                      placeholder: '请选择籍贯'
                          }}
                      asianData={asianMocks}
                      />
                )}
        </Form.Item>
  </Form>
```

```jsx harmony
import React from 'react';
import {
Form
} from 'antd';
import { CascaderLoad,utils } from 'vv-frontend-components';
const asianMocks= [
        {
            "id": 659007,
            "parentId": 0,
            "parentName": "",
            "code": "asian",
            "dictKey": 659007,
            "dictName": "Philippines",
            "sort": 1,
            "remark": ""
        },
        {
            "id": 659008,
            "parentId": 0,
            "parentName": "",
            "code": "asian",
            "dictKey": 659008,
            "dictName": "Cambodia",
            "sort": 2,
            "remark": ""
        },
        {
            "id": 659009,
            "parentId": 0,
            "parentName": "",
            "code": "asian",
            "dictKey": 659009,
            "dictName": "Lao People's Republic",
            "sort": 3,
            "remark": ""
        }]
const Demo =props=>{
    const {form:{getFieldDecorator}}=props
    const {request}=utils
    return(
           <Form>
                    <Form.Item label="籍贯">
                            {getFieldDecorator('nationalArea', {
                                    initialValue: []
                            })(
                                <CascaderLoad
                                 dictUrl='/api/dict/v1/getList'
                                 request={request}
                                 cascaderProps={{
                                    placeholder: '请选择籍贯'
                                 }}
                                 asianData={asianMocks}
                                />
                              )}
                    </Form.Item>
            </Form>
    )
}
const DemoUse = Form.create()(Demo);
<DemoUse/>
```