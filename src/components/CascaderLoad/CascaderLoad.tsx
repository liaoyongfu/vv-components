import * as React from 'react';
import { Cascader } from 'antd';
import request from '@/utils/request';

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
export interface Props {
    onChange: (e: any) => void;
    value: string[];
    cascaderProps: object;
    asianData: Array<any>;
}
/**
 * 联级选择器
 * 动态加载行政区域数据asian(国家) province(省份)，city(城市)，area(区)
 */
const CascaderLoad = React.forwardRef((props: Props, ref: any) => {
    const { onChange, value, cascaderProps, asianData } = props;
    const [options, setOptions] = React.useState([]);

    const fetchDic = async param => {
        const result = await request('/api/dict/v1/getList', {
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
        <div ref={ref}>
            <Cascader
                value={value}
                fieldNames={{ label: 'dictName', value: 'dictName' }}
                options={options}
                onChange={handleChange}
                changeOnSelect
                loadData={loadData}
                {...cascaderProps}
            />
        </div>
    );
});
export default CascaderLoad;
