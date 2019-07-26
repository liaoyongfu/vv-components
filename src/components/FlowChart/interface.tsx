import { ReactNode } from 'react';

export interface Edge {
    id: string;
    source: string;
    target: string;
    condition: string;
    [propName: string]: any;
}

export interface Node {
    id: string;
    name?: string;
    [propName: string]: any;
}

export interface Props {
    edges: [Edge];
    nodes: [Node];
    sourceKey: string;
    targetKey: string;
    conditionKey: string;
    renderNode: (edge: Edge, nodes: [Node]) => ReactNode;
}
