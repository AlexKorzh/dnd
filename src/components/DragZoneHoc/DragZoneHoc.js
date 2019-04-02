import React from 'react';
import DragAvatar from '../DragAvatar';
import DragZone from '../DragZone';

export default function DragZoneHoc (Component) {
    class DragZoneComponent extends DragZone {
        constructor (props) {
            super (props);
        }

        /**
         * Создать аватар, соответствующий зоне.
         * У разных зон могут быть разные типы аватаров
         */
        _makeAvatar () {
            /* override */
            return new DragAvatar({dragZone: this, dragElem: this._elem});
        };

        setRef = el => {
            this._elem = el;
        };

        render () {
            return (
                <Component
                    { ...this.props }
                    dragZoneRef = { this.setRef }
                />
            );
        }
    }

    return DragZoneComponent;
}
