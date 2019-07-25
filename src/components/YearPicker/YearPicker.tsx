import * as React from 'react';
import { DatePicker } from 'antd';
import * as moment from 'moment/moment';

const { useState } = React;

export interface Props {
    /**
     * 值
     */
    value: moment.Moment;
    /**
     * 变更值回调函数
     * @param value
     */
    onPanelChange: (value: moment.Moment | undefined) => void;

    /**
     * 其他额外属性
     */
    [propName: string]: any;
}

const YearPicker = (props: Props) => {
    const { value, onPanelChange, ...rest } = props;
    const [open, setOpen] = useState(false);
    return (
        <DatePicker
            open={open}
            value={value}
            onPanelChange={date => {
                onPanelChange(date);
                setOpen(false);
            }}
            mode="year"
            format="YYYY"
            onOpenChange={status => {
                setOpen(status);
            }}
            {...rest}
        />
    );
};

export default YearPicker;
