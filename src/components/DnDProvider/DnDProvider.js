import React, { Component } from 'react';
import DnDContext from '../DnDContext';

export default class DnDProvider extends Component {
    constructor (props) {
        super(props);

        this.state = {
            dragZone: props.dragZone,
            dropTarget: props.dropTarget,
            avatar: props.avatar,
            downX: props.downX,
            downY: props.downY,
            dragZoneElement: null,
            dropTargetElement: null,
            dragZoneId: null,
            dropPosition: null,
            onDragEnd: info => {
                this.setState({
                    dragZoneId: info.dragZoneId,
                    dragZoneElement: info.dragZoneElement,
                    dropTargetElement: info.dropTargetElement,
                    dropPosition: info.dropPosition,
                    avatar: info.avatar
                });
            },
            resetState: () => {
                this.cleanUp();
            }
        };

        this.onDragStart = this.onDragStart.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    componentDidMount () {
        document.addEventListener('dragstart', this.onDragStart);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mousedown', this.onMouseDown);
    }

    componentWillUnmount () {
        document.removeEventListener('dragstart', this.onDragStart);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mousedown', this.onMouseDown);
    }

    onDragStart () {
        return false;
    }

    onMouseDown (e) {
        if (e.which !== 1) {
            // не левой кнопкой
            return false;
        }

        let dragZone = this.findDragZone(e);

        if (!dragZone) {
            return;
        } else {
            this.setState({ dragZone });
        }

        // запомним, что элемент нажат на текущих координатах pageX/pageY
        this.setState({
            downX: e.pageX,
            downY: e.pageY
        });

        return false;
    }

    onMouseMove (e) {
        let { dragZone, downX, downY, avatar, dropTarget } = this.state;

        if (!dragZone) return; // элемент не зажат

        if (!avatar) {
            // элемент нажат, но пока не начали его двигать
            if (
                Math.abs(e.pageX - downX) < 3
                && Math.abs(e.pageY - downY) < 3
            ) {
                return;
            }
            // попробовать захватить элемент
            avatar = dragZone.onDragStart(downX, downY, e);

            if (!avatar) {
                // не получилось, значит перенос продолжать нельзя
                this.cleanUp(); // очистить приватные переменные, связанные с переносом
            } else {
                this.setState({ avatar });
            }

            return this;
        }

        // отобразить перенос объекта, перевычислить текущий элемент под курсором
        avatar.onDragMove(e);

        // найти новый dropTarget под курсором: newDropTarget
        // текущий dropTarget остался от прошлого mousemove
        // *оба значения: и newDropTarget и dropTarget могут быть null
        let newDropTarget = this.findDropTarget(e);

        if (newDropTarget !== dropTarget) {
            // уведомить старую и новую зоны-цели о том, что с них ушли/на них зашли
            dropTarget && dropTarget.onDragLeave(newDropTarget, avatar, e);
            newDropTarget && newDropTarget.onDragEnter(dropTarget, avatar, e);
        }

        // dropTarget = newDropTarget;
        this.setState({ dropTarget: newDropTarget });

        dropTarget && dropTarget.onDragMove(avatar, e);

        return false;
    }

    onMouseUp (e) {
        let { avatar, dropTarget } = this.state;

        if (e.which !== 1) {
            // не левой кнопкой
            return false;
        }

        if (avatar) {
            // если уже начали передвигать

            if (dropTarget) {
                // завершить перенос и избавиться от аватара, если это нужно
                // эта функция обязана вызвать avatar.onDragEnd/onDragCancel
                dropTarget.onDragEnd(avatar, e);
            } else {
                avatar.onDragCancel();
            }
        }

        this.cleanUp();
    }

    cleanUp () {
        // очистить все промежуточные объекты
        this.setState({
            avatar: null,
            dragZone: null,
            dropTarget: null
        })
    }

    findDragZone (event) {
        let elem = event.target;

        while (elem !== document && !elem.dragZone) {
            elem = elem.parentNode;
        }

        return elem.dragZone;
    }

    findDropTarget (event) {
        // получить элемент под аватаром
        let elem = this.state.avatar.getTargetElem();

        while (elem !== document && !elem.dropTarget) {
            elem = elem.parentNode;
        }

        if (!elem.dropTarget) {
            return null;
        }

        return elem.dropTarget;
    }

    render () {
        return (
            <DnDContext.Provider value = {this.state}>
                { this.props.children }
            </DnDContext.Provider>

        );
    }
}

DnDProvider.defaultProps = {
    dragZone: null,
    dropTarget: null,
    avatar: null,
    downX: 0,
    downY: 0
};
