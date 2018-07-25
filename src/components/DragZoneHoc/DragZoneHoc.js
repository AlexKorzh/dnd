import React from 'react';
import DragAvatar from '../DragAvatar';

export default function DragZoneHoc (Component) {
    class DragZoneComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount () {
            this.initDragZone(this._elem);
        }
        /**
         * Инициализация элемента (получение ссылки на DOM - элемент)
         * @param elem DOM-элемент, к которому привязана зона
         */
        initDragZone (elem) {
            if (elem) {
                this._elem = elem;
                elem.dragZone = this;
            }
        }
        /**
         * Создать аватар, соответствующий зоне.
         * У разных зон могут быть разные типы аватаров
         */
        _makeAvatar () {
            /* override */
            return new DragAvatar({dragZone: this, dragElem: this._elem});
        };
        /**
         * Обработать начало переноса.
         *
         * Получает координаты изначального нажатия мышки, событие.
         *
         * @param downX Координата изначального нажатия по X
         * @param downY Координата изначального нажатия по Y
         * @param event текущее событие мыши
         *
         * @return аватар или false, если захватить с данной точки ничего нельзя
         */
        onDragStart (downX, downY, event) {

            let avatar = this._makeAvatar();

            if (!avatar.initFromEvent(downX, downY, event)) {
                return false;
            }

            return avatar;
        };

        setRef = el => {
            this._elem = el;
        };

        render () {
            return <Component dragZoneRef = {this.setRef} {...this.props} />;
        }
    }

    return DragZoneComponent;
}
