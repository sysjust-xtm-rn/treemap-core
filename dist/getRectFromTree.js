"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFlowToRect = exports.convertRectToFlow = exports.getRectFromTree = void 0;
function getRectFromTree(width, height, tree) {
    if (width > 0 && height > 0)
        return _getRectFromTree({ width, height, tree, top: 0, left: 0, remain: 1 });
    throw `width and height should be positive numbers. width: ${width}, height: ${height}`;
}
exports.getRectFromTree = getRectFromTree;
function _getRectFromTree(params) {
    const { width, height, tree, remain } = params;
    if (!tree)
        return [];
    const dir = width > height ? 'col' : 'row';
    const { fixedPos, shiftPos, fixedSide, flowSide } = convertRectToFlow(dir, params);
    const layerValueSum = tree.reduce((sum, { value }) => sum + value, 0);
    const fixedSideLength = fixedSide * (layerValueSum / remain);
    let shiftAmt = 0;
    return tree
        .map(({ value, key }) => {
        const flowSideLength = flowSide * (value / layerValueSum);
        const flow = {
            fixedPos: fixedPos,
            shiftPos: shiftPos + shiftAmt,
            fixedSide: fixedSideLength,
            flowSide: flowSideLength,
        };
        shiftAmt += flowSideLength;
        return Object.assign(Object.assign({}, convertFlowToRect(dir, flow)), { key });
    })
        .concat(_getRectFromTree(Object.assign(Object.assign({}, convertFlowToRect(dir, {
        fixedPos: fixedPos + fixedSideLength,
        shiftPos: shiftPos,
        fixedSide: fixedSide - fixedSideLength,
        flowSide: flowSide,
    })), { tree: tree.next, remain: remain - layerValueSum })));
}
function convertRectToFlow(dir, rect) {
    if (dir == 'col')
        return {
            fixedPos: rect.left,
            shiftPos: rect.top,
            fixedSide: rect.width,
            flowSide: rect.height,
        };
    else
        return {
            fixedPos: rect.top,
            shiftPos: rect.left,
            fixedSide: rect.height,
            flowSide: rect.width,
        };
}
exports.convertRectToFlow = convertRectToFlow;
function convertFlowToRect(dir, flow) {
    if (dir == 'col')
        return {
            left: flow.fixedPos,
            top: flow.shiftPos,
            width: flow.fixedSide,
            height: flow.flowSide,
        };
    else
        return {
            top: flow.fixedPos,
            left: flow.shiftPos,
            height: flow.fixedSide,
            width: flow.flowSide,
        };
}
exports.convertFlowToRect = convertFlowToRect;
