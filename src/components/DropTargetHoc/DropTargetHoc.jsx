import React from 'react';
import DropTarget from '../DropTarget';

export default function DropTargetHoc (Component) {
    class DropTargetComponent extends DropTarget {
        constructor (props) {
            super(props);
        }
        /**
         * Возвращает DOM-подэлемент, над которым сейчас пролетает аватар
         *
         * @return DOM-элемент, на который можно положить или undefined
         */
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
        };

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

        /**
         * Спрятать индикацию переноса
         * Вызывается, когда аватар уходит с текущего this._targetElem
         */
        _hideHoverIndication (avatar) {
            this.removeIndicationClass(['under', 'hover', 'above', 'middle']);
        };
        /**
         * Показать индикацию переноса
         * Вызывается, когда аватар пришел на новый this._targetElem
         */
        _showHoverIndication (avatar) {
            this.addIndicationClass('hover');
        };

        /**
         * Метод вызывается при каждом движении аватара
         */
        onDragMove (avatar, event) {
            let newTargetElem = this._getTargetElem(avatar, event);

            if (this._targetElem !== newTargetElem) {
                this._hideHoverIndication(avatar);
                this._targetElem = newTargetElem;
                this._showHoverIndication(avatar);
            }

            this.hoverTreeDropTarget();
        };

        hoverTreeDropTarget () {
            if (this._targetElem) {
                const clientY = event.clientY;

                const { top, height } = this._targetElem.getBoundingClientRect();

                const elementPart = height / 3;
                const middle = top + height / 2;
                const above = middle - elementPart;
                const under = middle + elementPart;

                if (clientY < above) {
                    this.removeIndicationClass(['under', 'middle']);
                    this.addIndicationClass('above');
                    this.dropPlace = 'above';
                } else if (clientY > under) {
                    this.removeIndicationClass(['above', 'middle']);
                    this.addIndicationClass('under');
                    this.dropPlace = 'under';
                } else if (clientY > above && clientY < under) {
                    this.removeIndicationClass(['above', 'under']);
                    this.addIndicationClass('middle');
                    this.dropPlace = 'middle';
                }
            }
        }

        /**
         * Завершение переноса.
         * Алгоритм обработки (переопределить функцию и написать в потомке):
         * 1. Получить данные переноса из avatar.getDragInfo()
         * 2. Определить, возможен ли перенос на _targetElem (если он есть)
         * 3. Вызвать avatar.onDragEnd() или avatar.onDragCancel()
         *  Если нужно подтвердить перенос запросом на сервер, то avatar.onDragEnd(),
         *  а затем асинхронно, если сервер вернул ошибку, avatar.onDragCancel()
         *  При этом аватар должен уметь "откатываться" после onDragEnd.
         *
         * При любом завершении этого метода нужно (делается ниже):
         *  снять текущую индикацию переноса
         *  обнулить this._targetElem
         */
        onDragEnd(avatar, event) {
            if (!this._targetElem) {
                // перенос закончился вне подходящей точки приземления
                avatar.onDragCancel();

                return;
            }

            this._hideHoverIndication();
            // получить информацию об объекте переноса
            let avatarInfo = avatar.getDragInfo(event);

            this.props.dnd.onDragEnd({
                dragZoneElement: avatarInfo.dragZone._elem,
                dropTargetElement: this._elem,
                avatar: avatar,
            });

            avatar.onDragEnd(); // аватар больше не нужен, перенос успешен

            this._targetElem = null;
        };

        setRef = el => {
            this._elem = el;
        };

        render () {
            return <Component
                dropTargetRef={this.setRef}
                {...this.state}
                {...this.props}
            />;
        }
    }

    return DropTargetComponent;
}
