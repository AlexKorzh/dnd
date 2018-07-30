'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DnDHoc = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DnDContext = require('../DnDContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DnDHoc(Component) {
    return function DnDComponent(props) {
        return _react2.default.createElement(
            _DnDContext.DnDContext.Consumer,
            null,
            function (dnd) {
                return _react2.default.createElement(Component, _extends({}, props, {
                    dnd: dnd,
                    onDragEnd: dnd.onDragEnd
                }));
            }
        );
    };
}

exports.DnDHoc = DnDHoc;