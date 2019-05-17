import * as React from 'react';
import { Form } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';

export interface Props {
    /**
     * 配置
     */
    config: Array<{
        /**
         * field 名称，不传的话直接渲染 component 字段
         */
        field: string;
        /**
         * Form.Item 的 props
         */
        props: object;
        /**
         * field 配置，即 getFieldDecorator 第二个参数
         */
        config?: object;
        /**
         * label 和 config 二选一
         */
        label?: string | React.ElementType;
        /**
         * field 渲染组件
         */
        component: React.ElementType;
    }>;
    /**
     * Form 注入的属性 form
     */
    form: {
        getFieldDecorator<T extends Object = {}>(
            id: keyof T,
            options?: GetFieldDecoratorOptions
        ): (node: React.ReactNode) => React.ReactNode;
    };
}

const QuickForm = ({ config, form }: Props) => {
    const { getFieldDecorator } = form;

    return config.map(item => (
        <Form.Item
            key={`${item.field}_${item.label}`}
            label={item.label}
            {...item.props}
        >
            {item.field
                ? getFieldDecorator(item.field, item.config)(item.component)
                : item.component}
        </Form.Item>
    ));
};

export default QuickForm;
