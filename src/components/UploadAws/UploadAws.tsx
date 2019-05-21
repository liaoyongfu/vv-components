import * as React from 'react';
import { Upload, message, notification } from 'antd';
import fetch from 'isomorphic-fetch';
import { UploadFile } from 'antd/lib/upload/interface';

export interface Props {
    fileList: Array<any>;
    categoryCode: string;
    checkFileType: string;
    checkFileSize: number;
    sysCode: string;
    businessCode: string;
    uploadUrl: string;
    uploadResource: {
        categoryCode?: string;
        keyNameAndOpt?: Array<string>;
    } | null;
    setFileList: (Array, Object) => void;
}

const codeMessage: { [key: number]: string } = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};

const checkStatus = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
        message: `请求错误 ${response.status}: ${response.url}`,
        description: errortext
    });
    const error: any = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
};

function request(url: string, option: any) {
    const defaultOptions = {
        credentials: 'include'
    };
    const newOptions = { ...defaultOptions, ...option };
    if (
        newOptions.method === 'POST' ||
        newOptions.method === 'PUT' ||
        newOptions.method === 'DELETE'
    ) {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                ...newOptions.headers
            };
        }
    }
    return fetch(url, newOptions)
        .then(checkStatus)
        .then((response: Response) => {
            // DELETE and 204 do not return data by default
            // using .json will report an error.
            if (newOptions.method === 'DELETE' || response.status === 204) {
                return response.text();
            }
            return response.json();
        });
}

// 上传至服务器
function uploadToServer(params: { preUrl: string; file: File }) {
    const uploadFileType = params.file.type;
    const defaultOptions: any = { method: 'PUT', mode: 'cors' };
    if (!uploadFileType.startsWith('image')) {
        const formData = new FormData();
        formData.append('file', params.file);
        defaultOptions.headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        };
        defaultOptions.body = formData;
    } else {
        defaultOptions.headers = {
            Accept: 'application/json'
        };
        defaultOptions.body = params.file;
    }
    return fetch(params.preUrl, defaultOptions)
        .then(response => response)
        .catch(e => e);
}

class UploadAws extends React.PureComponent<Props, any> {
    static defaultProps = {
        fileList: [],
        categoryCode: '',
        checkFileType: '',
        checkFileSize: 0,
        sysCode: '',
        businessCode: '',
        uploadUrl: '',
        uploadResource: null,
        setFileList: () => {}
    };

    // 校验上传文件类型
    checkUpload = (file: File, fileList: Array<File>) => {
        const { checkFileType = '', checkFileSize = 0 } = this.props;

        if (checkFileType.length > 0) {
            const fileType = file.type.substr(file.type.indexOf('/') + 1);
            if (!checkFileType.toLocaleLowerCase().includes(fileType)) {
                message.error(`You can only upload ${checkFileType}`);
                fileList.splice(fileList.indexOf(file), 1);
                return false;
            }
        }

        if (checkFileSize > 0) {
            const isLess = file.size / 1024 / 1024 < checkFileSize;
            if (!isLess) {
                message.error(`File must smaller than ${checkFileSize}MB!`);
                fileList.splice(fileList.indexOf(file), 1);
                return false;
            }
        }
        return true;
    };

    // 上传
    customUpload = async (file: UploadFile) => {
        const { sysCode, businessCode, uploadUrl } = this.props;
        const params = {
            sysCode,
            businessCode,
            fileNames: [file.name],
            file
        };
        // 获取预签名路径
        const response = await request(uploadUrl, {
            method: 'POST',
            body: params
        });

        // 返回内容
        if (response.data && response.data.length > 0) {
            const { keyName, preUrl, fileUrl } = response.data[0];
            const uploadParams = { preUrl, file: file.originFileObj };
            // 上传至服务器
            uploadToServer(uploadParams);

            const uploadObj = {
                keyName: `ADD:${keyName}`,
                url: fileUrl
            };
            const fileChange = { ...file, ...uploadObj };
            Object.assign(file, fileChange);
        }
    };

    // 删除文件
    removeUpload = (file: any) => {
        const {
            setFileList,
            fileList: showFileList,
            categoryCode,
            uploadResource
        } = this.props;
        const showFileListCopy = showFileList.slice(); // 获取数组的副本
        const { keyName } = file;

        let keyNameAndOptListCopy = [];
        if (uploadResource) {
            const { keyNameAndOpt: keyNameAndOptList } = uploadResource;
            keyNameAndOptListCopy = [...keyNameAndOptList];
        }

        let keyNameAndOptListResult = [];

        if (keyName.startsWith('ADD:')) {
            keyNameAndOptListResult = keyNameAndOptListCopy
                .map(item => {
                    if (item === keyName) {
                        return null;
                    }
                    return item;
                })
                .filter(item => item);
        } else if (
            !keyName.startsWith('DELETE:') &&
            !keyName.startsWith('ADD:')
        ) {
            keyNameAndOptListResult = [
                ...keyNameAndOptListCopy,
                `DELETE:${keyName}`
            ];
        }

        const showFileListResult = showFileListCopy.filter(
            item => !(item.keyName === keyName)
        );
        const uploadResourceResult = {
            categoryCode,
            keyNameAndOpt: keyNameAndOptListResult
        };
        // 回调
        setFileList(showFileListResult, uploadResourceResult);
    };

    changeUpload = changeInfo => {
        const { setFileList, categoryCode, uploadResource } = this.props;
        const fileListCopy = [...changeInfo.fileList];
        const fileKeyNameList: Array<string> = fileListCopy
            .map(item => {
                if (
                    item.keyName.startsWith('ADD:') ||
                    item.keyName.startsWith('DELETE:')
                ) {
                    return item.keyName;
                }
                return null;
            })
            .filter(item => item);

        let keyNameAndOptListCopy: Array<string> = [];
        if (uploadResource) {
            const { keyNameAndOpt: keyNameAndOptList } = uploadResource;
            keyNameAndOptListCopy = [
                ...new Set([...keyNameAndOptList, ...fileKeyNameList])
            ];
        } else {
            keyNameAndOptListCopy = [...new Set([...fileKeyNameList])];
        }
        const uploadResourceResult = {
            categoryCode,
            keyNameAndOpt: keyNameAndOptListCopy
        };
        setFileList(fileListCopy, uploadResourceResult);
    };

    render() {
        const { children } = this.props;
        return (
            <Upload
                action={this.customUpload}
                beforeUpload={this.checkUpload}
                onRemove={this.removeUpload}
                onChange={this.changeUpload}
                {...this.props}
            >
                {children}
            </Upload>
        );
    }
}

export default UploadAws;
