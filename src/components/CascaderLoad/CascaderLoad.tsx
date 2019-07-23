import * as React from 'react';
import { Cascader } from 'antd';
import { RequestMethod } from 'umi-request';

const china: { [key: string]: number | string | false } = {
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
export interface Props {
    onChange: (e: any) => void;
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
     * 字典接口
     */
    dictUrl: string;
    /**
     * request方法
     */
    request: RequestMethod<false>;
}
/**
 * 联级选择器
 *
 */
const CascaderLoad = (props: Props) => {
    const {
        onChange,
        value,
        cascaderProps,
        asianData,
        dictUrl,
        request
    } = props;
    const [options, setOptions] = React.useState([]);

    const fetchDic = async param => {
        const result = await request(dictUrl, {
            method: 'POST',
            data: param
        });
        if (result && result.code === 10000 && result.data) {
            return result.data || [];
        }
        return [];
    };
    const handleChange = e => {
        onChange(e);
    };
    const loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        let codeTmp = null;
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
                codeTmp = null;
                isLeaf = false;
        }
        fetchDic({
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
