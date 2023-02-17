"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTree = exports.getLayerRatioSum = exports.getRatioBiggerThanOne = void 0;
function getRatioBiggerThanOne(num) {
    var result = num >= 1 ? num : 1 / num;
    if (result == Infinity || result == -Infinity)
        throw 'divide by zero';
    return result;
}
exports.getRatioBiggerThanOne = getRatioBiggerThanOne;
function getLayerRatioSum(layerArea, layerHeight, datas) {
    return datas.reduce(function (sum, _a) {
        var value = _a.value;
        if (value == 0)
            throw 'datas include 0';
        return sum + getRatioBiggerThanOne((layerHeight / value) * layerArea);
    }, 0);
}
exports.getLayerRatioSum = getLayerRatioSum;
function _getTree(ratio, sortedDatas, remain, index) {
    ratio = getRatioBiggerThanOne(ratio);
    if (!ratio || !remain || !sortedDatas[index])
        return;
    var valueSum = sortedDatas[index].value; //該批已處理的資料加總
    var layerHeight = ratio * (valueSum / remain); //該批已處理的資料佔據高度
    var layer = [__assign({}, sortedDatas[index])];
    while (sortedDatas[++index]) {
        var newData = sortedDatas[index];
        var newValue = newData.value;
        var newRatio = getRatioBiggerThanOne(ratio - layerHeight); //因一定有剩餘空間，ratio - layerHeight 不可能是0
        var newRemain = remain - valueSum;
        var newLayerHeight = newRatio * (newValue / newRemain);
        var newlayerScore = getLayerRatioSum(valueSum, layerHeight, layer) + getRatioBiggerThanOne(newLayerHeight);
        layerHeight *= 1 + newValue / valueSum;
        valueSum += newValue;
        var appendScore = getLayerRatioSum(valueSum, layerHeight, layer.concat(newData));
        if (newlayerScore <= appendScore) {
            layer.next = _getTree(newRatio, sortedDatas, newRemain, index);
            break;
        }
        layer.push(__assign({}, newData));
    }
    return layer;
}
function getTree(ratio, values) {
    if (ratio <= 0)
        throw 'ratio is not a positive number';
    var total = values.reduce(function (p, c) {
        if (c < 0)
            throw 'values has negative value';
        return p + c;
    }, 0);
    var sortedDatas = values.map(function (value, key) { return ({ value: value / total, key: key }); }).sort(function (a, b) { return b.value - a.value; });
    return _getTree(ratio, sortedDatas, 1, 0);
}
exports.getTree = getTree;
