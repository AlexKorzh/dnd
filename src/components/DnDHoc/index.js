import React from 'react';
import DnDContext from '../DnDContext';

export default function DnDHoc (Component) {
    return function DnDComponent (props) {
        return (
            <DnDContext.Consumer>
                {
                    (dnd) => {
                        return <Component
                            {...props}
                            dnd = { dnd }
                            onDragEnd = { dnd.onDragEnd }
                            resetState = { dnd.resetState }
                        />
                    }
                }
            </DnDContext.Consumer>
        );
    };
}
