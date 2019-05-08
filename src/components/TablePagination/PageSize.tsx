import * as React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface ItemInterface {
    value: number;
    label: string;
}

interface Props {
    data: [ItemInterface];
    value?: number;
    onChange?: (value: number) => void;
}

const PageSize = ({ data, value, onChange }: Props) => (
    <Select
        onChange={onChange}
        value={value}
        style={{ width: 90, marginLeft: 8 }}
    >
        {data.map(item => (
            <Option key={item.value} value={item.value}>
                {item.label}
            </Option>
        ))}
    </Select>
);

PageSize.defaultProps = {
    data: [
        {
            value: 10,
            label: '10'
        },
        {
            value: 20,
            label: '20'
        },
        {
            value: 50,
            label: '50'
        },
        {
            value: 100,
            label: '100'
        },
        {
            value: 200,
            label: '200'
        }
    ],
    value: 10
};

export default PageSize;
