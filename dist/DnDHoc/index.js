'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = DnDHoc;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DnDContext = require('../DnDContext');

var _DnDContext2 = _interopRequireDefault(_DnDContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DnDHoc(Component) {
    return function DnDComponent(props) {
        return _react2.default.createElement(
            _DnDContext2.default.Consumer,
            null,
            function (dnd) {
                var dragZone = dnd.dragZone,
                    dropTarget = dnd.dropTarget,
                    avatar = dnd.avatar,
                    downX = dnd.downX,
                    downY = dnd.downY,
                    dragZoneId = dnd.dragZoneId,
                    dropTargetZoneId = dnd.dropTargetZoneId,
                    dragZoneElement = dnd.dragZoneElement,
                    dropTargetElement = dnd.dropTargetElement,
                    dropPosition = dnd.dropPosition,
                    onDragEnd = dnd.onDragEnd,
                    resetState = dnd.resetState;


                return _react2.default.createElement(Component, _extends({}, props, {
                    dragZone: dragZone,
                    dropTarget: dropTarget,
                    avatar: avatar,
                    downX: downX,
                    downY: downY,
                    dropPosition: dropPosition,
                    dragZoneId: dragZoneId,
                    dropTargetZoneId: dropTargetZoneId,
                    dragZoneElement: dragZoneElement,
                    dropTargetElement: dropTargetElement,
                    onDragEnd: onDragEnd,
                    resetState: resetState
                }));
            }
        );
    };
}