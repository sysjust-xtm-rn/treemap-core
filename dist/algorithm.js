"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayerRatioSum = exports.getRatioLessThanOne = exports.getTree = void 0;
function getTree(ratio, values) {
    if (ratio < 0)
        throw 'ratio is not a positive number';
    const total = values.reduce((p, c) => {
        if (c < 0)
            throw 'values has negative value';
        return p + c;
    }, 0);
    const sortedDatas = values.map((value, key) => ({ value: value / total, key })).sort((a, b) => b.value - a.value);
    return _getTree(ratio, sortedDatas, 1, 0);
}
exports.getTree = getTree;
function _getTree(ratio, sortedDatas, remain, index) {
    const layer = [sortedDatas[index]];
    if (!ratio || !remain || !layer[0])
        return;
    ratio = 1 / getRatioLessThanOne(ratio);
    let layerSum = layer[0].value;
    let layerHeight = ratio * (layerSum / remain);
    while (true) {
        const newData = sortedDatas[++index];
        if (!newData)
            break;
        const newValue = newData.value;
        const newRatio = 1 / getRatioLessThanOne(ratio - layerHeight); //因一定有剩餘空間，ratio - layerHeight不可能是0
        const newRemain = remain - layerSum;
        const newLayerHeight = newRatio * (newValue / newRemain);
        const newlayerScore = getLayerRatioSum(layerSum, layerHeight, layer) + getRatioLessThanOne(newLayerHeight);
        layerSum += newValue;
        layerHeight = ratio * (layerSum / remain);
        const appendScore = getLayerRatioSum(layerSum, layerHeight, layer.concat(newData));
        if (newlayerScore >= appendScore) {
            layer.next = _getTree(newRatio, sortedDatas, newRemain, index);
            break;
        }
        layer.push(newData);
    }
    return layer;
}
function getRatioLessThanOne(num) {
    if (num > 0)
        return num < 1 ? num : 1 / num;
    throw '[getRatioLessThanOne] input is not positive';
}
exports.getRatioLessThanOne = getRatioLessThanOne;
function getLayerRatioSum(layerArea, layerHeight, datas) {
    return datas.reduce((sum, { value }) => {
        if (value > 0)
            return sum + getRatioLessThanOne((layerHeight / value) * layerArea);
        throw '[getLayerRatioSum] datas include 0 or negative number';
    }, 0);
}
exports.getLayerRatioSum = getLayerRatioSum;
