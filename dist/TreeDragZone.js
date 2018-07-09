import DragZone from './react/DragZone';
import TreeDragAvatar from './TreeDragAvatar';

export default class TreeDragZone extends DragZone {
    constructor(props) {
        super(props);
    }
    _makeAvatar() {
        return new TreeDragAvatar({ dragZone: this, dragElem: this._elem });
    }
}