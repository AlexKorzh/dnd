import React from 'react';

export default function DropZoneHoc (Component) {
    class DropTargetComponent extends React.Component {
        constructor (props) {
            super(props);

            if (props.elem !== null && props.elem) props.elem.dropTarget = this;

            this._elem = props.elem;
            /**
             * Подэлемент, над которым в настоящий момент находится аватар
             */
            this._targetElem = null;
        }

        componentDidMount () {
            this.initDropTarget(this._elem);
        }

        /**
         * Инициализация элемента (получение ссылки на DOM - элемент)
         * @param elem DOM-элемент, к которому привязана зона
         */
        initDropTarget (elem) {
            if (elem) {
                elem.dropTarget = this;
                this._elem = elem;
                this._targetElem = null;
            }
        };

        /**
         * Возвращает DOM-подэлемент, над которым сейчас пролетает аватар
         *
         * @return DOM-элемент, на который можно положить или undefined
         */
        _getTargetElem (avatar, event) {
            return this._elem;
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
            /* override */
            this.removeIndicationClass('hover');
        };
        /**
         * Показать индикацию переноса
         * Вызывается, когда аватар пришел на новый this._targetElem
         */
        _showHoverIndication (avatar) {
            /* override */
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
        onDragEnd (avatar, event) {
            this._hideHoverIndication(avatar);
            this._targetElem = null;

            if (!this._targetElem) {
                // перенос закончился вне подходящей точки приземления
                avatar.onDragCancel();

                return;
            }
        };

        /**
         * Вход аватара в DropTarget
         */
        onDragEnter (fromDropTarget, avatar, event) {
            const coords = event.target.getBoundingClientRect();
            const Y = coords.top + coords.height / 2;
        };

        /**
         * Выход аватара из DropTarget
         */
        onDragLeave (toDropTarget, avatar, event) {
            this._hideHoverIndication();
            this._targetElem = null;
        };

        setRef = el => {
            this._elem = el;
        };

        render () {
            return <Component dropTargetRef = {this.setRef} {...this.props} />;
        }
    }

    return DropTargetComponent;
}
