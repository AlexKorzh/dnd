'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Зона, из которой можно переносить объекты
 * Умеет обрабатывать начало переноса на себе и создавать "аватар"
 * @param elem DOM-элемент, к которому привязана зона
 */
var DragZone = function (_Component) {
    _inherits(DragZone, _Component);

    function DragZone(props) {
        _classCallCheck(this, DragZone);

        var _this = _possibleConstructorReturn(this, (DragZone.__proto__ || Object.getPrototypeOf(DragZone)).call(this, props));

        if (props.elem !== null && props.elem) props.elem.dragZone = _this;
        _this._elem = props.elem;
        return _this;
    }

    _createClass(DragZone, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initDragZone(this._elem);
        }
        /**
         * Инициализация элемента (получение ссылки на DOM - элемент)
         * @param elem DOM-элемент, к которому привязана зона
         */

    }, {
        key: 'initDragZone',
        value: function initDragZone(elem) {
            if (elem) {
                this._elem = elem;
                elem.dragZone = this;
            }
        }

        /**
         * Создать аватар, соответствующий зоне.
         * У разных зон могут быть разные типы аватаров
         */

    }, {
        key: '_makeAvatar',
        value: function _makeAvatar() {
            /* override */
        }
    }, {
        key: 'onDragStart',


        /**
         * Обработать начало переноса.
         *
         * Получает координаты изначального нажатия мышки, событие.
         *
         * @param downX Координата изначального нажатия по X
         * @param downY Координата изначального нажатия по Y
         * @param event текущее событие мыши
         *
         * @return аватар или false, если захватить с данной точки ничего нельзя
         */
        value: function onDragStart(downX, downY, event) {

            var avatar = this._makeAvatar();

            if (!avatar.initFromEvent(downX, downY, event)) {
                return false;
            }

            return avatar;
        }
    }]);

    return DragZone;
}(_react.Component);

exports.default = DragZone;