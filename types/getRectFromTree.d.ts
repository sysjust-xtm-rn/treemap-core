import { TreeNode } from './algorithm';
export declare function getRectFromTree(width: number, height: number, tree: TreeNode | undefined): TreeMapRect[];
export declare type TreeMapRect = {
    top: number;
    left: number;
    width: number;
    height: number;
    key: number;
};
