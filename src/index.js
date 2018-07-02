import DragManager from './DragManager';

import TreeDragZone from './TreeDragZone';
import TreeDropTarget from './TreeDropTarget';

let tree = document.querySelector('#tree');
let dragElement = document.querySelector('.draggable');

const treeDragZone = new TreeDragZone(tree);
const treeDropTarget = new TreeDropTarget(tree);


