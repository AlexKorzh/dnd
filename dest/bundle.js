/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dest/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DragAvatar.js":
/*!***************************!*\
  !*** ./src/DragAvatar.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DragAvatar;

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

/**
 * "Аватар" - элемент, который перетаскивается.
 *
 * В простейшем случае аватаром является сам переносимый элемент
 * Также аватар может быть клонированным элементом
 * Также аватар может быть иконкой и вообще чем угодно.
 */
function DragAvatar(dragZone, dragElem) {
  /** "родительская" зона переноса */
  this._dragZone = dragZone;

  /**
   * подэлемент родительской зоны, к которому относится аватар
   * по умолчанию - элемент, соответствующий всей зоне
   * может быть уточнен в initFromEvent
   */
  this._dragZoneElem = dragElem;

  /**
   * Сам элемент аватара, который будет носиться по экрану.
   * Инициализуется в initFromEvent
   */
  this._elem = dragElem;
}

/**
 * Инициализовать this._elem и позиционировать его
 * При необходимости уточнить this._dragZoneElem
 * @param downX Координата X нажатия мыши
 * @param downY Координата Y нажатия мыши
 * @param event Текущее событие мыши
 */
DragAvatar.prototype.initFromEvent = function (downX, downY, event) {
  /* override */
};

/**
 * Возвращает информацию о переносимом элементе для DropTarget
 * @param event
 */
DragAvatar.prototype.getDragInfo = function (event) {
  // тут может быть еще какая-то информация, необходимая для обработки конца или процесса переноса
  return {
    elem: this._elem,
    dragZoneElem: this._dragZoneElem,
    dragZone: this._dragZone
  };
};

/**
 * Возвращает текущий самый глубокий DOM-элемент под this._elem
 * Приватное свойство _currentTargetElem обновляется при каждом передвижении
 */
DragAvatar.prototype.getTargetElem = function () {
  return this._currentTargetElem;
};

/**
 * При каждом движении мыши перемещает this._elem
 * и записывает текущий элемент под this._elem в _currentTargetElem
 * @param event
 */
DragAvatar.prototype.onDragMove = function (event) {
  this._elem.style.left = event.pageX - this._shiftX + 'px';
  this._elem.style.top = event.pageY - this._shiftY + 'px';

  this._currentTargetElem = (0, _utils.getElementUnderClientXY)(this._elem, event.clientX, event.clientY);
};

/**
 * Действия с аватаром, когда перенос не удался
 * Например, можно вернуть элемент обратно или уничтожить
 */
DragAvatar.prototype.onDragCancel = function () {
  /* override */
};

/**
 * Действия с аватаром после успешного переноса
 */
DragAvatar.prototype.onDragEnd = function () {
  /* override */
};

/***/ }),

/***/ "./src/DragManager.js":
/*!****************************!*\
  !*** ./src/DragManager.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var dragManager = new function () {

    var dragZone = void 0,
        avatar = void 0,
        dropTarget = void 0;
    var downX = void 0,
        downY = void 0;

    var self = this;

    function onMouseDown(e) {

        if (e.which !== 1) {
            // не левой кнопкой
            return false;
        }

        dragZone = findDragZone(e);

        if (!dragZone) {
            return;
        }

        // запомним, что элемент нажат на текущих координатах pageX/pageY
        downX = e.pageX;
        downY = e.pageY;

        return false;
    }

    function onMouseMove(e) {
        if (!dragZone) return; // элемент не зажат

        if (!avatar) {
            // элемент нажат, но пока не начали его двигать
            if (Math.abs(e.pageX - downX) < 3 && Math.abs(e.pageY - downY) < 3) {
                return;
            }
            // попробовать захватить элемент
            avatar = dragZone.onDragStart(downX, downY, e);

            if (!avatar) {
                // не получилось, значит перенос продолжать нельзя
                cleanUp(); // очистить приватные переменные, связанные с переносом
                return;
            }
        }

        // отобразить перенос объекта, перевычислить текущий элемент под курсором
        avatar.onDragMove(e);

        // найти новый dropTarget под курсором: newDropTarget
        // текущий dropTarget остался от прошлого mousemove
        // *оба значения: и newDropTarget и dropTarget могут быть null
        var newDropTarget = findDropTarget(e);

        if (newDropTarget !== dropTarget) {
            // уведомить старую и новую зоны-цели о том, что с них ушли/на них зашли
            dropTarget && dropTarget.onDragLeave(newDropTarget, avatar, e);
            newDropTarget && newDropTarget.onDragEnter(dropTarget, avatar, e);
        }

        dropTarget = newDropTarget;

        dropTarget && dropTarget.onDragMove(avatar, e);

        return false;
    }

    function onMouseUp(e) {

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

        cleanUp();
    }

    function cleanUp() {
        // очистить все промежуточные объекты
        dragZone = avatar = dropTarget = null;
    }

    function findDragZone(event) {
        var elem = event.target;

        while (elem !== document && !elem.dragZone) {
            elem = elem.parentNode;
        }
        return elem.dragZone;
    }

    function findDropTarget(event) {
        // получить элемент под аватаром
        var elem = avatar.getTargetElem();

        while (elem !== document && !elem.dropTarget) {
            elem = elem.parentNode;
        }

        if (!elem.dropTarget) {
            return null;
        }

        return elem.dropTarget;
    }

    document.ondragstart = function () {
        return false;
    };

    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
    document.onmousedown = onMouseDown;
}();

exports.default = dragManager;

/***/ }),

/***/ "./src/DragZone.js":
/*!*************************!*\
  !*** ./src/DragZone.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DragZone;
/**
 * Зона, из которой можно переносить объекты
 * Умеет обрабатывать начало переноса на себе и создавать "аватар"
 * @param elem DOM-элемент, к которому привязана зона
 */
function DragZone(elem) {
  elem.dragZone = this;
  this._elem = elem;
}

/**
 * Создать аватар, соответствующий зоне.
 * У разных зон могут быть разные типы аватаров
 */
DragZone.prototype._makeAvatar = function () {
  /* override */
};

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
DragZone.prototype.onDragStart = function (downX, downY, event) {

  var avatar = this._makeAvatar();

  if (!avatar.initFromEvent(downX, downY, event)) {
    return false;
  }

  return avatar;
};

/***/ }),

/***/ "./src/DropTarget.js":
/*!***************************!*\
  !*** ./src/DropTarget.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DropTarget;
/**
 * Зона, в которую объекты можно класть
 * Занимается индикацией передвижения по себе, добавлением в себя
 */
function DropTarget(elem) {
  elem.dropTarget = this;
  this._elem = elem;

  /**
   * Подэлемент, над которым в настоящий момент находится аватар
   */
  this._targetElem = null;
}

/**
 * Возвращает DOM-подэлемент, над которым сейчас пролетает аватар
 *
 * @return DOM-элемент, на который можно положить или undefined
 */
DropTarget.prototype._getTargetElem = function (avatar, event) {
  return this._elem;
};

/**
 * Спрятать индикацию переноса
 * Вызывается, когда аватар уходит с текущего this._targetElem
 */
DropTarget.prototype._hideHoverIndication = function (avatar) {
  /* override */
};

/**
 * Показать индикацию переноса
 * Вызывается, когда аватар пришел на новый this._targetElem
 */
DropTarget.prototype._showHoverIndication = function (avatar) {
  /* override */
};

/**
 * Метод вызывается при каждом движении аватара
 */
DropTarget.prototype.onDragMove = function (avatar, event) {
  var newTargetElem = this._getTargetElem(avatar, event);

  if (this._targetElem !== newTargetElem) {
    this._hideHoverIndication(avatar);
    this._targetElem = newTargetElem;
    this._showHoverIndication(avatar);
  }
};

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
DropTarget.prototype.onDragEnd = function (avatar, event) {
  this._hideHoverIndication(avatar);
  this._targetElem = null;
};

/**
 * Вход аватара в DropTarget
 */
DropTarget.prototype.onDragEnter = function (fromDropTarget, avatar, event) {
  var coords = event.target.getBoundingClientRect();
  var Y = coords.top + coords.height / 2;
};

/**
 * Выход аватара из DropTarget
 */
DropTarget.prototype.onDragLeave = function (toDropTarget, avatar, event) {
  this._hideHoverIndication();
  this._targetElem = null;
};

/***/ }),

/***/ "./src/TreeDragAvatar.js":
/*!*******************************!*\
  !*** ./src/TreeDragAvatar.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DragAvatar2 = __webpack_require__(/*! ./DragAvatar */ "./src/DragAvatar.js");

var _DragAvatar3 = _interopRequireDefault(_DragAvatar2);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeDragAvatar = function (_DragAvatar) {
    _inherits(TreeDragAvatar, _DragAvatar);

    function TreeDragAvatar(dragZone, dragElem) {
        _classCallCheck(this, TreeDragAvatar);

        return _possibleConstructorReturn(this, (TreeDragAvatar.__proto__ || Object.getPrototypeOf(TreeDragAvatar)).call(this, dragZone, dragElem));
    }

    _createClass(TreeDragAvatar, [{
        key: 'initFromEvent',
        value: function initFromEvent(downX, downY, event) {
            if (event.target.tagName !== 'SPAN') return false;

            this._dragZoneElem = event.target;
            var elem = this._elem = this._dragZoneElem.cloneNode(true);
            elem.className = 'avatar';

            // создать вспомогательные свойства shiftX/shiftY
            var coords = (0, _utils.getCoords)(this._dragZoneElem);

            this._shiftX = downX - coords.left;
            this._shiftY = downY - coords.top;

            // инициировать начало переноса
            document.body.appendChild(elem);
            elem.style.zIndex = 9999;
            elem.style.position = 'absolute';

            return true;
        }
    }, {
        key: '_destroy',
        value: function _destroy() {
            this._elem.parentNode.removeChild(this._elem);
        }
    }, {
        key: 'onDragCancel',
        value: function onDragCancel() {
            this._destroy();
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd() {
            this._destroy();
        }
    }]);

    return TreeDragAvatar;
}(_DragAvatar3.default);

exports.default = TreeDragAvatar;

/***/ }),

/***/ "./src/TreeDragZone.js":
/*!*****************************!*\
  !*** ./src/TreeDragZone.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DragZone2 = __webpack_require__(/*! ./DragZone */ "./src/DragZone.js");

var _DragZone3 = _interopRequireDefault(_DragZone2);

var _TreeDragAvatar = __webpack_require__(/*! ./TreeDragAvatar */ "./src/TreeDragAvatar.js");

var _TreeDragAvatar2 = _interopRequireDefault(_TreeDragAvatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeDragZone = function (_DragZone) {
    _inherits(TreeDragZone, _DragZone);

    function TreeDragZone(elem) {
        _classCallCheck(this, TreeDragZone);

        return _possibleConstructorReturn(this, (TreeDragZone.__proto__ || Object.getPrototypeOf(TreeDragZone)).call(this, elem));
    }

    _createClass(TreeDragZone, [{
        key: '_makeAvatar',
        value: function _makeAvatar() {
            return new _TreeDragAvatar2.default(this, this._elem);
        }
    }]);

    return TreeDragZone;
}(_DragZone3.default);

exports.default = TreeDragZone;

/***/ }),

/***/ "./src/TreeDropTarget.js":
/*!*******************************!*\
  !*** ./src/TreeDropTarget.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DropTarget2 = __webpack_require__(/*! ./DropTarget */ "./src/DropTarget.js");

var _DropTarget3 = _interopRequireDefault(_DropTarget2);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeDropTarget = function (_DropTarget) {
    _inherits(TreeDropTarget, _DropTarget);

    function TreeDropTarget(elem) {
        _classCallCheck(this, TreeDropTarget);

        return _possibleConstructorReturn(this, (TreeDropTarget.__proto__ || Object.getPrototypeOf(TreeDropTarget)).call(this, elem));
    }

    _createClass(TreeDropTarget, [{
        key: '_showHoverIndication',
        value: function _showHoverIndication() {
            this._targetElem && this._targetElem.classList.add('hover');
        }
    }, {
        key: '_hideHoverIndication',
        value: function _hideHoverIndication() {
            this._targetElem && this._targetElem.classList.remove('hover');
            this._targetElem && this._targetElem.classList.remove('above');
            this._targetElem && this._targetElem.classList.remove('under');
        }
    }, {
        key: '_getTargetElem',
        value: function _getTargetElem(avatar, event) {
            var target = avatar.getTargetElem();
            if (target.tagName !== 'SPAN') {
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
        key: 'addBorder',
        value: function addBorder(border) {
            this._targetElem && this._targetElem.classList.add(border);
        }
    }, {
        key: 'removeBorder',
        value: function removeBorder(border) {
            this._targetElem && this._targetElem.classList.remove(border);
        }
    }, {
        key: 'onDragMove',
        value: function onDragMove(avatar, event) {
            _get(TreeDropTarget.prototype.__proto__ || Object.getPrototypeOf(TreeDropTarget.prototype), 'onDragMove', this).call(this, avatar, event);

            console.log(this._targetElem);

            if (this._targetElem) {
                var clientY = event.clientY;

                var _targetElem$getBoundi = this._targetElem.getBoundingClientRect(),
                    top = _targetElem$getBoundi.top,
                    height = _targetElem$getBoundi.height;

                var elementMiddle = top + height / 2;

                if (clientY < elementMiddle) {
                    // upwards
                    this.removeBorder('under');
                    this.addBorder('above');
                } else {
                    // downwards
                    this.removeBorder('above');
                    this.addBorder('under');
                }
            }
        }
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

            avatar.onDragEnd(); // аватар больше не нужен, перенос успешен

            // вставить элемент в детей в отсортированном порядке
            var elemToMove = avatarInfo.dragZoneElem.parentNode; // <LI>
            var title = avatarInfo.dragZoneElem.innerHTML; // переносимый заголовок

            // получить контейнер для узлов дерева, соответствующий точке преземления
            var ul = this._targetElem.parentNode.getElementsByTagName('UL')[0];
            if (!ul) {
                // нет детей, создадим контейнер
                ul = document.createElement('UL');
                this._targetElem.parentNode.appendChild(ul);
            }

            // вставить новый узел в нужное место среди потомков, в алфавитном порядке
            var li = null;
            for (var i = 0; i < ul.children.length; i++) {
                li = ul.children[i];
                var childTitle = li.children[0].innerHTML;
                if (childTitle > title) {
                    break;
                }
                li = null;
            }

            ul.insertBefore(elemToMove, li);

            this._targetElem = null;
        }
    }]);

    return TreeDropTarget;
}(_DropTarget3.default);

exports.default = TreeDropTarget;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _DragManager = __webpack_require__(/*! ./DragManager */ "./src/DragManager.js");

var _DragManager2 = _interopRequireDefault(_DragManager);

var _TreeDragZone = __webpack_require__(/*! ./TreeDragZone */ "./src/TreeDragZone.js");

var _TreeDragZone2 = _interopRequireDefault(_TreeDragZone);

var _TreeDropTarget = __webpack_require__(/*! ./TreeDropTarget */ "./src/TreeDropTarget.js");

var _TreeDropTarget2 = _interopRequireDefault(_TreeDropTarget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tree = document.querySelector('#tree');
var dragElement = document.querySelector('.draggable');

var treeDragZone = new _TreeDragZone2.default(tree);
var treeDropTarget = new _TreeDropTarget2.default(tree);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCoords = getCoords;
exports.getElementUnderClientXY = getElementUnderClientXY;
exports.extend = extend;
function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
        top: Math.round(top),
        left: Math.round(left)
    };
}

function getElementUnderClientXY(elem, clientX, clientY) {
    var display = elem.style.display || '';

    elem.style.display = 'none';

    var target = document.elementFromPoint(clientX, clientY);

    elem.style.display = display;

    if (!target || target == document) {
        // это бывает при выносе за границы окна
        target = document.body; // поправить значение, чтобы был именно элемент
    }

    return target;
}

function extend(Child, Parent) {
    function F() {}

    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.parent = Parent.prototype;
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RyYWdBdmF0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RyYWdNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9EcmFnWm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJvcFRhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVHJlZURyYWdBdmF0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RyZWVEcmFnWm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVHJlZURyb3BUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJEcmFnQXZhdGFyIiwiZHJhZ1pvbmUiLCJkcmFnRWxlbSIsIl9kcmFnWm9uZSIsIl9kcmFnWm9uZUVsZW0iLCJfZWxlbSIsInByb3RvdHlwZSIsImluaXRGcm9tRXZlbnQiLCJkb3duWCIsImRvd25ZIiwiZXZlbnQiLCJnZXREcmFnSW5mbyIsImVsZW0iLCJkcmFnWm9uZUVsZW0iLCJnZXRUYXJnZXRFbGVtIiwiX2N1cnJlbnRUYXJnZXRFbGVtIiwib25EcmFnTW92ZSIsInN0eWxlIiwibGVmdCIsInBhZ2VYIiwiX3NoaWZ0WCIsInRvcCIsInBhZ2VZIiwiX3NoaWZ0WSIsImNsaWVudFgiLCJjbGllbnRZIiwib25EcmFnQ2FuY2VsIiwib25EcmFnRW5kIiwiZHJhZ01hbmFnZXIiLCJhdmF0YXIiLCJkcm9wVGFyZ2V0Iiwic2VsZiIsIm9uTW91c2VEb3duIiwiZSIsIndoaWNoIiwiZmluZERyYWdab25lIiwib25Nb3VzZU1vdmUiLCJNYXRoIiwiYWJzIiwib25EcmFnU3RhcnQiLCJjbGVhblVwIiwibmV3RHJvcFRhcmdldCIsImZpbmREcm9wVGFyZ2V0Iiwib25EcmFnTGVhdmUiLCJvbkRyYWdFbnRlciIsIm9uTW91c2VVcCIsInRhcmdldCIsImRvY3VtZW50IiwicGFyZW50Tm9kZSIsIm9uZHJhZ3N0YXJ0Iiwib25tb3VzZW1vdmUiLCJvbm1vdXNldXAiLCJvbm1vdXNlZG93biIsIkRyYWdab25lIiwiX21ha2VBdmF0YXIiLCJEcm9wVGFyZ2V0IiwiX3RhcmdldEVsZW0iLCJfZ2V0VGFyZ2V0RWxlbSIsIl9oaWRlSG92ZXJJbmRpY2F0aW9uIiwiX3Nob3dIb3ZlckluZGljYXRpb24iLCJuZXdUYXJnZXRFbGVtIiwiZnJvbURyb3BUYXJnZXQiLCJjb29yZHMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJZIiwiaGVpZ2h0IiwidG9Ecm9wVGFyZ2V0IiwiVHJlZURyYWdBdmF0YXIiLCJ0YWdOYW1lIiwiY2xvbmVOb2RlIiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwiekluZGV4IiwicG9zaXRpb24iLCJyZW1vdmVDaGlsZCIsIl9kZXN0cm95IiwiVHJlZURyYWdab25lIiwiVHJlZURyb3BUYXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJlbGVtVG9Nb3ZlIiwiYm9yZGVyIiwiY29uc29sZSIsImxvZyIsImVsZW1lbnRNaWRkbGUiLCJyZW1vdmVCb3JkZXIiLCJhZGRCb3JkZXIiLCJhdmF0YXJJbmZvIiwidGl0bGUiLCJpbm5lckhUTUwiLCJ1bCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY3JlYXRlRWxlbWVudCIsImxpIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiY2hpbGRUaXRsZSIsImluc2VydEJlZm9yZSIsInRyZWUiLCJxdWVyeVNlbGVjdG9yIiwiZHJhZ0VsZW1lbnQiLCJ0cmVlRHJhZ1pvbmUiLCJ0cmVlRHJvcFRhcmdldCIsImdldENvb3JkcyIsImdldEVsZW1lbnRVbmRlckNsaWVudFhZIiwiZXh0ZW5kIiwiYm94IiwiZG9jRWxlbSIsImRvY3VtZW50RWxlbWVudCIsInNjcm9sbFRvcCIsIndpbmRvdyIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsTGVmdCIsInBhZ2VYT2Zmc2V0IiwiY2xpZW50VG9wIiwiY2xpZW50TGVmdCIsInJvdW5kIiwiZGlzcGxheSIsImVsZW1lbnRGcm9tUG9pbnQiLCJDaGlsZCIsIlBhcmVudCIsIkYiLCJjb25zdHJ1Y3RvciIsInBhcmVudCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQzFFd0JBLFU7O0FBUnhCOztBQUNBOzs7Ozs7O0FBT2UsU0FBU0EsVUFBVCxDQUFvQkMsUUFBcEIsRUFBOEJDLFFBQTlCLEVBQXdDO0FBQ25EO0FBQ0EsT0FBS0MsU0FBTCxHQUFpQkYsUUFBakI7O0FBRUE7Ozs7O0FBS0EsT0FBS0csYUFBTCxHQUFxQkYsUUFBckI7O0FBRUE7Ozs7QUFJQSxPQUFLRyxLQUFMLEdBQWFILFFBQWI7QUFDSDs7QUFFRDs7Ozs7OztBQU9BRixXQUFXTSxTQUFYLENBQXFCQyxhQUFyQixHQUFxQyxVQUFTQyxLQUFULEVBQWdCQyxLQUFoQixFQUF1QkMsS0FBdkIsRUFBOEI7QUFDL0Q7QUFDSCxDQUZEOztBQUlB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LEVBQWlEQyxPQUFqRCxFQUEwRDtBQUM3RCxRQUFJK0YsVUFBVTVHLEtBQUtLLEtBQUwsQ0FBV3VHLE9BQVgsSUFBc0IsRUFBcEM7O0FBRUE1RyxTQUFLSyxLQUFMLENBQVd1RyxPQUFYLEdBQXFCLE1BQXJCOztBQUVBLFFBQUkxRSxTQUFTQyxTQUFTMEUsZ0JBQVQsQ0FBMEJqRyxPQUExQixFQUFtQ0MsT0FBbkMsQ0FBYjs7QUFFQWIsU0FBS0ssS0FBTCxDQUFXdUcsT0FBWCxHQUFxQkEsT0FBckI7O0FBRUEsUUFBSSxDQUFDMUUsTUFBRCxJQUFXQSxVQUFVQyxRQUF6QixFQUFtQztBQUFFO0FBQ2pDRCxpQkFBU0MsU0FBU3dCLElBQWxCLENBRCtCLENBQ1A7QUFDM0I7O0FBRUQsV0FBT3pCLE1BQVA7QUFDSDs7QUFFTSxTQUFTOEQsTUFBVCxDQUFpQmMsS0FBakIsRUFBd0JDLE1BQXhCLEVBQWdDO0FBQ25DLGFBQVNDLENBQVQsR0FBYSxDQUFFOztBQUVmQSxNQUFFdEgsU0FBRixHQUFjcUgsT0FBT3JILFNBQXJCO0FBQ0FvSCxVQUFNcEgsU0FBTixHQUFrQixJQUFJc0gsQ0FBSixFQUFsQjtBQUNBRixVQUFNcEgsU0FBTixDQUFnQnVILFdBQWhCLEdBQThCSCxLQUE5QjtBQUNBQSxVQUFNSSxNQUFOLEdBQWVILE9BQU9ySCxTQUF0QjtBQUNILEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGVzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBnZXRFbGVtZW50VW5kZXJDbGllbnRYWSB9IGZyb20gJy4vdXRpbHMnO1xuLyoqXG4gKiBcItCQ0LLQsNGC0LDRgFwiIC0g0Y3Qu9C10LzQtdC90YIsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10YLQsNGB0LrQuNCy0LDQtdGC0YHRjy5cbiAqXG4gKiDQkiDQv9GA0L7RgdGC0LXQudGI0LXQvCDRgdC70YPRh9Cw0LUg0LDQstCw0YLQsNGA0L7QvCDRj9Cy0LvRj9C10YLRgdGPINGB0LDQvCDQv9C10YDQtdC90L7RgdC40LzRi9C5INGN0LvQtdC80LXQvdGCXG4gKiDQotCw0LrQttC1INCw0LLQsNGC0LDRgCDQvNC+0LbQtdGCINCx0YvRgtGMINC60LvQvtC90LjRgNC+0LLQsNC90L3Ri9C8INGN0LvQtdC80LXQvdGC0L7QvFxuICog0KLQsNC60LbQtSDQsNCy0LDRgtCw0YAg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNC60L7QvdC60L7QuSDQuCDQstC+0L7QsdGJ0LUg0YfQtdC8INGD0LPQvtC00L3Qvi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHJhZ0F2YXRhcihkcmFnWm9uZSwgZHJhZ0VsZW0pIHtcbiAgICAvKiogXCLRgNC+0LTQuNGC0LXQu9GM0YHQutCw0Y9cIiDQt9C+0L3QsCDQv9C10YDQtdC90L7RgdCwICovXG4gICAgdGhpcy5fZHJhZ1pvbmUgPSBkcmFnWm9uZTtcblxuICAgIC8qKlxuICAgICAqINC/0L7QtNGN0LvQtdC80LXQvdGCINGA0L7QtNC40YLQtdC70YzRgdC60L7QuSDQt9C+0L3Riywg0Log0LrQvtGC0L7RgNC+0LzRgyDQvtGC0L3QvtGB0LjRgtGB0Y8g0LDQstCw0YLQsNGAXG4gICAgICog0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4gLSDRjdC70LXQvNC10L3Rgiwg0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQuNC5INCy0YHQtdC5INC30L7QvdC1XG4gICAgICog0LzQvtC20LXRgiDQsdGL0YLRjCDRg9GC0L7Rh9C90LXQvSDQsiBpbml0RnJvbUV2ZW50XG4gICAgICovXG4gICAgdGhpcy5fZHJhZ1pvbmVFbGVtID0gZHJhZ0VsZW07XG5cbiAgICAvKipcbiAgICAgKiDQodCw0Lwg0Y3Qu9C10LzQtdC90YIg0LDQstCw0YLQsNGA0LAsINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L3QvtGB0LjRgtGM0YHRjyDQv9C+INGN0LrRgNCw0L3Rgy5cbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfRg9C10YLRgdGPINCyIGluaXRGcm9tRXZlbnRcbiAgICAgKi9cbiAgICB0aGlzLl9lbGVtID0gZHJhZ0VsZW07XG59XG5cbi8qKlxuICog0JjQvdC40YbQuNCw0LvQuNC30L7QstCw0YLRjCB0aGlzLl9lbGVtINC4INC/0L7Qt9C40YbQuNC+0L3QuNGA0L7QstCw0YLRjCDQtdCz0L5cbiAqINCf0YDQuCDQvdC10L7QsdGF0L7QtNC40LzQvtGB0YLQuCDRg9GC0L7Rh9C90LjRgtGMIHRoaXMuX2RyYWdab25lRWxlbVxuICogQHBhcmFtIGRvd25YINCa0L7QvtGA0LTQuNC90LDRgtCwIFgg0L3QsNC20LDRgtC40Y8g0LzRi9GI0LhcbiAqIEBwYXJhbSBkb3duWSDQmtC+0L7RgNC00LjQvdCw0YLQsCBZINC90LDQttCw0YLQuNGPINC80YvRiNC4XG4gKiBAcGFyYW0gZXZlbnQg0KLQtdC60YPRidC10LUg0YHQvtCx0YvRgtC40LUg0LzRi9GI0LhcbiAqL1xuRHJhZ0F2YXRhci5wcm90b3R5cGUuaW5pdEZyb21FdmVudCA9IGZ1bmN0aW9uKGRvd25YLCBkb3duWSwgZXZlbnQpIHtcbiAgICAvKiBvdmVycmlkZSAqL1xufTtcblxuLyoqXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDQuNC90YTQvtGA0LzQsNGG0LjRjiDQviDQv9C10YDQtdC90L7RgdC40LzQvtC8INGN0LvQtdC80LXQvdGC0LUg0LTQu9GPIERyb3BUYXJnZXRcbiAqIEBwYXJhbSBldmVudFxuICovXG5EcmFnQXZhdGFyLnByb3RvdHlwZS5nZXREcmFnSW5mbyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8g0YLRg9GCINC80L7QttC10YIg0LHRi9GC0Ywg0LXRidC1INC60LDQutCw0Y8t0YLQviDQuNC90YTQvtGA0LzQsNGG0LjRjywg0L3QtdC+0LHRhdC+0LTQuNC80LDRjyDQtNC70Y8g0L7QsdGA0LDQsdC+0YLQutC4INC60L7QvdGG0LAg0LjQu9C4INC/0YDQvtGG0LXRgdGB0LAg0L/QtdGA0LXQvdC+0YHQsFxuICAgIHJldHVybiB7XG4gICAgICAgIGVsZW06IHRoaXMuX2VsZW0sXG4gICAgICAgIGRyYWdab25lRWxlbTogdGhpcy5fZHJhZ1pvbmVFbGVtLFxuICAgICAgICBkcmFnWm9uZTogdGhpcy5fZHJhZ1pvbmVcbiAgICB9O1xufTtcblxuLyoqXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgtC10LrRg9GJ0LjQuSDRgdCw0LzRi9C5INCz0LvRg9Cx0L7QutC40LkgRE9NLdGN0LvQtdC80LXQvdGCINC/0L7QtCB0aGlzLl9lbGVtXG4gKiDQn9GA0LjQstCw0YLQvdC+0LUg0YHQstC+0LnRgdGC0LLQviBfY3VycmVudFRhcmdldEVsZW0g0L7QsdC90L7QstC70Y/QtdGC0YHRjyDQv9GA0Lgg0LrQsNC20LTQvtC8INC/0LXRgNC10LTQstC40LbQtdC90LjQuFxuICovXG5EcmFnQXZhdGFyLnByb3RvdHlwZS5nZXRUYXJnZXRFbGVtID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRUYXJnZXRFbGVtO1xufTtcblxuLyoqXG4gKiDQn9GA0Lgg0LrQsNC20LTQvtC8INC00LLQuNC20LXQvdC40Lgg0LzRi9GI0Lgg0L/QtdGA0LXQvNC10YnQsNC10YIgdGhpcy5fZWxlbVxuICog0Lgg0LfQsNC/0LjRgdGL0LLQsNC10YIg0YLQtdC60YPRidC40Lkg0Y3Qu9C10LzQtdC90YIg0L/QvtC0IHRoaXMuX2VsZW0g0LIgX2N1cnJlbnRUYXJnZXRFbGVtXG4gKiBAcGFyYW0gZXZlbnRcbiAqL1xuRHJhZ0F2YXRhci5wcm90b3R5cGUub25EcmFnTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5fZWxlbS5zdHlsZS5sZWZ0ID0gZXZlbnQucGFnZVggLSB0aGlzLl9zaGlmdFggKyAncHgnO1xuICAgIHRoaXMuX2VsZW0uc3R5bGUudG9wID0gZXZlbnQucGFnZVkgLSB0aGlzLl9zaGlmdFkgKyAncHgnO1xuXG4gICAgdGhpcy5fY3VycmVudFRhcmdldEVsZW0gPSBnZXRFbGVtZW50VW5kZXJDbGllbnRYWSh0aGlzLl9lbGVtLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbn07XG5cbi8qKlxuICog0JTQtdC50YHRgtCy0LjRjyDRgSDQsNCy0LDRgtCw0YDQvtC8LCDQutC+0LPQtNCwINC/0LXRgNC10L3QvtGBINC90LUg0YPQtNCw0LvRgdGPXG4gKiDQndCw0L/RgNC40LzQtdGALCDQvNC+0LbQvdC+INCy0LXRgNC90YPRgtGMINGN0LvQtdC80LXQvdGCINC+0LHRgNCw0YLQvdC+INC40LvQuCDRg9C90LjRh9GC0L7QttC40YLRjFxuICovXG5EcmFnQXZhdGFyLnByb3RvdHlwZS5vbkRyYWdDYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAvKiBvdmVycmlkZSAqL1xufTtcblxuLyoqXG4gKiDQlNC10LnRgdGC0LLQuNGPINGBINCw0LLQsNGC0LDRgNC+0Lwg0L/QvtGB0LvQtSDRg9GB0L/QtdGI0L3QvtCz0L4g0L/QtdGA0LXQvdC+0YHQsFxuICovXG5EcmFnQXZhdGFyLnByb3RvdHlwZS5vbkRyYWdFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAvKiBvdmVycmlkZSAqL1xufTtcbiIsImxldCBkcmFnTWFuYWdlciA9IG5ldyBmdW5jdGlvbigpIHtcblxuICAgIGxldCBkcmFnWm9uZSwgYXZhdGFyLCBkcm9wVGFyZ2V0O1xuICAgIGxldCBkb3duWCwgZG93blk7XG5cbiAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG5cbiAgICAgICAgaWYgKGUud2hpY2ggIT09IDEpIHsgLy8g0L3QtSDQu9C10LLQvtC5INC60L3QvtC/0LrQvtC5XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBkcmFnWm9uZSA9IGZpbmREcmFnWm9uZShlKTtcblxuICAgICAgICBpZiAoIWRyYWdab25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQt9Cw0L/QvtC80L3QuNC8LCDRh9GC0L4g0Y3Qu9C10LzQtdC90YIg0L3QsNC20LDRgiDQvdCwINGC0LXQutGD0YnQuNGFINC60L7QvtGA0LTQuNC90LDRgtCw0YUgcGFnZVgvcGFnZVlcbiAgICAgICAgZG93blggPSBlLnBhZ2VYO1xuICAgICAgICBkb3duWSA9IGUucGFnZVk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VNb3ZlKGUpIHtcbiAgICAgICAgaWYgKCFkcmFnWm9uZSkgcmV0dXJuOyAvLyDRjdC70LXQvNC10L3RgiDQvdC1INC30LDQttCw0YJcblxuICAgICAgICBpZiAoIWF2YXRhcikgeyAvLyDRjdC70LXQvNC10L3RgiDQvdCw0LbQsNGCLCDQvdC+INC/0L7QutCwINC90LUg0L3QsNGH0LDQu9C4INC10LPQviDQtNCy0LjQs9Cw0YLRjFxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGUucGFnZVggLSBkb3duWCkgPCAzICYmIE1hdGguYWJzKGUucGFnZVkgLSBkb3duWSkgPCAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g0L/QvtC/0YDQvtCx0L7QstCw0YLRjCDQt9Cw0YXQstCw0YLQuNGC0Ywg0Y3Qu9C10LzQtdC90YJcbiAgICAgICAgICAgIGF2YXRhciA9IGRyYWdab25lLm9uRHJhZ1N0YXJ0KGRvd25YLCBkb3duWSwgZSk7XG5cbiAgICAgICAgICAgIGlmICghYXZhdGFyKSB7IC8vINC90LUg0L/QvtC70YPRh9C40LvQvtGB0YwsINC30L3QsNGH0LjRgiDQv9C10YDQtdC90L7RgSDQv9GA0L7QtNC+0LvQttCw0YLRjCDQvdC10LvRjNC30Y9cbiAgICAgICAgICAgICAgICBjbGVhblVwKCk7IC8vINC+0YfQuNGB0YLQuNGC0Ywg0L/RgNC40LLQsNGC0L3Ri9C1INC/0LXRgNC10LzQtdC90L3Ri9C1LCDRgdCy0Y/Qt9Cw0L3QvdGL0LUg0YEg0L/QtdGA0LXQvdC+0YHQvtC8XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g0L7RgtC+0LHRgNCw0LfQuNGC0Ywg0L/QtdGA0LXQvdC+0YEg0L7QsdGK0LXQutGC0LAsINC/0LXRgNC10LLRi9GH0LjRgdC70LjRgtGMINGC0LXQutGD0YnQuNC5INGN0LvQtdC80LXQvdGCINC/0L7QtCDQutGD0YDRgdC+0YDQvtC8XG4gICAgICAgIGF2YXRhci5vbkRyYWdNb3ZlKGUpO1xuXG4gICAgICAgIC8vINC90LDQudGC0Lgg0L3QvtCy0YvQuSBkcm9wVGFyZ2V0INC/0L7QtCDQutGD0YDRgdC+0YDQvtC8OiBuZXdEcm9wVGFyZ2V0XG4gICAgICAgIC8vINGC0LXQutGD0YnQuNC5IGRyb3BUYXJnZXQg0L7RgdGC0LDQu9GB0Y8g0L7RgiDQv9GA0L7RiNC70L7Qs9C+IG1vdXNlbW92ZVxuICAgICAgICAvLyAq0L7QsdCwINC30L3QsNGH0LXQvdC40Y86INC4IG5ld0Ryb3BUYXJnZXQg0LggZHJvcFRhcmdldCDQvNC+0LPRg9GCINCx0YvRgtGMIG51bGxcbiAgICAgICAgbGV0IG5ld0Ryb3BUYXJnZXQgPSBmaW5kRHJvcFRhcmdldChlKTtcblxuICAgICAgICBpZiAobmV3RHJvcFRhcmdldCAhPT0gZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgLy8g0YPQstC10LTQvtC80LjRgtGMINGB0YLQsNGA0YPRjiDQuCDQvdC+0LLRg9GOINC30L7QvdGLLdGG0LXQu9C4INC+INGC0L7QvCwg0YfRgtC+INGBINC90LjRhSDRg9GI0LvQuC/QvdCwINC90LjRhSDQt9Cw0YjQu9C4XG4gICAgICAgICAgICBkcm9wVGFyZ2V0ICYmIGRyb3BUYXJnZXQub25EcmFnTGVhdmUobmV3RHJvcFRhcmdldCwgYXZhdGFyLCBlKTtcbiAgICAgICAgICAgIG5ld0Ryb3BUYXJnZXQgJiYgbmV3RHJvcFRhcmdldC5vbkRyYWdFbnRlcihkcm9wVGFyZ2V0LCBhdmF0YXIsIGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZHJvcFRhcmdldCA9IG5ld0Ryb3BUYXJnZXQ7XG5cbiAgICAgICAgZHJvcFRhcmdldCAmJiBkcm9wVGFyZ2V0Lm9uRHJhZ01vdmUoYXZhdGFyLCBlKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKGUpIHtcblxuICAgICAgICBpZiAoZS53aGljaCAhPT0gMSkgeyAvLyDQvdC1INC70LXQstC+0Lkg0LrQvdC+0L/QutC+0LlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhdmF0YXIpIHsgLy8g0LXRgdC70Lgg0YPQttC1INC90LDRh9Cw0LvQuCDQv9C10YDQtdC00LLQuNCz0LDRgtGMXG5cbiAgICAgICAgICAgIGlmIChkcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8g0LfQsNCy0LXRgNGI0LjRgtGMINC/0LXRgNC10L3QvtGBINC4INC40LfQsdCw0LLQuNGC0YzRgdGPINC+0YIg0LDQstCw0YLQsNGA0LAsINC10YHQu9C4INGN0YLQviDQvdGD0LbQvdC+XG4gICAgICAgICAgICAgICAgLy8g0Y3RgtCwINGE0YPQvdC60YbQuNGPINC+0LHRj9C30LDQvdCwINCy0YvQt9Cy0LDRgtGMIGF2YXRhci5vbkRyYWdFbmQvb25EcmFnQ2FuY2VsXG4gICAgICAgICAgICAgICAgZHJvcFRhcmdldC5vbkRyYWdFbmQoYXZhdGFyLCBlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXZhdGFyLm9uRHJhZ0NhbmNlbCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjbGVhblVwKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW5VcCgpIHtcbiAgICAgICAgLy8g0L7Rh9C40YHRgtC40YLRjCDQstGB0LUg0L/RgNC+0LzQtdC20YPRgtC+0YfQvdGL0LUg0L7QsdGK0LXQutGC0YtcbiAgICAgICAgZHJhZ1pvbmUgPSBhdmF0YXIgPSBkcm9wVGFyZ2V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kRHJhZ1pvbmUoZXZlbnQpIHtcbiAgICAgICAgbGV0IGVsZW0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHdoaWxlIChlbGVtICE9PSBkb2N1bWVudCAmJiAhZWxlbS5kcmFnWm9uZSkge1xuICAgICAgICAgICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbS5kcmFnWm9uZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kRHJvcFRhcmdldChldmVudCkge1xuICAgICAgICAvLyDQv9C+0LvRg9GH0LjRgtGMINGN0LvQtdC80LXQvdGCINC/0L7QtCDQsNCy0LDRgtCw0YDQvtC8XG4gICAgICAgIGxldCBlbGVtID0gYXZhdGFyLmdldFRhcmdldEVsZW0oKTtcblxuICAgICAgICB3aGlsZSAoZWxlbSAhPT0gZG9jdW1lbnQgJiYgIWVsZW0uZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZWxlbS5kcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtLmRyb3BUYXJnZXQ7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQub25kcmFnc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG9uTW91c2VNb3ZlO1xuICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9IG9uTW91c2VVcDtcbiAgICBkb2N1bWVudC5vbm1vdXNlZG93biA9IG9uTW91c2VEb3duO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZHJhZ01hbmFnZXI7XG4iLCIvKipcbiAqINCX0L7QvdCwLCDQuNC3INC60L7RgtC+0YDQvtC5INC80L7QttC90L4g0L/QtdGA0LXQvdC+0YHQuNGC0Ywg0L7QsdGK0LXQutGC0YtcbiAqINCj0LzQtdC10YIg0L7QsdGA0LDQsdCw0YLRi9Cy0LDRgtGMINC90LDRh9Cw0LvQviDQv9C10YDQtdC90L7RgdCwINC90LAg0YHQtdCx0LUg0Lgg0YHQvtC30LTQsNCy0LDRgtGMIFwi0LDQstCw0YLQsNGAXCJcbiAqIEBwYXJhbSBlbGVtIERPTS3RjdC70LXQvNC10L3Rgiwg0Log0LrQvtGC0L7RgNC+0LzRgyDQv9GA0LjQstGP0LfQsNC90LAg0LfQvtC90LBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHJhZ1pvbmUoZWxlbSkge1xuICBlbGVtLmRyYWdab25lID0gdGhpcztcbiAgdGhpcy5fZWxlbSA9IGVsZW07XG59XG5cbi8qKlxuICog0KHQvtC30LTQsNGC0Ywg0LDQstCw0YLQsNGALCDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0Y7RidC40Lkg0LfQvtC90LUuXG4gKiDQoyDRgNCw0LfQvdGL0YUg0LfQvtC9INC80L7Qs9GD0YIg0LHRi9GC0Ywg0YDQsNC30L3Ri9C1INGC0LjQv9GLINCw0LLQsNGC0LDRgNC+0LJcbiAqL1xuRHJhZ1pvbmUucHJvdG90eXBlLl9tYWtlQXZhdGFyID0gZnVuY3Rpb24oKSB7XG4gIC8qIG92ZXJyaWRlICovXG59O1xuXG4vKipcbiAqINCe0LHRgNCw0LHQvtGC0LDRgtGMINC90LDRh9Cw0LvQviDQv9C10YDQtdC90L7RgdCwLlxuICpcbiAqINCf0L7Qu9GD0YfQsNC10YIg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0LjQt9C90LDRh9Cw0LvRjNC90L7Qs9C+INC90LDQttCw0YLQuNGPINC80YvRiNC60LgsINGB0L7QsdGL0YLQuNC1LlxuICpcbiAqIEBwYXJhbSBkb3duWCDQmtC+0L7RgNC00LjQvdCw0YLQsCDQuNC30L3QsNGH0LDQu9GM0L3QvtCz0L4g0L3QsNC20LDRgtC40Y8g0L/QviBYXG4gKiBAcGFyYW0gZG93blkg0JrQvtC+0YDQtNC40L3QsNGC0LAg0LjQt9C90LDRh9Cw0LvRjNC90L7Qs9C+INC90LDQttCw0YLQuNGPINC/0L4gWVxuICogQHBhcmFtIGV2ZW50INGC0LXQutGD0YnQtdC1INGB0L7QsdGL0YLQuNC1INC80YvRiNC4XG4gKlxuICogQHJldHVybiDQsNCy0LDRgtCw0YAg0LjQu9C4IGZhbHNlLCDQtdGB0LvQuCDQt9Cw0YXQstCw0YLQuNGC0Ywg0YEg0LTQsNC90L3QvtC5INGC0L7Rh9C60Lgg0L3QuNGH0LXQs9C+INC90LXQu9GM0LfRj1xuICovXG5EcmFnWm9uZS5wcm90b3R5cGUub25EcmFnU3RhcnQgPSBmdW5jdGlvbihkb3duWCwgZG93blksIGV2ZW50KSB7XG5cbiAgbGV0IGF2YXRhciA9IHRoaXMuX21ha2VBdmF0YXIoKTtcblxuICBpZiAoIWF2YXRhci5pbml0RnJvbUV2ZW50KGRvd25YLCBkb3duWSwgZXZlbnQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGF2YXRhcjtcbn07XG4iLCIvKipcbiAqINCX0L7QvdCwLCDQsiDQutC+0YLQvtGA0YPRjiDQvtCx0YrQtdC60YLRiyDQvNC+0LbQvdC+INC60LvQsNGB0YLRjFxuICog0JfQsNC90LjQvNCw0LXRgtGB0Y8g0LjQvdC00LjQutCw0YbQuNC10Lkg0L/QtdGA0LXQtNCy0LjQttC10L3QuNGPINC/0L4g0YHQtdCx0LUsINC00L7QsdCw0LLQu9C10L3QuNC10Lwg0LIg0YHQtdCx0Y9cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHJvcFRhcmdldChlbGVtKSB7XG4gICAgZWxlbS5kcm9wVGFyZ2V0ID0gdGhpcztcbiAgICB0aGlzLl9lbGVtID0gZWxlbTtcblxuICAgIC8qKlxuICAgICAqINCf0L7QtNGN0LvQtdC80LXQvdGCLCDQvdCw0LQg0LrQvtGC0L7RgNGL0Lwg0LIg0L3QsNGB0YLQvtGP0YnQuNC5INC80L7QvNC10L3RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LDQstCw0YLQsNGAXG4gICAgICovXG4gICAgdGhpcy5fdGFyZ2V0RWxlbSA9IG51bGw7XG59XG5cbi8qKlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIgRE9NLdC/0L7QtNGN0LvQtdC80LXQvdGCLCDQvdCw0LQg0LrQvtGC0L7RgNGL0Lwg0YHQtdC50YfQsNGBINC/0YDQvtC70LXRgtCw0LXRgiDQsNCy0LDRgtCw0YBcbiAqXG4gKiBAcmV0dXJuIERPTS3RjdC70LXQvNC10L3Rgiwg0L3QsCDQutC+0YLQvtGA0YvQuSDQvNC+0LbQvdC+INC/0L7Qu9C+0LbQuNGC0Ywg0LjQu9C4IHVuZGVmaW5lZFxuICovXG5Ecm9wVGFyZ2V0LnByb3RvdHlwZS5fZ2V0VGFyZ2V0RWxlbSA9IGZ1bmN0aW9uKGF2YXRhciwgZXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbTtcbn07XG5cbi8qKlxuICog0KHQv9GA0Y/RgtCw0YLRjCDQuNC90LTQuNC60LDRhtC40Y4g0L/QtdGA0LXQvdC+0YHQsFxuICog0JLRi9C30YvQstCw0LXRgtGB0Y8sINC60L7Qs9C00LAg0LDQstCw0YLQsNGAINGD0YXQvtC00LjRgiDRgSDRgtC10LrRg9GJ0LXQs9C+IHRoaXMuX3RhcmdldEVsZW1cbiAqL1xuRHJvcFRhcmdldC5wcm90b3R5cGUuX2hpZGVIb3ZlckluZGljYXRpb24gPSBmdW5jdGlvbihhdmF0YXIpIHtcbiAgICAvKiBvdmVycmlkZSAqL1xufTtcblxuLyoqXG4gKiDQn9C+0LrQsNC30LDRgtGMINC40L3QtNC40LrQsNGG0LjRjiDQv9C10YDQtdC90L7RgdCwXG4gKiDQktGL0LfRi9Cy0LDQtdGC0YHRjywg0LrQvtCz0LTQsCDQsNCy0LDRgtCw0YAg0L/RgNC40YjQtdC7INC90LAg0L3QvtCy0YvQuSB0aGlzLl90YXJnZXRFbGVtXG4gKi9cbkRyb3BUYXJnZXQucHJvdG90eXBlLl9zaG93SG92ZXJJbmRpY2F0aW9uID0gZnVuY3Rpb24oYXZhdGFyKSB7XG4gICAgLyogb3ZlcnJpZGUgKi9cbn07XG5cbi8qKlxuICog0JzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LrQsNC20LTQvtC8INC00LLQuNC20LXQvdC40Lgg0LDQstCw0YLQsNGA0LBcbiAqL1xuRHJvcFRhcmdldC5wcm90b3R5cGUub25EcmFnTW92ZSA9IGZ1bmN0aW9uKGF2YXRhciwgZXZlbnQpIHtcbiAgICBsZXQgbmV3VGFyZ2V0RWxlbSA9IHRoaXMuX2dldFRhcmdldEVsZW0oYXZhdGFyLCBldmVudCk7XG5cbiAgICBpZiAodGhpcy5fdGFyZ2V0RWxlbSAhPT0gbmV3VGFyZ2V0RWxlbSkge1xuICAgICAgICB0aGlzLl9oaWRlSG92ZXJJbmRpY2F0aW9uKGF2YXRhcik7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsZW0gPSBuZXdUYXJnZXRFbGVtO1xuICAgICAgICB0aGlzLl9zaG93SG92ZXJJbmRpY2F0aW9uKGF2YXRhcik7XG4gICAgfVxufTtcblxuLyoqXG4gKiDQl9Cw0LLQtdGA0YjQtdC90LjQtSDQv9C10YDQtdC90L7RgdCwLlxuICog0JDQu9Cz0L7RgNC40YLQvCDQvtCx0YDQsNCx0L7RgtC60LggKNC/0LXRgNC10L7Qv9GA0LXQtNC10LvQuNGC0Ywg0YTRg9C90LrRhtC40Y4g0Lgg0L3QsNC/0LjRgdCw0YLRjCDQsiDQv9C+0YLQvtC80LrQtSk6XG4gKiAxLiDQn9C+0LvRg9GH0LjRgtGMINC00LDQvdC90YvQtSDQv9C10YDQtdC90L7RgdCwINC40LcgYXZhdGFyLmdldERyYWdJbmZvKClcbiAqIDIuINCe0L/RgNC10LTQtdC70LjRgtGMLCDQstC+0LfQvNC+0LbQtdC9INC70Lgg0L/QtdGA0LXQvdC+0YEg0L3QsCBfdGFyZ2V0RWxlbSAo0LXRgdC70Lgg0L7QvSDQtdGB0YLRjClcbiAqIDMuINCS0YvQt9Cy0LDRgtGMIGF2YXRhci5vbkRyYWdFbmQoKSDQuNC70LggYXZhdGFyLm9uRHJhZ0NhbmNlbCgpXG4gKiAg0JXRgdC70Lgg0L3Rg9C20L3QviDQv9C+0LTRgtCy0LXRgNC00LjRgtGMINC/0LXRgNC10L3QvtGBINC30LDQv9GA0L7RgdC+0Lwg0L3QsCDRgdC10YDQstC10YAsINGC0L4gYXZhdGFyLm9uRHJhZ0VuZCgpLFxuICogINCwINC30LDRgtC10Lwg0LDRgdC40L3RhdGA0L7QvdC90L4sINC10YHQu9C4INGB0LXRgNCy0LXRgCDQstC10YDQvdGD0Lsg0L7RiNC40LHQutGDLCBhdmF0YXIub25EcmFnQ2FuY2VsKClcbiAqICDQn9GA0Lgg0Y3RgtC+0Lwg0LDQstCw0YLQsNGAINC00L7Qu9C20LXQvSDRg9C80LXRgtGMIFwi0L7RgtC60LDRgtGL0LLQsNGC0YzRgdGPXCIg0L/QvtGB0LvQtSBvbkRyYWdFbmQuXG4gKlxuICog0J/RgNC4INC70Y7QsdC+0Lwg0LfQsNCy0LXRgNGI0LXQvdC40Lgg0Y3RgtC+0LPQviDQvNC10YLQvtC00LAg0L3Rg9C20L3QviAo0LTQtdC70LDQtdGC0YHRjyDQvdC40LbQtSk6XG4gKiAg0YHQvdGP0YLRjCDRgtC10LrRg9GJ0YPRjiDQuNC90LTQuNC60LDRhtC40Y4g0L/QtdGA0LXQvdC+0YHQsFxuICogINC+0LHQvdGD0LvQuNGC0YwgdGhpcy5fdGFyZ2V0RWxlbVxuICovXG5Ecm9wVGFyZ2V0LnByb3RvdHlwZS5vbkRyYWdFbmQgPSBmdW5jdGlvbihhdmF0YXIsIGV2ZW50KSB7XG4gICAgdGhpcy5faGlkZUhvdmVySW5kaWNhdGlvbihhdmF0YXIpO1xuICAgIHRoaXMuX3RhcmdldEVsZW0gPSBudWxsO1xufTtcblxuLyoqXG4gKiDQktGF0L7QtCDQsNCy0LDRgtCw0YDQsCDQsiBEcm9wVGFyZ2V0XG4gKi9cbkRyb3BUYXJnZXQucHJvdG90eXBlLm9uRHJhZ0VudGVyID0gZnVuY3Rpb24oZnJvbURyb3BUYXJnZXQsIGF2YXRhciwgZXZlbnQpIHtcbiAgICBjb25zdCBjb29yZHMgPSBldmVudC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgWSA9IGNvb3Jkcy50b3AgKyBjb29yZHMuaGVpZ2h0IC8gMjtcbn07XG5cbi8qKlxuICog0JLRi9GF0L7QtCDQsNCy0LDRgtCw0YDQsCDQuNC3IERyb3BUYXJnZXRcbiAqL1xuRHJvcFRhcmdldC5wcm90b3R5cGUub25EcmFnTGVhdmUgPSBmdW5jdGlvbih0b0Ryb3BUYXJnZXQsIGF2YXRhciwgZXZlbnQpIHtcbiAgICB0aGlzLl9oaWRlSG92ZXJJbmRpY2F0aW9uKCk7XG4gICAgdGhpcy5fdGFyZ2V0RWxlbSA9IG51bGw7XG59O1xuIiwiaW1wb3J0IERyYWdBdmF0YXIgZnJvbSAnLi9EcmFnQXZhdGFyJztcbmltcG9ydCB7Z2V0Q29vcmRzfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlZURyYWdBdmF0YXIgZXh0ZW5kcyBEcmFnQXZhdGFyIHtcbiAgICBjb25zdHJ1Y3RvciAoZHJhZ1pvbmUsIGRyYWdFbGVtKSB7XG4gICAgICAgIHN1cGVyKGRyYWdab25lLCBkcmFnRWxlbSk7XG4gICAgfVxuXG4gICAgaW5pdEZyb21FdmVudCAoZG93blgsIGRvd25ZLCBldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgIT09ICdTUEFOJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2RyYWdab25lRWxlbSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtID0gdGhpcy5fZHJhZ1pvbmVFbGVtLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgZWxlbS5jbGFzc05hbWUgPSAnYXZhdGFyJztcblxuICAgICAgICAvLyDRgdC+0LfQtNCw0YLRjCDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0YHQstC+0LnRgdGC0LLQsCBzaGlmdFgvc2hpZnRZXG4gICAgICAgIGxldCBjb29yZHMgPSBnZXRDb29yZHModGhpcy5fZHJhZ1pvbmVFbGVtKTtcblxuICAgICAgICB0aGlzLl9zaGlmdFggPSBkb3duWCAtIGNvb3Jkcy5sZWZ0O1xuICAgICAgICB0aGlzLl9zaGlmdFkgPSBkb3duWSAtIGNvb3Jkcy50b3A7XG5cbiAgICAgICAgLy8g0LjQvdC40YbQuNC40YDQvtCy0LDRgtGMINC90LDRh9Cw0LvQviDQv9C10YDQtdC90L7RgdCwXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgIGVsZW0uc3R5bGUuekluZGV4ID0gOTk5OTtcbiAgICAgICAgZWxlbS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgX2Rlc3Ryb3kgKCkge1xuICAgICAgICB0aGlzLl9lbGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fZWxlbSk7XG4gICAgfVxuXG4gICAgb25EcmFnQ2FuY2VsICgpIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveSgpO1xuICAgIH1cblxuICAgIG9uRHJhZ0VuZCAoKSB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHJhZ1pvbmUgZnJvbSAnLi9EcmFnWm9uZSc7XG5pbXBvcnQgVHJlZURyYWdBdmF0YXIgZnJvbSAnLi9UcmVlRHJhZ0F2YXRhcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWVEcmFnWm9uZSBleHRlbmRzIERyYWdab25lIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtKSB7XG4gICAgICAgIHN1cGVyKGVsZW0pO1xuICAgIH1cbiAgICBfbWFrZUF2YXRhciAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVHJlZURyYWdBdmF0YXIodGhpcywgdGhpcy5fZWxlbSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IERyb3BUYXJnZXQgZnJvbSAnLi9Ecm9wVGFyZ2V0JztcbmltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlZURyb3BUYXJnZXQgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtKSB7XG4gICAgICAgIHN1cGVyKGVsZW0pO1xuICAgIH1cblxuICAgIF9zaG93SG92ZXJJbmRpY2F0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWxlbSAmJiB0aGlzLl90YXJnZXRFbGVtLmNsYXNzTGlzdC5hZGQoJ2hvdmVyJyk7XG4gICAgfVxuXG4gICAgX2hpZGVIb3ZlckluZGljYXRpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbGVtICYmIHRoaXMuX3RhcmdldEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWxlbSAmJiB0aGlzLl90YXJnZXRFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Fib3ZlJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsZW0gJiYgdGhpcy5fdGFyZ2V0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd1bmRlcicpO1xuICAgIH1cblxuICAgIF9nZXRUYXJnZXRFbGVtIChhdmF0YXIsIGV2ZW50KSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBhdmF0YXIuZ2V0VGFyZ2V0RWxlbSgpO1xuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgIT09ICdTUEFOJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjRgtGMLCDQvNC+0LbQtdGCINCx0YvRgtGMINC/0LXRgNC10L3QvtGBINGD0LfQu9CwINCy0L3Rg9GC0YDRjCDRgdCw0LzQvtCz0L4g0YHQtdCx0Y8g0LjQu9C4INCyINGB0LXQsdGPP1xuICAgICAgICBsZXQgZWxlbVRvTW92ZSA9IGF2YXRhci5nZXREcmFnSW5mbyhldmVudCkuZHJhZ1pvbmVFbGVtLnBhcmVudE5vZGU7XG5cbiAgICAgICAgbGV0IGVsZW0gPSB0YXJnZXQ7XG5cbiAgICAgICAgd2hpbGUgKGVsZW0pIHtcbiAgICAgICAgICAgIGlmIChlbGVtID09PSBlbGVtVG9Nb3ZlKSByZXR1cm47IC8vINC/0L7Qv9GL0YLQutCwINC/0LXRgNC10L3QtdGB0YLQuCDRgNC+0LTQuNGC0LXQu9GPINCyINC/0L7RgtC+0LzQutCwXG4gICAgICAgICAgICBlbGVtID0gZWxlbS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBhZGRCb3JkZXIgKGJvcmRlcikge1xuICAgICAgICB0aGlzLl90YXJnZXRFbGVtICYmIHRoaXMuX3RhcmdldEVsZW0uY2xhc3NMaXN0LmFkZChib3JkZXIpO1xuICAgIH1cblxuICAgIHJlbW92ZUJvcmRlciAoYm9yZGVyKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsZW0gJiYgdGhpcy5fdGFyZ2V0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKGJvcmRlcik7XG4gICAgfVxuXG4gICAgb25EcmFnTW92ZShhdmF0YXIsIGV2ZW50KSB7XG4gICAgICAgIHN1cGVyLm9uRHJhZ01vdmUoYXZhdGFyLCBldmVudCk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fdGFyZ2V0RWxlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldEVsZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudFkgPSBldmVudC5jbGllbnRZO1xuXG4gICAgICAgICAgICBjb25zdCB7dG9wLCBoZWlnaHR9ID0gdGhpcy5fdGFyZ2V0RWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgY29uc3QgZWxlbWVudE1pZGRsZSA9IHRvcCArIGhlaWdodCAvIDI7XG5cbiAgICAgICAgICAgIGlmIChjbGllbnRZIDwgZWxlbWVudE1pZGRsZSkge1xuICAgICAgICAgICAgICAgIC8vIHVwd2FyZHNcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUJvcmRlcigndW5kZXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJvcmRlcignYWJvdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZG93bndhcmRzXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVCb3JkZXIoJ2Fib3ZlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCb3JkZXIoJ3VuZGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyYWdFbmQgKGF2YXRhciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl90YXJnZXRFbGVtKSB7XG4gICAgICAgICAgICAvLyDQv9C10YDQtdC90L7RgSDQt9Cw0LrQvtC90YfQuNC70YHRjyDQstC90LUg0L/QvtC00YXQvtC00Y/RidC10Lkg0YLQvtGH0LrQuCDQv9GA0LjQt9C10LzQu9C10L3QuNGPXG4gICAgICAgICAgICBhdmF0YXIub25EcmFnQ2FuY2VsKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2hpZGVIb3ZlckluZGljYXRpb24oKTtcbiAgICAgICAgLy8g0L/QvtC70YPRh9C40YLRjCDQuNC90YTQvtGA0LzQsNGG0LjRjiDQvtCxINC+0LHRitC10LrRgtC1INC/0LXRgNC10L3QvtGB0LBcbiAgICAgICAgbGV0IGF2YXRhckluZm8gPSBhdmF0YXIuZ2V0RHJhZ0luZm8oZXZlbnQpO1xuXG4gICAgICAgIGF2YXRhci5vbkRyYWdFbmQoKTsgLy8g0LDQstCw0YLQsNGAINCx0L7Qu9GM0YjQtSDQvdC1INC90YPQttC10L0sINC/0LXRgNC10L3QvtGBINGD0YHQv9C10YjQtdC9XG5cbiAgICAgICAgLy8g0LLRgdGC0LDQstC40YLRjCDRjdC70LXQvNC10L3RgiDQsiDQtNC10YLQtdC5INCyINC+0YLRgdC+0YDRgtC40YDQvtCy0LDQvdC90L7QvCDQv9C+0YDRj9C00LrQtVxuICAgICAgICBsZXQgZWxlbVRvTW92ZSA9IGF2YXRhckluZm8uZHJhZ1pvbmVFbGVtLnBhcmVudE5vZGU7IC8vIDxMST5cbiAgICAgICAgbGV0IHRpdGxlID0gYXZhdGFySW5mby5kcmFnWm9uZUVsZW0uaW5uZXJIVE1MOyAvLyDQv9C10YDQtdC90L7RgdC40LzRi9C5INC30LDQs9C+0LvQvtCy0L7QulxuXG4gICAgICAgIC8vINC/0L7Qu9GD0YfQuNGC0Ywg0LrQvtC90YLQtdC50L3QtdGAINC00LvRjyDRg9C30LvQvtCyINC00LXRgNC10LLQsCwg0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQuNC5INGC0L7Rh9C60LUg0L/RgNC10LfQtdC80LvQtdC90LjRj1xuICAgICAgICBsZXQgdWwgPSB0aGlzLl90YXJnZXRFbGVtLnBhcmVudE5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1VMJylbMF07XG4gICAgICAgIGlmICghdWwpIHsgLy8g0L3QtdGCINC00LXRgtC10LksINGB0L7Qt9C00LDQtNC40Lwg0LrQvtC90YLQtdC50L3QtdGAXG4gICAgICAgICAgICB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1VMJyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbGVtLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0LLRgdGC0LDQstC40YLRjCDQvdC+0LLRi9C5INGD0LfQtdC7INCyINC90YPQttC90L7QtSDQvNC10YHRgtC+INGB0YDQtdC00Lgg0L/QvtGC0L7QvNC60L7Qsiwg0LIg0LDQu9GE0LDQstC40YLQvdC+0Lwg0L/QvtGA0Y/QtNC60LVcbiAgICAgICAgbGV0IGxpID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGkgPSB1bC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGxldCBjaGlsZFRpdGxlID0gbGkuY2hpbGRyZW5bMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGl0bGUgPiB0aXRsZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGkgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdWwuaW5zZXJ0QmVmb3JlKGVsZW1Ub01vdmUsIGxpKTtcblxuICAgICAgICB0aGlzLl90YXJnZXRFbGVtID0gbnVsbDtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHJhZ01hbmFnZXIgZnJvbSAnLi9EcmFnTWFuYWdlcic7XG5cbmltcG9ydCBUcmVlRHJhZ1pvbmUgZnJvbSAnLi9UcmVlRHJhZ1pvbmUnO1xuaW1wb3J0IFRyZWVEcm9wVGFyZ2V0IGZyb20gJy4vVHJlZURyb3BUYXJnZXQnO1xuXG5sZXQgdHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0cmVlJyk7XG5sZXQgZHJhZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJhZ2dhYmxlJyk7XG5cbmNvbnN0IHRyZWVEcmFnWm9uZSA9IG5ldyBUcmVlRHJhZ1pvbmUodHJlZSk7XG5jb25zdCB0cmVlRHJvcFRhcmdldCA9IG5ldyBUcmVlRHJvcFRhcmdldCh0cmVlKTtcblxuXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmRzIChlbGVtKSB7XG4gICAgbGV0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgbGV0IGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICBsZXQgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wO1xuICAgIGxldCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsTGVmdCB8fCBib2R5LnNjcm9sbExlZnQ7XG5cbiAgICBsZXQgY2xpZW50VG9wID0gZG9jRWxlbS5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgICBsZXQgY2xpZW50TGVmdCA9IGRvY0VsZW0uY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcblxuICAgIGxldCB0b3AgPSBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wO1xuICAgIGxldCBsZWZ0ID0gYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCh0b3ApLFxuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGxlZnQpXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnRVbmRlckNsaWVudFhZIChlbGVtLCBjbGllbnRYLCBjbGllbnRZKSB7XG4gICAgbGV0IGRpc3BsYXkgPSBlbGVtLnN0eWxlLmRpc3BsYXkgfHwgJyc7XG5cbiAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChjbGllbnRYLCBjbGllbnRZKTtcblxuICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG5cbiAgICBpZiAoIXRhcmdldCB8fCB0YXJnZXQgPT0gZG9jdW1lbnQpIHsgLy8g0Y3RgtC+INCx0YvQstCw0LXRgiDQv9GA0Lgg0LLRi9C90L7RgdC1INC30LAg0LPRgNCw0L3QuNGG0Ysg0L7QutC90LBcbiAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTsgLy8g0L/QvtC/0YDQsNCy0LjRgtGMINC30L3QsNGH0LXQvdC40LUsINGH0YLQvtCx0Ysg0LHRi9C7INC40LzQtdC90L3QviDRjdC70LXQvNC10L3RglxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQgKENoaWxkLCBQYXJlbnQpIHtcbiAgICBmdW5jdGlvbiBGKCkge31cblxuICAgIEYucHJvdG90eXBlID0gUGFyZW50LnByb3RvdHlwZTtcbiAgICBDaGlsZC5wcm90b3R5cGUgPSBuZXcgRigpO1xuICAgIENoaWxkLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENoaWxkO1xuICAgIENoaWxkLnBhcmVudCA9IFBhcmVudC5wcm90b3R5cGU7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
