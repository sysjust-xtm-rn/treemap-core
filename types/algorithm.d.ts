export declare function getTree(ratio: number, values: readonly number[]): TreeNode | undefined;
export declare function getRatioLessThanOne(num: number): number;
export declare function getLayerRatioSum(layerArea: number, layerHeight: number, datas: readonly NodeValue[]): number;
export declare type NodeValue = {
    value: number;
    key: number;
};
export declare type TreeNode = {
    next?: TreeNode;
} & NodeValue[];
