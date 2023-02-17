# `Treemap - Core`

[TOC]

## Usage

### getTree

```typescript
const containerRatio = 3 / 4;
const values = [2, 3, 4, 2, 1, 6, 6];

//輸入的value Array不可有負數，出現負數時，回傳值為undefined
//values中每個值代表該資料在整個TreeMap圖中的面積比重
//Ex: values加總為24，values[0] = 2，代表該格佔整張圖面積 2/24
const tree = getTree(containerRatio, values);

const show = (node?: TreeNode) => {
    while (node) {
        console.log(node.map(({ value, key }) => `[${key}]: ${value}`));
        node = node.next!;
    }
};

show(tree);
//每行(TreeNode)代表同一層的方塊，next是指向下一層的指標，若無下層，next = undefined
//每格value為面積佔比，key為該value原始排序位置
/* output: [key]: value

    ['[5]: 0.25', '[6]: 0.25']
    ['[2]: 0.16666666666666666', '[1]: 0.125']
    ['[0]: 0.08333333333333333']
    ['[3]: 0.08333333333333333']
    ['[4]: 0.041666666666666664']

*/
```

### getRectFromTree

```typescript
const width = 400;
const height = 300;
const values = [2, 3, 4, 2, 1, 6, 6];

const tree = getTree(height/width, values);

//獲取計算後的實際矩形位置與長寬
const rects: TreeMapRect[] = tree ? getRectFromTree(width, height, tree) : [];

rects.forEach((rect) => console.log(`[${rect.key}] ${rect.top}, ${rect.left}, ${rect.width}, ${rect.height}`));
//key為該value原始排序位置
/* output: [key] top, left, width, height

    [5] 0, 0, 200, 150
    [6] 150, 0, 200, 150
    [2] 0, 200, 114.2857142857143, 174.99999999999997
    [1] 0, 314.28571428571433, 85.71428571428572, 174.99999999999997
    [0] 174.99999999999997, 200, 79.99999999999999, 125.00000000000003
    [3] 174.99999999999997, 280, 120.00000000000001, 83.3333333333333
    [4] 258.33333333333326, 280, 119.99999999999984, 41.66666666666673

*/

```

## Types

### TreeNode
本身為一個`{key: number, value: number}`所形成的陣列，  
但陣列物件額外附帶`next`屬性，指向另一個TreeNode。

意義為經getTree運算後的每個切分層，當next為undefined時，代表該層為最後一層。

### TreeMapRect
tree經由getRectFromTree運算的結果為一個TreeMapRect形成的陣列。
每個TreeMapRect包含計算後的左上座標位置、方格長寬、與該資料原本所在陣列中的序數(key)。
