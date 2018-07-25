import React from 'react';
import DnDContext from '../DnDContext';

export default function DnDHoc (Component) {
    return function DnDComponent (props) {
        return (
            <DnDContext.Consumer>
                {dnd => <Component {...props} dnd={dnd} />}
            </DnDContext.Consumer>
        );
    };
}
