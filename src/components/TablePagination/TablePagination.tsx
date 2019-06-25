import * as React from 'react';
import PageSize from './PageSize';

export interface Props {
    /**
     * 总数
     */
    total?: number;
    /**
     * 每页条数
     */
    pageSize?: number;
    /**
     * 改变 pageSize 时
     * @param value 改变后 pageSize 的值
     */
    onChange?: (value: number) => void;
    /**
     * items 的显示名称
     */
    itemsName?: string;
}

const TablePagination = ({ total, onChange, pageSize, itemsName }: Props) => (
    <React.Fragment>
        {total} {itemsName}
        <PageSize value={pageSize} onChange={onChange} />
    </React.Fragment>
);

TablePagination.defaultProps = {
    total: 0,
    pageSize: 10,
    itemsName: 'items'
};

export default TablePagination;
