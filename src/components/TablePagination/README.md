基于 antd 的 Table 组件，带上了总数和每页数量。

````jsx harmony
<TablePagination total={100} pageSize={20} />
````

结合 antd 使用示例：

```jsx harmony
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';
import { TablePagination } from 'vv-frontend-components';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '20%',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}];

const Demo = props => {
    const initPagination = {
       current: 1,
       pageSize: 10
    };
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState(initPagination);
    const [loading, setLoading] = useState(false);
    
    const fetchList = () => {
        const { current, pageSize } = pagination;
        setLoading(true);
        
        reqwest({
          url: 'https://randomuser.me/api',
          method: 'get',
          data: {
            results: pageSize,
            page: current
          },
          type: 'json',
        }).then(response => {
            setData(response.results);
            setLoading(false);
        })
    };
    
    // 每当分页数或页数改变时均应该重新请求表格数据
    useEffect(() => {
        fetchList();
    }, [pagination]);
    
    return (
        <Table
          bordered
          columns={columns}
          loading={loading}
          dataSource={data}
          onChange={fetchList}
          pagination={{
            ...pagination,
            showTotal: total => (
                <TablePagination 
                    total={total}
                    pageSize={pagination.pageSize}
                    onChange={pageSize => setPagination({
                        pageSize,
                        current: 1  // 改变每页页数时应该页数应该充值为 1
                    })}
                />
            ),
          }}
        />
    )
};

<Demo />
```