流程图组件。

````jsx harmony
import React from 'react';
import { FlowChart } from 'vv-frontend-components';

const process = {
     "id": "overTime",
     "name": "加班流程",
     "startEvent": {
         "id": "startEventId",
         "name": "所有员工",
         "formKey": "overTime"
     },
     "endEvent": {
         "id": "endEventId",
         "name": "endEventName"
     },
     "userTask": [
         {
             "id": "userTask1",
             "name": "部门主管",
             "candidateUsers": "${supervisor}"
         },
        {
             "id": "userTask2",
             "name": "上级部门主管",
             "candidateUsers": "${supervisor}"
         }
     ],
    "exclusiveGateway":[
        {
            "id":"exclusiveGateway1"
        }
    ],
    "serviceTask":[
        {
            "id":"serviceTask1",
            "name":"抄送人事专员,人事总监",
             "fieldExtensions":[
                 {
                     "fieldName":"copyToGroups",
                     "stringValue":"人事专员,人事总监"
                 }
             ]
        }
    ],
     "sequenceFlow": [
         {
             "id": "sequenceFlow1",
             "sourceRef": "startEventId",
             "targetRef": "userTask1"
         },
         {
             "id": "sequenceFlow2",
             "sourceRef": "userTask1",
             "targetRef": "exclusiveGateway1"
         },
        {
             "id": "sequenceFlow3",
             "sourceRef": "exclusiveGateway1",
             "targetRef": "serviceTask1",
            "conditionExpression":"${overTimeType=='工作日'}"
         },
        {
             "id": "sequenceFlow4",
             "sourceRef": "exclusiveGateway1",
             "targetRef": "userTask2",
            "conditionExpression":"${overTimeType!='工作日'}"
         },
        {
             "id": "sequenceFlow5",
             "sourceRef": "userTask2",
             "targetRef": "serviceTask1"
         },
         {
             "id": "sequenceFlow6",
             "sourceRef": "serviceTask1",
             "targetRef": "endEventId"
         }
     ]
};

const Demo = () => {
    return (
        <FlowChart 
            edges={process.sequenceFlow}
            nodes={[
                process.startEvent,
                process.endEvent,
                ...process.userTask,
                ...process.serviceTask
            ]}
            renderNode={(edge, nodes) => {
                const findNode = nodes.find(item => item.id === edge.sourceRef);
                
                return (findNode && findNode.name) || edge.conditionExpression
            }}
        />
    )
};

<Demo />
````