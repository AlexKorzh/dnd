'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = DragZoneHoc;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DragAvatar = require('../DragAvatar');

var _DragAvatar2 = _interopRequireDefault(_DragAvatar);

var _DragZone2 = require('../DragZone');

var _DragZone3 = _interopRequireDefault(_DragZone2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { DnDContext } from '../DnDContext';

function DragZoneHoc(Component) {
    var DragZoneComponent = function (_DragZone) {
        _inherits(DragZoneComponent, _DragZone);

        function DragZoneComponent(props) {
            _classCallCheck(this, DragZoneComponent);

            var _this = _possibleConstructorReturn(this, (DragZoneComponent.__proto__ || Object.getPrototypeOf(DragZoneComponent)).call(this, props));

            _this.setRef = function (el) {
                _this._elem = el;
            };

            return _this;
        }

        /**
         * Создать аватар, соответствующий зоне.
         * У разных зон могут быть разные типы аватаров
         */


        _createClass(DragZoneComponent, [{
            key: '_makeAvatar',
            value: function _makeAvatar() {
                /* override */
                return new _DragAvatar2.default({ dragZone: this, dragElem: this._elem });
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Component, _extends({}, this.props, {
                    dragZoneRef: this.setRef
                }));
            }
        }]);

        return DragZoneComponent;
    }(_DragZone3.default);

    return DragZoneComponent;
}