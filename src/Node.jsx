import React, {Component} from 'react';
import DnDHoc from './components/DnDHoc';
import DragZoneHoc from './components/DragZoneHoc';
import DropTargetHoc from './components/DropTargetHoc';


const forwardedRef = React.createRef();

class Node extends Component {
    constructor(props) {
        super(props);
    }

    setRef = elem => {
        this.props.dragZoneRef(elem);
        this.props.dropTargetRef(elem);
    };

    render() {
        let {node, children, dnd, dragZoneRef, dropTargetRef} = this.props,
            Tag = node.nodeType;

        return (
            <React.Fragment>
                <Tag
                    key={node.id}
                >
                    {
                        node.textContent
                            ? <span
                                className={node.attributes.class}
                                ref={this.setRef}
                            >
                            {node.textContent}
                        </span> : null
                    }
                    {children}
                </Tag>
            </React.Fragment>
        );
    }
};

export default DropTargetHoc(DragZoneHoc(Node));
