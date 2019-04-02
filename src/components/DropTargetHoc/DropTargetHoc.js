import React from 'react';
import DropTarget from '../DropTarget';

export default function DropTargetHoc (Component, dropTargetConnector) {
    class DropTargetComponent extends DropTarget {
        constructor (props) {
            super(props);

            // inject dropTargetConnector
            if (typeof dropTargetConnector === 'function') {
                this.dropTargetConnector = new dropTargetConnector(props);
            }
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
            if (this.dropTargetConnector) {
                this.dropTargetConnector.hideHoverIndication(this);
            }
        };
        /**
         * Показать индикацию переноса
         * Вызывается, когда аватар пришел на новый this._targetElem
         */
        _showHoverIndication (avatar) {
            if (this.dropTargetConnector) {
                this.dropTargetConnector.showHoverIndication(this);
            }
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

            if (this.dropTargetConnector) {
                this.dropTargetConnector.onDragMove(this, avatar, event);
            }
        };

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
            // let avatarInfo = avatar.getDragInfo(event);

            if (this.dropTargetConnector) {
                this.dropTargetConnector.onDragEnd(this, avatar, event);
            }

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
