import * as React from 'react';
import PageSize from "./PageSize";

export interface Props {
    /**
     * 总数
     * @default 0
     */
    total?: number;
    /**
     * 每页条数
     * @default 10
     */
    pageSize?: number;
    /**
     * 改变 pageSize 时
     * @param value 改变后 pageSize 的值
     */
    onChange?: (value: number) => void;
}

const TablePagination = ({total = 0, pageSize = 10, onChange}: Props) => {
    return (
        <React.Fragment>
            {total} items
            <PageSize
                value={pageSize}
                onChange={onChange}
            />
        </React.Fragment>
    )
};

export default TablePagination;