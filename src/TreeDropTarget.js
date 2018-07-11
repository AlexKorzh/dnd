import DropTarget from './DropTarget';

export default class TreeDropTarget extends DropTarget {
    constructor(elem) {
        super(elem);
    }

    _showHoverIndication () {
        this.addIndicationClass('hover');
    }

    _hideHoverIndication () {
        this.removeIndicationClass(['under', 'hover', 'above']);
    }

    _getTargetElem (avatar, event) {
        let target = avatar.getTargetElem();

        if (!target.closest('.droppable')) {
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

    addIndicationClass (className) {
        if (className) {
            if (Array.isArray(className)) {
                className.forEach(item => {
                    this._targetElem && this._targetElem.classList.add(item);
                });
            } else {
                this._targetElem && this._targetElem.classList.add(className);
            }
        }
    }

    removeIndicationClass (className) {
        if (className) {
            if (Array.isArray(className)) {
                className.forEach(item => {
                    this._targetElem && this._targetElem.classList.remove(item);
                });
            } else {
                this._targetElem && this._targetElem.classList.remove(className);
            }
        }
    }

    onDragMove(avatar, event) {
        super.onDragMove(avatar, event);

        if (this._targetElem) {
            const clientY = event.clientY;

            const { top, height } = this._targetElem.getBoundingClientRect();

            const elementPart = height / 3;
            const middle = top + height / 2;
            const above = middle - elementPart;
            const under = middle + elementPart;

            if (clientY < above) {
                this.removeIndicationClass('under');
                this.addIndicationClass('above');
            } else if (clientY > under) {
                this.removeIndicationClass('above');
                this.addIndicationClass('under');
            } else if (clientY > above && clientY < under) {
                this.removeIndicationClass(['above', 'under']);
                this.addIndicationClass('middle');
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
