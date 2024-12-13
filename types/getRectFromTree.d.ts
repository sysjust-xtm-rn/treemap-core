import { TreeNode } from './algorithm';
export declare function getRectFromTree(width: number, height: number, tree: TreeNode): TreeMapRect[];
export declare function convertRectToFlow(dir: 'row' | 'col', rect: Rect): FlowRect;
export declare function convertFlowToRect(dir: 'row' | 'col', flow: FlowRect): Rect;
declare type FlowRect = {
    fixedPos: number;
    shiftPos: number;
    fixedSide: number;
    flowSide: number;
};
declare type Rect = {
    top: number;
    left: number;
    width: number;
    height: number;
};
export declare type TreeMapRect = Rect & {
    key: number;
};
export {};
