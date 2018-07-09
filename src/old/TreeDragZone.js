import DragZone from '../DragZone';
import TreeDragAvatar from './TreeDragAvatar';

export default class TreeDragZone extends DragZone {
    constructor(elem) {
        super(elem);
    }
    _makeAvatar () {
        return new TreeDragAvatar(this, this._elem);
    }
}
