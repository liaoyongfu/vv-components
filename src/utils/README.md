## deepTrim(obj)

递归对象，并去除里面所有字符串属性的前后空格。

````html
// 返回去空格后的对象
const result = deepTrim(obj);
````

## useList(fetchList, initPagination)

列表数据和分页自定义 hook。内置 `data` 和 `pagination` 处理逻辑。

````html
import { utils } from 'vv-frontend-components';

const { useList } = utils;

const MyComponent = props => {
    const fetchList = (current, pageSize) => {
        // 必须返回一个带以下结构的 Promise
        // { data: [], pagination: { current, pageSize, total } }
    };
    const { data, pagination, setPagination } = useList(fetchList);
    
    return (
        ...
    );
};
````