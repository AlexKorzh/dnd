
import DragAvatar from './DragAvatar';
import {getCoords} from '../utils';

export default class TreeDragAvatar extends DragAvatar {
    constructor (dragZone, dragElem) {
        super(dragZone, dragElem);
    }

    initFromEvent (downX, downY, event) {
        if (!event.target.classList.contains('draggable')) return false;

        this._dragZoneElem = event.target;

        let elem = this._elem = this._dragZoneElem.cloneNode(true);

        elem.className = 'avatar';

        // создать вспомогательные свойства shiftX/shiftY
        let coords = getCoords(this._dragZoneElem);

        this._shiftX = downX - coords.left;
        this._shiftY = downY - coords.top;

        // инициировать начало переноса
        document.body.appendChild(elem);
        elem.style.zIndex = 9999;
        elem.style.position = 'absolute';
        // elem.style.display = 'none';

        return true;
    }

    _destroy () {
        this._elem.parentNode.removeChild(this._elem);
    }

    onDragCancel () {
        this._destroy();
    }

    onDragEnd () {
        this._destroy();
    }
}
