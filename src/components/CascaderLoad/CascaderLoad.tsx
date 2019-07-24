import * as React from 'react';
import { Cascader } from 'antd';

const china: { [key: string]: any } = {
    id: 0,
    parentId: 0,
    parentName: '',
    code: 'asian',
    dictKey: 'china',
    dictName: '中国',
    sort: 1,
    isLeaf: false,
    remark: ''
};
export interface ParamType {
    code: string;
    parentId: number;
}
export interface Props {
    onChange: (e: string[]) => void;
    /**
     * 默认值
     */
    value: string[];
    /**
     * cascader组件配置项
     */
    cascaderProps: object;
    /**
     * 国家数据字典
     */
    asianData: Array<{ [key: string]: any }>;
    /**
     * 获取字典数据的请求方法
     */
    getData: (param: ParamType) => Promise<Array<any>>;
}
/**
 * 联级选择器
 *
 */
const CascaderLoad = (props: Props) => {
    const { onChange, value, cascaderProps, asianData, getData } = props;
    const [options, setOptions] = React.useState([]);

    const handleChange = e => {
        onChange(e);
    };
    const loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        let codeTmp: string = '';
        let isLeaf = false;
        const { code } = targetOption;
        switch (code) {
            case 'asian':
                codeTmp = 'province';
                break;
            case 'province':
                codeTmp = 'city';
                break;
            case 'city':
                codeTmp = 'area';
                isLeaf = true;
                break;
            default:
                codeTmp = '';
                isLeaf = false;
        }
        getData({
            code: codeTmp,
            parentId: codeTmp === 'province' ? null : targetOption.id
        }).then(data => {
            targetOption.children = data.map(item => ({
                ...item,
                isLeaf
            }));
            targetOption.loading = false;
            setOptions([...options]);
        });
    };
    React.useEffect(() => {
        setOptions([china].concat(asianData) || [china]);
    }, [asianData]);
    return (
        <Cascader
            value={value}
            fieldNames={{ label: 'dictName', value: 'dictName' }}
            options={options}
            onChange={handleChange}
            changeOnSelect
            loadData={loadData}
            {...cascaderProps}
        />
    );
};
export default CascaderLoad;
