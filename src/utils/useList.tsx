import { useState, useEffect } from 'react';

export interface Pagination {
    current: number;
    pageSize: number;
    total: number;
}

export interface Response {
    data: [object];
    pagination: Pagination;
}

/**
 * 列表数据和分页自定义 hook
 * @param fetchList 获取数据的方法
 * @param initPagination 初始化分页信息
 */
export default function useList(
    fetchList: (current: number, pageSize: number) => Promise<Response>,
    initPagination: Pagination
) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState(initPagination);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetchList(
                pagination.current,
                pagination.pageSize
            );
            setLoading(false);
            setData(response.data);
            setPagination(response.pagination);
        };
        fetchData();
    }, [pagination.current, pagination.pageSize]);

    return {
        data,
        loading,
        pagination,
        setPagination,
        setData
    };
}
