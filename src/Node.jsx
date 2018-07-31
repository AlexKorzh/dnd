import React, {Component} from 'react';
import DnDHoc from './components/DnDHoc';
import DragZoneHoc from './components/DragZoneHoc';
import DropTargetHoc from './components/DropTargetHoc';

class Node extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dnd.dropTargetElement !== this.props.dnd.dropTargetElement) {
            console.log('RECIVED new dragZoneElement', this.props.dnd.dragZoneElement);
            console.log('RECIVED new dropTargetElement', this.props.dnd.dropTargetElement);
        }
    }

    setRef = elem => {
        this.props.dragZoneRef(elem);
        this.props.dropTargetRef(elem);
    };

    render() {
        let {node, children, dnd} = this.props,
            Tag = node.nodeType;

        console.log(dnd);

        return (
            <React.Fragment>
                <Tag
                    key={node.id}
                >
                    {
                        node.textContent
                            ?
                            <span className='test'>
                            <span
                                className={node.attributes.class}
                                data-node-id={node.id}
                                ref={this.setRef}
                            >
                            {node.textContent}
                        </span></span> : null
                    }
                    {children}
                </Tag>
            </React.Fragment>
        );
    }
};

export default DnDHoc(DropTargetHoc(DragZoneHoc(Node)));
