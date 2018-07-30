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
 * Зона, в которую объекты можно класть
 * Занимается индикацией передвижения по себе, добавлением в себя
 */
var DropTarget = function (_Component) {
    _inherits(DropTarget, _Component);

    function DropTarget(props) {
        _classCallCheck(this, DropTarget);

        var _this = _possibleConstructorReturn(this, (DropTarget.__proto__ || Object.getPrototypeOf(DropTarget)).call(this, props));

        if (props.elem !== null && props.elem) {
            props.elem.dropTarget = _this;
        }

        _this._elem = props.elem;
        /**
         * Подэлемент, над которым в настоящий момент находится аватар
         */
        _this._targetElem = null;
        return _this;
    }

    _createClass(DropTarget, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initDropTarget(this._elem);
        }

        /**
         * Инициализация элемента (получение ссылки на DOM - элемент)
         * @param elem DOM-элемент, к которому привязана зона
         */

    }, {
        key: 'initDropTarget',
        value: function initDropTarget(elem) {
            if (elem) {
                elem.dropTarget = this;
                this._elem = elem;
                this._targetElem = null;
            }
        }
    }, {
        key: '_getTargetElem',


        /**
         * Возвращает DOM-подэлемент, над которым сейчас пролетает аватар
         *
         * @return DOM-элемент, на который можно положить или undefined
         */
        value: function _getTargetElem(avatar, event) {
            return this._elem;
        }
    }, {
        key: '_hideHoverIndication',


        /**
         * Спрятать индикацию переноса
         * Вызывается, когда аватар уходит с текущего this._targetElem
         */
        value: function _hideHoverIndication(avatar) {
            /* override */
        }
    }, {
        key: '_showHoverIndication',

        /**
         * Показать индикацию переноса
         * Вызывается, когда аватар пришел на новый this._targetElem
         */
        value: function _showHoverIndication(avatar) {
            /* override */
        }
    }, {
        key: 'onDragMove',


        /**
         * Метод вызывается при каждом движении аватара
         */
        value: function onDragMove(avatar, event) {
            var newTargetElem = this._getTargetElem(avatar, event);

            if (this._targetElem !== newTargetElem) {
                this._hideHoverIndication(avatar);
                this._targetElem = newTargetElem;
                this._showHoverIndication(avatar);
            }
        }
    }, {
        key: 'onDragEnd',


        /**
         * Завершение переноса.
         * Алгоритм обработки (переопределить функцию и написать в потомке):
         * 1. Получить данные переноса из avatar.getDragInfo()
         * 2. Определить, возможен ли перенос на _targetElem (если он есть)
         * 3. Вызвать avatar.onDragEnd() или avatar.onDragCancel()
         *  Если нужно подтвердить перенос запросом на сервер, то avatar.onDragEnd(),
         *  а затем асинхронно, если сервер вернул ошибку, avatar.onDragCancel()
         *  При этом аватар должен уметь "откатываться" после onDragEnd.
         *
         * При любом завершении этого метода нужно (делается ниже):
         *  снять текущую индикацию переноса
         *  обнулить this._targetElem
         */
        value: function onDragEnd(avatar, event) {
            this._hideHoverIndication(avatar);
            this._targetElem = null;
        }
    }, {
        key: 'onDragEnter',


        /**
         * Вход аватара в DropTarget
         */
        value: function onDragEnter(fromDropTarget, avatar, event) {
            var coords = event.target.getBoundingClientRect();
            var Y = coords.top + coords.height / 2;
        }
    }, {
        key: 'onDragLeave',


        /**
         * Выход аватара из DropTarget
         */
        value: function onDragLeave(toDropTarget, avatar, event) {
            this._hideHoverIndication();
            this._targetElem = null;
        }
    }]);

    return DropTarget;
}(_react.Component);

exports.default = DropTarget;