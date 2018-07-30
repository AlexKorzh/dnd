import React from 'react';
import { DnDContext } from '../DnDContext';

function DnDHoc (Component) {
    return function DnDComponent (props) {
        return (
            <DnDContext.Consumer>
                {
                    (dnd) => {
                        return <Component
                            {...props}
                            dnd = { dnd }
                            onDragEnd = { dnd.onDragEnd }
                        />
                    }
                }
            </DnDContext.Consumer>
        );
    };
}

export { DnDHoc };
