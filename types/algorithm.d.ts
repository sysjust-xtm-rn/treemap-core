export declare function getRatioBiggerThanOne(num: number): number;
export declare function getLayerRatioSum(layerArea: number, layerHeight: number, datas: NodeValue[]): number;
export declare function getTree(ratio: number, values: number[]): TreeNode | undefined;
export declare type NodeValue = {
    value: number;
    key: number;
};
export declare type TreeNode = {
    next?: TreeNode;
} & NodeValue[];
