import DropTarget from '../DropTarget';
import {extend} from '../utils';

export default class TreeDropTarget extends DropTarget {
    constructor(elem) {
        super(elem);
    }

    _showHoverIndication () {
        this._targetElem && this._targetElem.classList.add('hover');
    }

    _hideHoverIndication () {
        this._targetElem && this._targetElem.classList.remove('hover');
        this._targetElem && this._targetElem.classList.remove('above');
        this._targetElem && this._targetElem.classList.remove('under');
    }

    _getTargetElem (avatar, event) {
        let target = avatar.getTargetElem();

        if (!target.classList.contains('droppable')) {
            return;
        }

        // проверить, может быть перенос узла внутрь самого себя или в себя?
        let elemToMove = avatar.getDragInfo(event).dragZoneElem.parentNode;

        let elem = target;

        while (elem) {
            if (elem === elemToMove) return; // попытка перенести родителя в потомка
            elem = elem.parentNode;
        }

        return target;
    }

    addBorder (border) {
        this._targetElem && this._targetElem.classList.add(border);
    }

    removeBorder (border) {
        this._targetElem && this._targetElem.classList.remove(border);
    }

    onDragMove(avatar, event) {
        super.onDragMove(avatar, event);

        if (this._targetElem) {
            const clientY = event.clientY;

            const {top, height} = this._targetElem.getBoundingClientRect();

            const elementMiddle = top + height / 2;

            if (clientY < elementMiddle) {
                // upwards
                this.removeBorder('under');
                this.addBorder('above');
            } else {
                // downwards
                this.removeBorder('above');
                this.addBorder('under');
            }
        }
    }

    onDragEnd (avatar, event) {
        if (!this._targetElem) {
            // перенос закончился вне подходящей точки приземления
            avatar.onDragCancel();

            return;
        }

        this._hideHoverIndication();
        // получить информацию об объекте переноса
        let avatarInfo = avatar.getDragInfo(event);

        avatar.onDragEnd(); // аватар больше не нужен, перенос успешен

        // вставить элемент в детей в отсортированном порядке
        let elemToMove = avatarInfo.dragZoneElem.parentNode; // <LI>
        let title = avatarInfo.dragZoneElem.innerHTML; // переносимый заголовок

        // получить контейнер для узлов дерева, соответствующий точке преземления
        let ul = this._targetElem.parentNode.getElementsByTagName('UL')[0];

        if (!ul) { // нет детей, создадим контейнер
            ul = document.createElement('UL');
            this._targetElem.parentNode.appendChild(ul);
        }

        // вставить новый узел в нужное место среди потомков, в алфавитном порядке
        let li = null;

        for (let i = 0; i < ul.children.length; i++) {
            li = ul.children[i];

            let childTitle = li.children[0].innerHTML;
            if (childTitle > title) {
                break;
            }
            li = null;
        }

        ul.insertBefore(elemToMove, li);

        this._targetElem = null;
    }
}
