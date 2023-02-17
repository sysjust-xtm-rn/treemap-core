"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRectFromTree = void 0;
function _getRectFromTree(params) {
    var _a;
    var width = params.width, height = params.height, tree = params.tree, remain = params.remain;
    if (!tree)
        return [];
    var transformKey = width > height ? colTransformKey : rowTransformKey;
    var layerValueSum = tree.reduce(function (sum, _a) {
        var value = _a.value;
        return sum + value;
    }, 0);
    var fixedSideLength = params[transformKey.fixedSide] * (layerValueSum / remain);
    var shiftAmt = 0;
    return tree
        .map(function (_a) {
        var _b;
        var value = _a.value, key = _a.key;
        var flowSideLength = params[transformKey.flowSide] * (value / layerValueSum);
        var vector = (_b = {},
            _b[transformKey.fixedPos] = params[transformKey.fixedPos],
            _b[transformKey.shiftPos] = params[transformKey.shiftPos] + shiftAmt,
            _b[transformKey.fixedSide] = fixedSideLength,
            _b[transformKey.flowSide] = flowSideLength,
            _b.key = key,
            _b);
        shiftAmt += flowSideLength;
        return vector;
    })
        .concat(_getRectFromTree((_a = {},
        _a[transformKey.fixedPos] = params[transformKey.fixedPos] + fixedSideLength,
        _a[transformKey.shiftPos] = params[transformKey.shiftPos],
        _a[transformKey.fixedSide] = params[transformKey.fixedSide] - fixedSideLength,
        _a[transformKey.flowSide] = params[transformKey.flowSide],
        _a.tree = tree.next,
        _a.remain = remain - layerValueSum,
        _a)));
}
function getRectFromTree(width, height, tree) {
    if (width < 0 || height < 0)
        throw "width and height should not be a negative number. width: ".concat(width, ", height: ").concat(height);
    return _getRectFromTree({ width: width, height: height, tree: tree, top: 0, left: 0, remain: 1 });
}
exports.getRectFromTree = getRectFromTree;
var colTransformKey = Object.freeze({
    fixedPos: 'left',
    shiftPos: 'top',
    fixedSide: 'width',
    flowSide: 'height',
});
var rowTransformKey = Object.freeze({
    fixedPos: 'top',
    shiftPos: 'left',
    fixedSide: 'height',
    flowSide: 'width',
});
