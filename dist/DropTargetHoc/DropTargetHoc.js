'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = DropTargetHoc;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DropTarget2 = require('../DropTarget');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function DropTargetHoc(Component) {
    var DropTargetComponent = function (_DropTarget) {
        _inherits(DropTargetComponent, _DropTarget);

        function DropTargetComponent(props) {
            _classCallCheck(this, DropTargetComponent);

            var _this = _possibleConstructorReturn(this, (DropTargetComponent.__proto__ || Object.getPrototypeOf(DropTargetComponent)).call(this, props));

            _this.setRef = function (el) {
                _this._elem = el;
            };

            return _this;
        }
        /**
         * Возвращает DOM-подэлемент, над которым сейчас пролетает аватар
         *
         * @return DOM-элемент, на который можно положить или undefined
         */


        _createClass(DropTargetComponent, [{
            key: '_getTargetElem',
            value: function _getTargetElem(avatar, event) {
                var target = avatar.getTargetElem();

                if (!target.closest('.droppable')) {
                    return;
                }

                // проверить, может быть перенос узла внутрь самого себя или в себя?
                var elemToMove = avatar.getDragInfo(event).dragZoneElem.parentNode;

                var elem = target;

                while (elem) {
                    if (elem === elemToMove) return; // попытка перенести родителя в потомка
                    elem = elem.parentNode;
                }

                return target;
            }
        }, {
            key: 'addIndicationClass',
            value: function addIndicationClass(className) {
                var _this2 = this;

                if (className) {
                    if (Array.isArray(className)) {
                        className.forEach(function (item) {
                            _this2._targetElem && _this2._targetElem.classList.add(item);
                        });
                    } else {
                        this._targetElem && this._targetElem.classList.add(className);
                    }
                }
            }
        }, {
            key: 'removeIndicationClass',
            value: function removeIndicationClass(className) {
                var _this3 = this;

                if (className) {
                    if (Array.isArray(className)) {
                        className.forEach(function (item) {
                            _this3._targetElem && _this3._targetElem.classList.remove(item);
                        });
                    } else {
                        this._targetElem && this._targetElem.classList.remove(className);
                    }
                }
            }

            /**
             * Спрятать индикацию переноса
             * Вызывается, когда аватар уходит с текущего this._targetElem
             */

        }, {
            key: '_hideHoverIndication',
            value: function _hideHoverIndication(avatar) {
                this.removeIndicationClass(['under', 'hover', 'above', 'middle']);
            }
        }, {
            key: '_showHoverIndication',

            /**
             * Показать индикацию переноса
             * Вызывается, когда аватар пришел на новый this._targetElem
             */
            value: function _showHoverIndication(avatar) {
                this.addIndicationClass('hover');
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

                this.hoverTreeDropTarget();
            }
        }, {
            key: 'hoverTreeDropTarget',
            value: function hoverTreeDropTarget() {
                if (this._targetElem) {
                    var clientY = event.clientY;

                    var _targetElem$getBoundi = this._targetElem.getBoundingClientRect(),
                        top = _targetElem$getBoundi.top,
                        height = _targetElem$getBoundi.height;

                    var elementPart = height / 3;
                    var middle = top + height / 2;
                    var above = middle - elementPart;
                    var under = middle + elementPart;

                    if (clientY < above) {
                        this.removeIndicationClass(['under', 'middle']);
                        this.addIndicationClass('above');
                        this.dropPlace = 'above';
                    } else if (clientY > under) {
                        this.removeIndicationClass(['above', 'middle']);
                        this.addIndicationClass('under');
                        this.dropPlace = 'under';
                    } else if (clientY > above && clientY < under) {
                        this.removeIndicationClass(['above', 'under']);
                        this.addIndicationClass('middle');
                        this.dropPlace = 'middle';
                    }
                }
            }

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

        }, {
            key: 'onDragEnd',
            value: function onDragEnd(avatar, event) {
                if (!this._targetElem) {
                    // перенос закончился вне подходящей точки приземления
                    avatar.onDragCancel();

                    return;
                }

                this._hideHoverIndication();
                // получить информацию об объекте переноса
                var avatarInfo = avatar.getDragInfo(event);

                this.props.dnd.onDragEnd({
                    dragZoneElement: avatarInfo.dragZone._elem,
                    dropTargetElement: this._targetElem,
                    avatar: avatar
                });

                avatar.onDragEnd(); // аватар больше не нужен, перенос успешен

                this._targetElem = null;
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Component, _extends({
                    dropTargetRef: this.setRef
                }, this.state, this.props));
            }
        }]);

        return DropTargetComponent;
    }(_DropTarget2.DropTarget);

    return DropTargetComponent;
}