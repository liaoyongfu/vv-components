import React, { ReactNode, Fragment } from 'react';
import { Props, Edge } from './interface';

const FlowChart = (props: Props) => {
    const { edges, nodes, sourceKey, targetKey, renderNode } = props;
    const render = (edge: Edge): ReactNode => {
        const find = edges.filter(item => item[sourceKey] === edge[targetKey]);
        if (find.length === 0) return null;
        return (
            <Fragment>
                <div>{renderNode(edge, nodes)}</div>
                {find.map(item => (
                    <div key={item.id}>{render(item)}</div>
                ))}
            </Fragment>
        );
    };
    return <div>{edges[0] && render(edges[0])}</div>;
};

FlowChart.defaultProps = {
    edges: [],
    nodes: [],
    sourceKey: 'sourceRef',
    targetKey: 'targetRef',
    conditionKey: 'conditionExpression'
};

export default FlowChart;
