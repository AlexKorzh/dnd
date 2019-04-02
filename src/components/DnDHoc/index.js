import React from 'react';
import DnDContext from '../DnDContext';

export default function DnDHoc (Component) {
    return function DnDComponent (props) {
        return (
            <DnDContext.Consumer>
                {
                    dnd => {
                        const {
                            dragZone,
                            dropTarget,
                            avatar,
                            downX,
                            downY,
                            dragZoneElement,
                            dropTargetElement,
                            onDragEnd,
                            resetState,
                        } = dnd;

                        return <Component
                            {...props}
                            dragZone={dragZone}
                            dropTarget={dropTarget}
                            avatar={avatar}
                            downX={downX}
                            downY={downY}
                            dragZoneElement={dragZoneElement}
                            dropTargetElement={dropTargetElement}
                            onDragEnd={onDragEnd}
                            resetState={resetState}
                        />
                    }
                }
            </DnDContext.Consumer>
        );
    };
}
