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
/******/ 	__webpack_require__.p = "/lib/";
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

    function onDragStart() {
        return false;
    }

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

    // document.ondragstart = function() {
    //     return false;
    // };
    //
    // document.onmousemove = onMouseMove;
    // document.onmouseup = onMouseUp;
    // document.onmousedown = onMouseDown;

    (function initListeners() {
        document.addEventListener('dragstart', onDragStart);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousedown', onMouseDown);
    })();
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
            if (!event.target.classList.contains('draggable')) return false;

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
            // elem.style.display = 'none';

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

            if (!target.classList.contains('droppable')) {
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


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeDragAvatar = exports.TreeDropTarget = exports.TreeDragZone = exports.DragZone = exports.DropTarget = exports.DragAvatar = exports.DragManager = undefined;

var _DragManager = __webpack_require__(/*! ./DragManager */ "./src/DragManager.js");

var _DragManager2 = _interopRequireDefault(_DragManager);

var _DragAvatar = __webpack_require__(/*! ./DragAvatar */ "./src/DragAvatar.js");

var _DragAvatar2 = _interopRequireDefault(_DragAvatar);

var _DropTarget = __webpack_require__(/*! ./DropTarget */ "./src/DropTarget.js");

var _DropTarget2 = _interopRequireDefault(_DropTarget);

var _DragZone = __webpack_require__(/*! ./DragZone */ "./src/DragZone.js");

var _DragZone2 = _interopRequireDefault(_DragZone);

var _TreeDragZone = __webpack_require__(/*! ./TreeDragZone */ "./src/TreeDragZone.js");

var _TreeDragZone2 = _interopRequireDefault(_TreeDragZone);

var _TreeDropTarget = __webpack_require__(/*! ./TreeDropTarget */ "./src/TreeDropTarget.js");

var _TreeDropTarget2 = _interopRequireDefault(_TreeDropTarget);

var _TreeDragAvatar = __webpack_require__(/*! ./TreeDragAvatar */ "./src/TreeDragAvatar.js");

var _TreeDragAvatar2 = _interopRequireDefault(_TreeDragAvatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.DragManager = _DragManager2.default;
exports.DragAvatar = _DragAvatar2.default;
exports.DropTarget = _DropTarget2.default;
exports.DragZone = _DragZone2.default;
exports.TreeDragZone = _TreeDragZone2.default;
exports.TreeDropTarget = _TreeDropTarget2.default;
exports.TreeDragAvatar = _TreeDragAvatar2.default;

// let tree = document.querySelector('#tree');
// let dragElement = document.querySelector('.draggable');
//
// const treeDragZone = new TreeDragZone(tree);
// const treeDropTarget = new TreeDropTarget(tree);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RyYWdBdmF0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RyYWdNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9EcmFnWm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJvcFRhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVHJlZURyYWdBdmF0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RyZWVEcmFnWm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVHJlZURyb3BUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJEcmFnQXZhdGFyIiwiZHJhZ1pvbmUiLCJkcmFnRWxlbSIsIl9kcmFnWm9uZSIsIl9kcmFnWm9uZUVsZW0iLCJfZWxlbSIsInByb3RvdHlwZSIsImluaXRGcm9tRXZlbnQiLCJkb3duWCIsImRvd25ZIiwiZXZlbnQiLCJnZXREcmFnSW5mbyIsImVsZW0iLCJkcmFnWm9uZUVsZW0iLCJnZXRUYXJnZXRFbGVtIiwiX2N1cnJlbnRUYXJnZXRFbGVtIiwib25EcmFnTW92ZSIsInN0eWxlIiwibGVmdCIsInBhZ2VYIiwiX3NoaWZ0WCIsInRvcCIsInBhZ2VZIiwiX3NoaWZ0WSIsImNsaWVudFgiLCJjbGllbnRZIiwib25EcmFnQ2FuY2VsIiwib25EcmFnRW5kIiwiZHJhZ01hbmFnZXIiLCJhdmF0YXIiLCJkcm9wVGFyZ2V0Iiwic2VsZiIsIm9uRHJhZ1N0YXJ0Iiwib25Nb3VzZURvd24iLCJlIiwid2hpY2giLCJmaW5kRHJhZ1pvbmUiLCJvbk1vdXNlTW92ZSIsIk1hdGgiLCJhYnMiLCJjbGVhblVwIiwibmV3RHJvcFRhcmdldCIsImZpbmREcm9wVGFyZ2V0Iiwib25EcmFnTGVhdmUiLCJvbkRyYWdFbnRlciIsIm9uTW91c2VVcCIsInRhcmdldCIsImRvY3VtZW50IiwicGFyZW50Tm9kZSIsImluaXRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiRHJhZ1pvbmUiLCJfbWFrZUF2YXRhciIsIkRyb3BUYXJnZXQiLCJfdGFyZ2V0RWxlbSIsIl9nZXRUYXJnZXRFbGVtIiwiX2hpZGVIb3ZlckluZGljYXRpb24iLCJfc2hvd0hvdmVySW5kaWNhdGlvbiIsIm5ld1RhcmdldEVsZW0iLCJmcm9tRHJvcFRhcmdldCIsImNvb3JkcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIlkiLCJoZWlnaHQiLCJ0b0Ryb3BUYXJnZXQiLCJUcmVlRHJhZ0F2YXRhciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xvbmVOb2RlIiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwiekluZGV4IiwicG9zaXRpb24iLCJyZW1vdmVDaGlsZCIsIl9kZXN0cm95IiwiVHJlZURyYWdab25lIiwiVHJlZURyb3BUYXJnZXQiLCJhZGQiLCJyZW1vdmUiLCJlbGVtVG9Nb3ZlIiwiYm9yZGVyIiwiZWxlbWVudE1pZGRsZSIsInJlbW92ZUJvcmRlciIsImFkZEJvcmRlciIsImF2YXRhckluZm8iLCJ0aXRsZSIsImlubmVySFRNTCIsInVsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjcmVhdGVFbGVtZW50IiwibGkiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjaGlsZFRpdGxlIiwiaW5zZXJ0QmVmb3JlIiwiRHJhZ01hbmFnZXIiLCJnZXRDb29yZHMiLCJnZXRFbGVtZW50VW5kZXJDbGllbnRYWSIsImV4dGVuZCIsImJveCIsImRvY0VsZW0iLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsInNjcm9sbExlZnQiLCJwYWdlWE9mZnNldCIsImNsaWVudFRvcCIsImNsaWVudExlZnQiLCJyb3VuZCIsImRpc3BsYXkiLCJlbGVtZW50RnJvbVBvaW50IiwiQ2hpbGQiLCJQYXJlbnQiLCJGIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiXSwi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RixJQUFYO0FBRkgsS0FBUDtBQUlIOztBQUVNLFNBQVNpRix1QkFBVCxDQUFrQ3ZGLElBQWxDLEVBQXdDWSxPQUF4QyxFQUFpREMsT0FBakQsRUFBMEQ7QUFDN0QsUUFBSXVGLFVBQVVwRyxLQUFLSyxLQUFMLENBQVcrRixPQUFYLElBQXNCLEVBQXBDOztBQUVBcEcsU0FBS0ssS0FBTCxDQUFXK0YsT0FBWCxHQUFxQixNQUFyQjs7QUFFQSxRQUFJbEUsU0FBU0MsU0FBU2tFLGdCQUFULENBQTBCekYsT0FBMUIsRUFBbUNDLE9BQW5DLENBQWI7O0FBRUFiLFNBQUtLLEtBQUwsQ0FBVytGLE9BQVgsR0FBcUJBLE9BQXJCOztBQUVBLFFBQUksQ0FBQ2xFLE1BQUQsSUFBV0EsVUFBVUMsUUFBekIsRUFBbUM7QUFBRTtBQUNqQ0QsaUJBQVNDLFNBQVN1QixJQUFsQixDQUQrQixDQUNQO0FBQzNCOztBQUVELFdBQU94QixNQUFQO0FBQ0g7O0FBRU0sU0FBU3NELE1BQVQsQ0FBaUJjLEtBQWpCLEVBQXdCQyxNQUF4QixFQUFnQztBQUNuQyxhQUFTQyxDQUFULEdBQWEsQ0FBRTs7QUFFZkEsTUFBRTlHLFNBQUYsR0FBYzZHLE9BQU83RyxTQUFyQjtBQUNBNEcsVUFBTTVHLFNBQU4sR0FBa0IsSUFBSThHLENBQUosRUFBbEI7QUFDQUYsVUFBTTVHLFNBQU4sQ0FBZ0IrRyxXQUFoQixHQUE4QkgsS0FBOUI7QUFDQUEsVUFBTUksTUFBTixHQUFlSCxPQUFPN0csU0FBdEI7QUFDSCxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvbGliL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IGdldEVsZW1lbnRVbmRlckNsaWVudFhZIH0gZnJvbSAnLi91dGlscyc7XG4vKipcbiAqIFwi0JDQstCw0YLQsNGAXCIgLSDRjdC70LXQvNC10L3Rgiwg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXRgtCw0YHQutC40LLQsNC10YLRgdGPLlxuICpcbiAqINCSINC/0YDQvtGB0YLQtdC50YjQtdC8INGB0LvRg9GH0LDQtSDQsNCy0LDRgtCw0YDQvtC8INGP0LLQu9GP0LXRgtGB0Y8g0YHQsNC8INC/0LXRgNC10L3QvtGB0LjQvNGL0Lkg0Y3Qu9C10LzQtdC90YJcbiAqINCi0LDQutC20LUg0LDQstCw0YLQsNGAINC80L7QttC10YIg0LHRi9GC0Ywg0LrQu9C+0L3QuNGA0L7QstCw0L3QvdGL0Lwg0Y3Qu9C10LzQtdC90YLQvtC8XG4gKiDQotCw0LrQttC1INCw0LLQsNGC0LDRgCDQvNC+0LbQtdGCINCx0YvRgtGMINC40LrQvtC90LrQvtC5INC4INCy0L7QvtCx0YnQtSDRh9C10Lwg0YPQs9C+0LTQvdC+LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEcmFnQXZhdGFyKGRyYWdab25lLCBkcmFnRWxlbSkge1xuICAgIC8qKiBcItGA0L7QtNC40YLQtdC70YzRgdC60LDRj1wiINC30L7QvdCwINC/0LXRgNC10L3QvtGB0LAgKi9cbiAgICB0aGlzLl9kcmFnWm9uZSA9IGRyYWdab25lO1xuXG4gICAgLyoqXG4gICAgICog0L/QvtC00Y3Qu9C10LzQtdC90YIg0YDQvtC00LjRgtC10LvRjNGB0LrQvtC5INC30L7QvdGLLCDQuiDQutC+0YLQvtGA0L7QvNGDINC+0YLQvdC+0YHQuNGC0YHRjyDQsNCy0LDRgtCw0YBcbiAgICAgKiDQv9C+INGD0LzQvtC70YfQsNC90LjRjiAtINGN0LvQtdC80LXQvdGCLCDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0Y7RidC40Lkg0LLRgdC10Lkg0LfQvtC90LVcbiAgICAgKiDQvNC+0LbQtdGCINCx0YvRgtGMINGD0YLQvtGH0L3QtdC9INCyIGluaXRGcm9tRXZlbnRcbiAgICAgKi9cbiAgICB0aGlzLl9kcmFnWm9uZUVsZW0gPSBkcmFnRWxlbTtcblxuICAgIC8qKlxuICAgICAqINCh0LDQvCDRjdC70LXQvNC10L3RgiDQsNCy0LDRgtCw0YDQsCwg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQvdC+0YHQuNGC0YzRgdGPINC/0L4g0Y3QutGA0LDQvdGDLlxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9GD0LXRgtGB0Y8g0LIgaW5pdEZyb21FdmVudFxuICAgICAqL1xuICAgIHRoaXMuX2VsZW0gPSBkcmFnRWxlbTtcbn1cblxuLyoqXG4gKiDQmNC90LjRhtC40LDQu9C40LfQvtCy0LDRgtGMIHRoaXMuX2VsZW0g0Lgg0L/QvtC30LjRhtC40L7QvdC40YDQvtCy0LDRgtGMINC10LPQvlxuICog0J/RgNC4INC90LXQvtCx0YXQvtC00LjQvNC+0YHRgtC4INGD0YLQvtGH0L3QuNGC0YwgdGhpcy5fZHJhZ1pvbmVFbGVtXG4gKiBAcGFyYW0gZG93blgg0JrQvtC+0YDQtNC40L3QsNGC0LAgWCDQvdCw0LbQsNGC0LjRjyDQvNGL0YjQuFxuICogQHBhcmFtIGRvd25ZINCa0L7QvtGA0LTQuNC90LDRgtCwIFkg0L3QsNC20LDRgtC40Y8g0LzRi9GI0LhcbiAqIEBwYXJhbSBldmVudCDQotC10LrRg9GJ0LXQtSDRgdC+0LHRi9GC0LjQtSDQvNGL0YjQuFxuICovXG5EcmFnQXZhdGFyLnByb3RvdHlwZS5pbml0RnJvbUV2ZW50ID0gZnVuY3Rpb24oZG93blgsIGRvd25ZLCBldmVudCkge1xuICAgIC8qIG92ZXJyaWRlICovXG59O1xuXG4vKipcbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC40L3RhNC+0YDQvNCw0YbQuNGOINC+INC/0LXRgNC10L3QvtGB0LjQvNC+0Lwg0Y3Qu9C10LzQtdC90YLQtSDQtNC70Y8gRHJvcFRhcmdldFxuICogQHBhcmFtIGV2ZW50XG4gKi9cbkRyYWdBdmF0YXIucHJvdG90eXBlLmdldERyYWdJbmZvID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAvLyDRgtGD0YIg0LzQvtC20LXRgiDQsdGL0YLRjCDQtdGJ0LUg0LrQsNC60LDRjy3RgtC+INC40L3RhNC+0YDQvNCw0YbQuNGPLCDQvdC10L7QsdGF0L7QtNC40LzQsNGPINC00LvRjyDQvtCx0YDQsNCx0L7RgtC60Lgg0LrQvtC90YbQsCDQuNC70Lgg0L/RgNC+0YbQtdGB0YHQsCDQv9C10YDQtdC90L7RgdCwXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZWxlbTogdGhpcy5fZWxlbSxcbiAgICAgICAgZHJhZ1pvbmVFbGVtOiB0aGlzLl9kcmFnWm9uZUVsZW0sXG4gICAgICAgIGRyYWdab25lOiB0aGlzLl9kcmFnWm9uZVxuICAgIH07XG59O1xuXG4vKipcbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGC0LXQutGD0YnQuNC5INGB0LDQvNGL0Lkg0LPQu9GD0LHQvtC60LjQuSBET00t0Y3Qu9C10LzQtdC90YIg0L/QvtC0IHRoaXMuX2VsZW1cbiAqINCf0YDQuNCy0LDRgtC90L7QtSDRgdCy0L7QudGB0YLQstC+IF9jdXJyZW50VGFyZ2V0RWxlbSDQvtCx0L3QvtCy0LvRj9C10YLRgdGPINC/0YDQuCDQutCw0LbQtNC+0Lwg0L/QtdGA0LXQtNCy0LjQttC10L3QuNC4XG4gKi9cbkRyYWdBdmF0YXIucHJvdG90eXBlLmdldFRhcmdldEVsZW0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFRhcmdldEVsZW07XG59O1xuXG4vKipcbiAqINCf0YDQuCDQutCw0LbQtNC+0Lwg0LTQstC40LbQtdC90LjQuCDQvNGL0YjQuCDQv9C10YDQtdC80LXRidCw0LXRgiB0aGlzLl9lbGVtXG4gKiDQuCDQt9Cw0L/QuNGB0YvQstCw0LXRgiDRgtC10LrRg9GJ0LjQuSDRjdC70LXQvNC10L3RgiDQv9C+0LQgdGhpcy5fZWxlbSDQsiBfY3VycmVudFRhcmdldEVsZW1cbiAqIEBwYXJhbSBldmVudFxuICovXG5EcmFnQXZhdGFyLnByb3RvdHlwZS5vbkRyYWdNb3ZlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLl9lbGVtLnN0eWxlLmxlZnQgPSBldmVudC5wYWdlWCAtIHRoaXMuX3NoaWZ0WCArICdweCc7XG4gICAgdGhpcy5fZWxlbS5zdHlsZS50b3AgPSBldmVudC5wYWdlWSAtIHRoaXMuX3NoaWZ0WSArICdweCc7XG5cbiAgICB0aGlzLl9jdXJyZW50VGFyZ2V0RWxlbSA9IGdldEVsZW1lbnRVbmRlckNsaWVudFhZKHRoaXMuX2VsZW0sIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xufTtcblxuLyoqXG4gKiDQlNC10LnRgdGC0LLQuNGPINGBINCw0LLQsNGC0LDRgNC+0LwsINC60L7Qs9C00LAg0L/QtdGA0LXQvdC+0YEg0L3QtSDRg9C00LDQu9GB0Y9cbiAqINCd0LDQv9GA0LjQvNC10YAsINC80L7QttC90L4g0LLQtdGA0L3Rg9GC0Ywg0Y3Qu9C10LzQtdC90YIg0L7QsdGA0LDRgtC90L4g0LjQu9C4INGD0L3QuNGH0YLQvtC20LjRgtGMXG4gKi9cbkRyYWdBdmF0YXIucHJvdG90eXBlLm9uRHJhZ0NhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgIC8qIG92ZXJyaWRlICovXG59O1xuXG4vKipcbiAqINCU0LXQudGB0YLQstC40Y8g0YEg0LDQstCw0YLQsNGA0L7QvCDQv9C+0YHQu9C1INGD0YHQv9C10YjQvdC+0LPQviDQv9C10YDQtdC90L7RgdCwXG4gKi9cbkRyYWdBdmF0YXIucHJvdG90eXBlLm9uRHJhZ0VuZCA9IGZ1bmN0aW9uKCkge1xuICAgIC8qIG92ZXJyaWRlICovXG59O1xuIiwibGV0IGRyYWdNYW5hZ2VyID0gbmV3IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IGRyYWdab25lLCBhdmF0YXIsIGRyb3BUYXJnZXQ7XG4gICAgbGV0IGRvd25YLCBkb3duWTtcblxuICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0KCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZURvd24oZSkge1xuXG4gICAgICAgIGlmIChlLndoaWNoICE9PSAxKSB7IC8vINC90LUg0LvQtdCy0L7QuSDQutC90L7Qv9C60L7QuVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZHJhZ1pvbmUgPSBmaW5kRHJhZ1pvbmUoZSk7XG5cbiAgICAgICAgaWYgKCFkcmFnWm9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0LfQsNC/0L7QvNC90LjQvCwg0YfRgtC+INGN0LvQtdC80LXQvdGCINC90LDQttCw0YIg0L3QsCDRgtC10LrRg9GJ0LjRhSDQutC+0L7RgNC00LjQvdCw0YLQsNGFIHBhZ2VYL3BhZ2VZXG4gICAgICAgIGRvd25YID0gZS5wYWdlWDtcbiAgICAgICAgZG93blkgPSBlLnBhZ2VZO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlTW92ZShlKSB7XG4gICAgICAgIGlmICghZHJhZ1pvbmUpIHJldHVybjsgLy8g0Y3Qu9C10LzQtdC90YIg0L3QtSDQt9Cw0LbQsNGCXG5cbiAgICAgICAgaWYgKCFhdmF0YXIpIHsgLy8g0Y3Qu9C10LzQtdC90YIg0L3QsNC20LDRgiwg0L3QviDQv9C+0LrQsCDQvdC1INC90LDRh9Cw0LvQuCDQtdCz0L4g0LTQstC40LPQsNGC0YxcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhlLnBhZ2VYIC0gZG93blgpIDwgMyAmJiBNYXRoLmFicyhlLnBhZ2VZIC0gZG93blkpIDwgMykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vINC/0L7Qv9GA0L7QsdC+0LLQsNGC0Ywg0LfQsNGF0LLQsNGC0LjRgtGMINGN0LvQtdC80LXQvdGCXG4gICAgICAgICAgICBhdmF0YXIgPSBkcmFnWm9uZS5vbkRyYWdTdGFydChkb3duWCwgZG93blksIGUpO1xuXG4gICAgICAgICAgICBpZiAoIWF2YXRhcikgeyAvLyDQvdC1INC/0L7Qu9GD0YfQuNC70L7RgdGMLCDQt9C90LDRh9C40YIg0L/QtdGA0LXQvdC+0YEg0L/RgNC+0LTQvtC70LbQsNGC0Ywg0L3QtdC70YzQt9GPXG4gICAgICAgICAgICAgICAgY2xlYW5VcCgpOyAvLyDQvtGH0LjRgdGC0LjRgtGMINC/0YDQuNCy0LDRgtC90YvQtSDQv9C10YDQtdC80LXQvdC90YvQtSwg0YHQstGP0LfQsNC90L3Ri9C1INGBINC/0LXRgNC10L3QvtGB0L7QvFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vINC+0YLQvtCx0YDQsNC30LjRgtGMINC/0LXRgNC10L3QvtGBINC+0LHRitC10LrRgtCwLCDQv9C10YDQtdCy0YvRh9C40YHQu9C40YLRjCDRgtC10LrRg9GJ0LjQuSDRjdC70LXQvNC10L3RgiDQv9C+0LQg0LrRg9GA0YHQvtGA0L7QvFxuICAgICAgICBhdmF0YXIub25EcmFnTW92ZShlKTtcblxuICAgICAgICAvLyDQvdCw0LnRgtC4INC90L7QstGL0LkgZHJvcFRhcmdldCDQv9C+0LQg0LrRg9GA0YHQvtGA0L7QvDogbmV3RHJvcFRhcmdldFxuICAgICAgICAvLyDRgtC10LrRg9GJ0LjQuSBkcm9wVGFyZ2V0INC+0YHRgtCw0LvRgdGPINC+0YIg0L/RgNC+0YjQu9C+0LPQviBtb3VzZW1vdmVcbiAgICAgICAgLy8gKtC+0LHQsCDQt9C90LDRh9C10L3QuNGPOiDQuCBuZXdEcm9wVGFyZ2V0INC4IGRyb3BUYXJnZXQg0LzQvtCz0YPRgiDQsdGL0YLRjCBudWxsXG4gICAgICAgIGxldCBuZXdEcm9wVGFyZ2V0ID0gZmluZERyb3BUYXJnZXQoZSk7XG5cbiAgICAgICAgaWYgKG5ld0Ryb3BUYXJnZXQgIT09IGRyb3BUYXJnZXQpIHtcbiAgICAgICAgICAgIC8vINGD0LLQtdC00L7QvNC40YLRjCDRgdGC0LDRgNGD0Y4g0Lgg0L3QvtCy0YPRjiDQt9C+0L3Riy3RhtC10LvQuCDQviDRgtC+0LwsINGH0YLQviDRgSDQvdC40YUg0YPRiNC70Lgv0L3QsCDQvdC40YUg0LfQsNGI0LvQuFxuICAgICAgICAgICAgZHJvcFRhcmdldCAmJiBkcm9wVGFyZ2V0Lm9uRHJhZ0xlYXZlKG5ld0Ryb3BUYXJnZXQsIGF2YXRhciwgZSk7XG4gICAgICAgICAgICBuZXdEcm9wVGFyZ2V0ICYmIG5ld0Ryb3BUYXJnZXQub25EcmFnRW50ZXIoZHJvcFRhcmdldCwgYXZhdGFyLCBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyb3BUYXJnZXQgPSBuZXdEcm9wVGFyZ2V0O1xuXG4gICAgICAgIGRyb3BUYXJnZXQgJiYgZHJvcFRhcmdldC5vbkRyYWdNb3ZlKGF2YXRhciwgZSk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VVcChlKSB7XG5cbiAgICAgICAgaWYgKGUud2hpY2ggIT09IDEpIHsgLy8g0L3QtSDQu9C10LLQvtC5INC60L3QvtC/0LrQvtC5XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXZhdGFyKSB7IC8vINC10YHQu9C4INGD0LbQtSDQvdCw0YfQsNC70Lgg0L/QtdGA0LXQtNCy0LjQs9Cw0YLRjFxuXG4gICAgICAgICAgICBpZiAoZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vINC30LDQstC10YDRiNC40YLRjCDQv9C10YDQtdC90L7RgSDQuCDQuNC30LHQsNCy0LjRgtGM0YHRjyDQvtGCINCw0LLQsNGC0LDRgNCwLCDQtdGB0LvQuCDRjdGC0L4g0L3Rg9C20L3QvlxuICAgICAgICAgICAgICAgIC8vINGN0YLQsCDRhNGD0L3QutGG0LjRjyDQvtCx0Y/Qt9Cw0L3QsCDQstGL0LfQstCw0YLRjCBhdmF0YXIub25EcmFnRW5kL29uRHJhZ0NhbmNlbFxuICAgICAgICAgICAgICAgIGRyb3BUYXJnZXQub25EcmFnRW5kKGF2YXRhciwgZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF2YXRhci5vbkRyYWdDYW5jZWwoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgY2xlYW5VcCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFuVXAoKSB7XG4gICAgICAgIC8vINC+0YfQuNGB0YLQuNGC0Ywg0LLRgdC1INC/0YDQvtC80LXQttGD0YLQvtGH0L3Ri9C1INC+0LHRitC10LrRgtGLXG4gICAgICAgIGRyYWdab25lID0gYXZhdGFyID0gZHJvcFRhcmdldCA9IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZERyYWdab25lKGV2ZW50KSB7XG4gICAgICAgIGxldCBlbGVtID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIHdoaWxlIChlbGVtICE9PSBkb2N1bWVudCAmJiAhZWxlbS5kcmFnWm9uZSkge1xuICAgICAgICAgICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtLmRyYWdab25lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmREcm9wVGFyZ2V0KGV2ZW50KSB7XG4gICAgICAgIC8vINC/0L7Qu9GD0YfQuNGC0Ywg0Y3Qu9C10LzQtdC90YIg0L/QvtC0INCw0LLQsNGC0LDRgNC+0LxcbiAgICAgICAgbGV0IGVsZW0gPSBhdmF0YXIuZ2V0VGFyZ2V0RWxlbSgpO1xuXG4gICAgICAgIHdoaWxlIChlbGVtICE9PSBkb2N1bWVudCAmJiAhZWxlbS5kcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICBlbGVtID0gZWxlbS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFlbGVtLmRyb3BUYXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW0uZHJvcFRhcmdldDtcbiAgICB9XG5cbiAgICAvLyBkb2N1bWVudC5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICByZXR1cm4gZmFsc2U7XG4gICAgLy8gfTtcbiAgICAvL1xuICAgIC8vIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gb25Nb3VzZU1vdmU7XG4gICAgLy8gZG9jdW1lbnQub25tb3VzZXVwID0gb25Nb3VzZVVwO1xuICAgIC8vIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gb25Nb3VzZURvd247XG5cbiAgICAoZnVuY3Rpb24gaW5pdExpc3RlbmVycygpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0Jywgb25EcmFnU3RhcnQpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XG4gICAgfSkoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRyYWdNYW5hZ2VyO1xuIiwiLyoqXG4gKiDQl9C+0L3QsCwg0LjQtyDQutC+0YLQvtGA0L7QuSDQvNC+0LbQvdC+INC/0LXRgNC10L3QvtGB0LjRgtGMINC+0LHRitC10LrRgtGLXG4gKiDQo9C80LXQtdGCINC+0LHRgNCw0LHQsNGC0YvQstCw0YLRjCDQvdCw0YfQsNC70L4g0L/QtdGA0LXQvdC+0YHQsCDQvdCwINGB0LXQsdC1INC4INGB0L7Qt9C00LDQstCw0YLRjCBcItCw0LLQsNGC0LDRgFwiXG4gKiBAcGFyYW0gZWxlbSBET00t0Y3Qu9C10LzQtdC90YIsINC6INC60L7RgtC+0YDQvtC80YMg0L/RgNC40LLRj9C30LDQvdCwINC30L7QvdCwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERyYWdab25lKGVsZW0pIHtcbiAgZWxlbS5kcmFnWm9uZSA9IHRoaXM7XG4gIHRoaXMuX2VsZW0gPSBlbGVtO1xufVxuXG4vKipcbiAqINCh0L7Qt9C00LDRgtGMINCw0LLQsNGC0LDRgCwg0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQuNC5INC30L7QvdC1LlxuICog0KMg0YDQsNC30L3Ri9GFINC30L7QvSDQvNC+0LPRg9GCINCx0YvRgtGMINGA0LDQt9C90YvQtSDRgtC40L/RiyDQsNCy0LDRgtCw0YDQvtCyXG4gKi9cbkRyYWdab25lLnByb3RvdHlwZS5fbWFrZUF2YXRhciA9IGZ1bmN0aW9uKCkge1xuICAvKiBvdmVycmlkZSAqL1xufTtcblxuLyoqXG4gKiDQntCx0YDQsNCx0L7RgtCw0YLRjCDQvdCw0YfQsNC70L4g0L/QtdGA0LXQvdC+0YHQsC5cbiAqXG4gKiDQn9C+0LvRg9GH0LDQtdGCINC60L7QvtGA0LTQuNC90LDRgtGLINC40LfQvdCw0YfQsNC70YzQvdC+0LPQviDQvdCw0LbQsNGC0LjRjyDQvNGL0YjQutC4LCDRgdC+0LHRi9GC0LjQtS5cbiAqXG4gKiBAcGFyYW0gZG93blgg0JrQvtC+0YDQtNC40L3QsNGC0LAg0LjQt9C90LDRh9Cw0LvRjNC90L7Qs9C+INC90LDQttCw0YLQuNGPINC/0L4gWFxuICogQHBhcmFtIGRvd25ZINCa0L7QvtGA0LTQuNC90LDRgtCwINC40LfQvdCw0YfQsNC70YzQvdC+0LPQviDQvdCw0LbQsNGC0LjRjyDQv9C+IFlcbiAqIEBwYXJhbSBldmVudCDRgtC10LrRg9GJ0LXQtSDRgdC+0LHRi9GC0LjQtSDQvNGL0YjQuFxuICpcbiAqIEByZXR1cm4g0LDQstCw0YLQsNGAINC40LvQuCBmYWxzZSwg0LXRgdC70Lgg0LfQsNGF0LLQsNGC0LjRgtGMINGBINC00LDQvdC90L7QuSDRgtC+0YfQutC4INC90LjRh9C10LPQviDQvdC10LvRjNC30Y9cbiAqL1xuRHJhZ1pvbmUucHJvdG90eXBlLm9uRHJhZ1N0YXJ0ID0gZnVuY3Rpb24oZG93blgsIGRvd25ZLCBldmVudCkge1xuXG4gIGxldCBhdmF0YXIgPSB0aGlzLl9tYWtlQXZhdGFyKCk7XG5cbiAgaWYgKCFhdmF0YXIuaW5pdEZyb21FdmVudChkb3duWCwgZG93blksIGV2ZW50KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBhdmF0YXI7XG59O1xuIiwiLyoqXG4gKiDQl9C+0L3QsCwg0LIg0LrQvtGC0L7RgNGD0Y4g0L7QsdGK0LXQutGC0Ysg0LzQvtC20L3QviDQutC70LDRgdGC0YxcbiAqINCX0LDQvdC40LzQsNC10YLRgdGPINC40L3QtNC40LrQsNGG0LjQtdC5INC/0LXRgNC10LTQstC40LbQtdC90LjRjyDQv9C+INGB0LXQsdC1LCDQtNC+0LHQsNCy0LvQtdC90LjQtdC8INCyINGB0LXQsdGPXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERyb3BUYXJnZXQoZWxlbSkge1xuICAgIGVsZW0uZHJvcFRhcmdldCA9IHRoaXM7XG4gICAgdGhpcy5fZWxlbSA9IGVsZW07XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LTRjdC70LXQvNC10L3Rgiwg0L3QsNC0INC60L7RgtC+0YDRi9C8INCyINC90LDRgdGC0L7Rj9GJ0LjQuSDQvNC+0LzQtdC90YIg0L3QsNGF0L7QtNC40YLRgdGPINCw0LLQsNGC0LDRgFxuICAgICAqL1xuICAgIHRoaXMuX3RhcmdldEVsZW0gPSBudWxsO1xufVxuXG4vKipcbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCIERPTS3Qv9C+0LTRjdC70LXQvNC10L3Rgiwg0L3QsNC0INC60L7RgtC+0YDRi9C8INGB0LXQudGH0LDRgSDQv9GA0L7Qu9C10YLQsNC10YIg0LDQstCw0YLQsNGAXG4gKlxuICogQHJldHVybiBET00t0Y3Qu9C10LzQtdC90YIsINC90LAg0LrQvtGC0L7RgNGL0Lkg0LzQvtC20L3QviDQv9C+0LvQvtC20LjRgtGMINC40LvQuCB1bmRlZmluZWRcbiAqL1xuRHJvcFRhcmdldC5wcm90b3R5cGUuX2dldFRhcmdldEVsZW0gPSBmdW5jdGlvbihhdmF0YXIsIGV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW07XG59O1xuXG4vKipcbiAqINCh0L/RgNGP0YLQsNGC0Ywg0LjQvdC00LjQutCw0YbQuNGOINC/0LXRgNC10L3QvtGB0LBcbiAqINCS0YvQt9GL0LLQsNC10YLRgdGPLCDQutC+0LPQtNCwINCw0LLQsNGC0LDRgCDRg9GF0L7QtNC40YIg0YEg0YLQtdC60YPRidC10LPQviB0aGlzLl90YXJnZXRFbGVtXG4gKi9cbkRyb3BUYXJnZXQucHJvdG90eXBlLl9oaWRlSG92ZXJJbmRpY2F0aW9uID0gZnVuY3Rpb24oYXZhdGFyKSB7XG4gICAgLyogb3ZlcnJpZGUgKi9cbn07XG5cbi8qKlxuICog0J/QvtC60LDQt9Cw0YLRjCDQuNC90LTQuNC60LDRhtC40Y4g0L/QtdGA0LXQvdC+0YHQsFxuICog0JLRi9C30YvQstCw0LXRgtGB0Y8sINC60L7Qs9C00LAg0LDQstCw0YLQsNGAINC/0YDQuNGI0LXQuyDQvdCwINC90L7QstGL0LkgdGhpcy5fdGFyZ2V0RWxlbVxuICovXG5Ecm9wVGFyZ2V0LnByb3RvdHlwZS5fc2hvd0hvdmVySW5kaWNhdGlvbiA9IGZ1bmN0aW9uKGF2YXRhcikge1xuICAgIC8qIG92ZXJyaWRlICovXG59O1xuXG4vKipcbiAqINCc0LXRgtC+0LQg0LLRi9C30YvQstCw0LXRgtGB0Y8g0L/RgNC4INC60LDQttC00L7QvCDQtNCy0LjQttC10L3QuNC4INCw0LLQsNGC0LDRgNCwXG4gKi9cbkRyb3BUYXJnZXQucHJvdG90eXBlLm9uRHJhZ01vdmUgPSBmdW5jdGlvbihhdmF0YXIsIGV2ZW50KSB7XG4gICAgbGV0IG5ld1RhcmdldEVsZW0gPSB0aGlzLl9nZXRUYXJnZXRFbGVtKGF2YXRhciwgZXZlbnQpO1xuXG4gICAgaWYgKHRoaXMuX3RhcmdldEVsZW0gIT09IG5ld1RhcmdldEVsZW0pIHtcbiAgICAgICAgdGhpcy5faGlkZUhvdmVySW5kaWNhdGlvbihhdmF0YXIpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbGVtID0gbmV3VGFyZ2V0RWxlbTtcbiAgICAgICAgdGhpcy5fc2hvd0hvdmVySW5kaWNhdGlvbihhdmF0YXIpO1xuICAgIH1cbn07XG5cbi8qKlxuICog0JfQsNCy0LXRgNGI0LXQvdC40LUg0L/QtdGA0LXQvdC+0YHQsC5cbiAqINCQ0LvQs9C+0YDQuNGC0Lwg0L7QsdGA0LDQsdC+0YLQutC4ICjQv9C10YDQtdC+0L/RgNC10LTQtdC70LjRgtGMINGE0YPQvdC60YbQuNGOINC4INC90LDQv9C40YHQsNGC0Ywg0LIg0L/QvtGC0L7QvNC60LUpOlxuICogMS4g0J/QvtC70YPRh9C40YLRjCDQtNCw0L3QvdGL0LUg0L/QtdGA0LXQvdC+0YHQsCDQuNC3IGF2YXRhci5nZXREcmFnSW5mbygpXG4gKiAyLiDQntC/0YDQtdC00LXQu9C40YLRjCwg0LLQvtC30LzQvtC20LXQvSDQu9C4INC/0LXRgNC10L3QvtGBINC90LAgX3RhcmdldEVsZW0gKNC10YHQu9C4INC+0L0g0LXRgdGC0YwpXG4gKiAzLiDQktGL0LfQstCw0YLRjCBhdmF0YXIub25EcmFnRW5kKCkg0LjQu9C4IGF2YXRhci5vbkRyYWdDYW5jZWwoKVxuICogINCV0YHQu9C4INC90YPQttC90L4g0L/QvtC00YLQstC10YDQtNC40YLRjCDQv9C10YDQtdC90L7RgSDQt9Cw0L/RgNC+0YHQvtC8INC90LAg0YHQtdGA0LLQtdGALCDRgtC+IGF2YXRhci5vbkRyYWdFbmQoKSxcbiAqICDQsCDQt9Cw0YLQtdC8INCw0YHQuNC90YXRgNC+0L3QvdC+LCDQtdGB0LvQuCDRgdC10YDQstC10YAg0LLQtdGA0L3Rg9C7INC+0YjQuNCx0LrRgywgYXZhdGFyLm9uRHJhZ0NhbmNlbCgpXG4gKiAg0J/RgNC4INGN0YLQvtC8INCw0LLQsNGC0LDRgCDQtNC+0LvQttC10L0g0YPQvNC10YLRjCBcItC+0YLQutCw0YLRi9Cy0LDRgtGM0YHRj1wiINC/0L7RgdC70LUgb25EcmFnRW5kLlxuICpcbiAqINCf0YDQuCDQu9GO0LHQvtC8INC30LDQstC10YDRiNC10L3QuNC4INGN0YLQvtCz0L4g0LzQtdGC0L7QtNCwINC90YPQttC90L4gKNC00LXQu9Cw0LXRgtGB0Y8g0L3QuNC20LUpOlxuICogINGB0L3Rj9GC0Ywg0YLQtdC60YPRidGD0Y4g0LjQvdC00LjQutCw0YbQuNGOINC/0LXRgNC10L3QvtGB0LBcbiAqICDQvtCx0L3Rg9C70LjRgtGMIHRoaXMuX3RhcmdldEVsZW1cbiAqL1xuRHJvcFRhcmdldC5wcm90b3R5cGUub25EcmFnRW5kID0gZnVuY3Rpb24oYXZhdGFyLCBldmVudCkge1xuICAgIHRoaXMuX2hpZGVIb3ZlckluZGljYXRpb24oYXZhdGFyKTtcbiAgICB0aGlzLl90YXJnZXRFbGVtID0gbnVsbDtcbn07XG5cbi8qKlxuICog0JLRhdC+0LQg0LDQstCw0YLQsNGA0LAg0LIgRHJvcFRhcmdldFxuICovXG5Ecm9wVGFyZ2V0LnByb3RvdHlwZS5vbkRyYWdFbnRlciA9IGZ1bmN0aW9uKGZyb21Ecm9wVGFyZ2V0LCBhdmF0YXIsIGV2ZW50KSB7XG4gICAgY29uc3QgY29vcmRzID0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IFkgPSBjb29yZHMudG9wICsgY29vcmRzLmhlaWdodCAvIDI7XG59O1xuXG4vKipcbiAqINCS0YvRhdC+0LQg0LDQstCw0YLQsNGA0LAg0LjQtyBEcm9wVGFyZ2V0XG4gKi9cbkRyb3BUYXJnZXQucHJvdG90eXBlLm9uRHJhZ0xlYXZlID0gZnVuY3Rpb24odG9Ecm9wVGFyZ2V0LCBhdmF0YXIsIGV2ZW50KSB7XG4gICAgdGhpcy5faGlkZUhvdmVySW5kaWNhdGlvbigpO1xuICAgIHRoaXMuX3RhcmdldEVsZW0gPSBudWxsO1xufTtcbiIsImltcG9ydCBEcmFnQXZhdGFyIGZyb20gJy4vRHJhZ0F2YXRhcic7XG5pbXBvcnQge2dldENvb3Jkc30gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWVEcmFnQXZhdGFyIGV4dGVuZHMgRHJhZ0F2YXRhciB7XG4gICAgY29uc3RydWN0b3IgKGRyYWdab25lLCBkcmFnRWxlbSkge1xuICAgICAgICBzdXBlcihkcmFnWm9uZSwgZHJhZ0VsZW0pO1xuICAgIH1cblxuICAgIGluaXRGcm9tRXZlbnQgKGRvd25YLCBkb3duWSwgZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcmFnZ2FibGUnKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2RyYWdab25lRWxlbSA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW0gPSB0aGlzLl9kcmFnWm9uZUVsZW0uY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgIGVsZW0uY2xhc3NOYW1lID0gJ2F2YXRhcic7XG5cbiAgICAgICAgLy8g0YHQvtC30LTQsNGC0Ywg0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INGB0LLQvtC50YHRgtCy0LAgc2hpZnRYL3NoaWZ0WVxuICAgICAgICBsZXQgY29vcmRzID0gZ2V0Q29vcmRzKHRoaXMuX2RyYWdab25lRWxlbSk7XG5cbiAgICAgICAgdGhpcy5fc2hpZnRYID0gZG93blggLSBjb29yZHMubGVmdDtcbiAgICAgICAgdGhpcy5fc2hpZnRZID0gZG93blkgLSBjb29yZHMudG9wO1xuXG4gICAgICAgIC8vINC40L3QuNGG0LjQuNGA0L7QstCw0YLRjCDQvdCw0YfQsNC70L4g0L/QtdGA0LXQvdC+0YHQsFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgICBlbGVtLnN0eWxlLnpJbmRleCA9IDk5OTk7XG4gICAgICAgIGVsZW0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAvLyBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgX2Rlc3Ryb3kgKCkge1xuICAgICAgICB0aGlzLl9lbGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fZWxlbSk7XG4gICAgfVxuXG4gICAgb25EcmFnQ2FuY2VsICgpIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveSgpO1xuICAgIH1cblxuICAgIG9uRHJhZ0VuZCAoKSB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHJhZ1pvbmUgZnJvbSAnLi9EcmFnWm9uZSc7XG5pbXBvcnQgVHJlZURyYWdBdmF0YXIgZnJvbSAnLi9UcmVlRHJhZ0F2YXRhcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWVEcmFnWm9uZSBleHRlbmRzIERyYWdab25lIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtKSB7XG4gICAgICAgIHN1cGVyKGVsZW0pO1xuICAgIH1cbiAgICBfbWFrZUF2YXRhciAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVHJlZURyYWdBdmF0YXIodGhpcywgdGhpcy5fZWxlbSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IERyb3BUYXJnZXQgZnJvbSAnLi9Ecm9wVGFyZ2V0JztcbmltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlZURyb3BUYXJnZXQgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtKSB7XG4gICAgICAgIHN1cGVyKGVsZW0pO1xuICAgIH1cblxuICAgIF9zaG93SG92ZXJJbmRpY2F0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWxlbSAmJiB0aGlzLl90YXJnZXRFbGVtLmNsYXNzTGlzdC5hZGQoJ2hvdmVyJyk7XG4gICAgfVxuXG4gICAgX2hpZGVIb3ZlckluZGljYXRpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbGVtICYmIHRoaXMuX3RhcmdldEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWxlbSAmJiB0aGlzLl90YXJnZXRFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Fib3ZlJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsZW0gJiYgdGhpcy5fdGFyZ2V0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd1bmRlcicpO1xuICAgIH1cblxuICAgIF9nZXRUYXJnZXRFbGVtIChhdmF0YXIsIGV2ZW50KSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBhdmF0YXIuZ2V0VGFyZ2V0RWxlbSgpO1xuXG4gICAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHBhYmxlJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC40YLRjCwg0LzQvtC20LXRgiDQsdGL0YLRjCDQv9C10YDQtdC90L7RgSDRg9C30LvQsCDQstC90YPRgtGA0Ywg0YHQsNC80L7Qs9C+INGB0LXQsdGPINC40LvQuCDQsiDRgdC10LHRjz9cbiAgICAgICAgbGV0IGVsZW1Ub01vdmUgPSBhdmF0YXIuZ2V0RHJhZ0luZm8oZXZlbnQpLmRyYWdab25lRWxlbS5wYXJlbnROb2RlO1xuXG4gICAgICAgIGxldCBlbGVtID0gdGFyZ2V0O1xuXG4gICAgICAgIHdoaWxlIChlbGVtKSB7XG4gICAgICAgICAgICBpZiAoZWxlbSA9PT0gZWxlbVRvTW92ZSkgcmV0dXJuOyAvLyDQv9C+0L/Ri9GC0LrQsCDQv9C10YDQtdC90LXRgdGC0Lgg0YDQvtC00LjRgtC10LvRjyDQsiDQv9C+0YLQvtC80LrQsFxuICAgICAgICAgICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgYWRkQm9yZGVyIChib3JkZXIpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWxlbSAmJiB0aGlzLl90YXJnZXRFbGVtLmNsYXNzTGlzdC5hZGQoYm9yZGVyKTtcbiAgICB9XG5cbiAgICByZW1vdmVCb3JkZXIgKGJvcmRlcikge1xuICAgICAgICB0aGlzLl90YXJnZXRFbGVtICYmIHRoaXMuX3RhcmdldEVsZW0uY2xhc3NMaXN0LnJlbW92ZShib3JkZXIpO1xuICAgIH1cblxuICAgIG9uRHJhZ01vdmUoYXZhdGFyLCBldmVudCkge1xuICAgICAgICBzdXBlci5vbkRyYWdNb3ZlKGF2YXRhciwgZXZlbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLl90YXJnZXRFbGVtKSB7XG4gICAgICAgICAgICBjb25zdCBjbGllbnRZID0gZXZlbnQuY2xpZW50WTtcblxuICAgICAgICAgICAgY29uc3Qge3RvcCwgaGVpZ2h0fSA9IHRoaXMuX3RhcmdldEVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRNaWRkbGUgPSB0b3AgKyBoZWlnaHQgLyAyO1xuXG4gICAgICAgICAgICBpZiAoY2xpZW50WSA8IGVsZW1lbnRNaWRkbGUpIHtcbiAgICAgICAgICAgICAgICAvLyB1cHdhcmRzXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVCb3JkZXIoJ3VuZGVyJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCb3JkZXIoJ2Fib3ZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGRvd253YXJkc1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQm9yZGVyKCdhYm92ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQm9yZGVyKCd1bmRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmFnRW5kIChhdmF0YXIsIGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5fdGFyZ2V0RWxlbSkge1xuICAgICAgICAgICAgLy8g0L/QtdGA0LXQvdC+0YEg0LfQsNC60L7QvdGH0LjQu9GB0Y8g0LLQvdC1INC/0L7QtNGF0L7QtNGP0YnQtdC5INGC0L7Rh9C60Lgg0L/RgNC40LfQtdC80LvQtdC90LjRj1xuICAgICAgICAgICAgYXZhdGFyLm9uRHJhZ0NhbmNlbCgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9oaWRlSG92ZXJJbmRpY2F0aW9uKCk7XG4gICAgICAgIC8vINC/0L7Qu9GD0YfQuNGC0Ywg0LjQvdGE0L7RgNC80LDRhtC40Y4g0L7QsSDQvtCx0YrQtdC60YLQtSDQv9C10YDQtdC90L7RgdCwXG4gICAgICAgIGxldCBhdmF0YXJJbmZvID0gYXZhdGFyLmdldERyYWdJbmZvKGV2ZW50KTtcblxuICAgICAgICBhdmF0YXIub25EcmFnRW5kKCk7IC8vINCw0LLQsNGC0LDRgCDQsdC+0LvRjNGI0LUg0L3QtSDQvdGD0LbQtdC9LCDQv9C10YDQtdC90L7RgSDRg9GB0L/QtdGI0LXQvVxuXG4gICAgICAgIC8vINCy0YHRgtCw0LLQuNGC0Ywg0Y3Qu9C10LzQtdC90YIg0LIg0LTQtdGC0LXQuSDQsiDQvtGC0YHQvtGA0YLQuNGA0L7QstCw0L3QvdC+0Lwg0L/QvtGA0Y/QtNC60LVcbiAgICAgICAgbGV0IGVsZW1Ub01vdmUgPSBhdmF0YXJJbmZvLmRyYWdab25lRWxlbS5wYXJlbnROb2RlOyAvLyA8TEk+XG4gICAgICAgIGxldCB0aXRsZSA9IGF2YXRhckluZm8uZHJhZ1pvbmVFbGVtLmlubmVySFRNTDsgLy8g0L/QtdGA0LXQvdC+0YHQuNC80YvQuSDQt9Cw0LPQvtC70L7QstC+0LpcblxuICAgICAgICAvLyDQv9C+0LvRg9GH0LjRgtGMINC60L7QvdGC0LXQudC90LXRgCDQtNC70Y8g0YPQt9C70L7QsiDQtNC10YDQtdCy0LAsINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPRjtGJ0LjQuSDRgtC+0YfQutC1INC/0YDQtdC30LXQvNC70LXQvdC40Y9cbiAgICAgICAgbGV0IHVsID0gdGhpcy5fdGFyZ2V0RWxlbS5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdVTCcpWzBdO1xuXG4gICAgICAgIGlmICghdWwpIHsgLy8g0L3QtdGCINC00LXRgtC10LksINGB0L7Qt9C00LDQtNC40Lwg0LrQvtC90YLQtdC50L3QtdGAXG4gICAgICAgICAgICB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1VMJyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbGVtLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0LLRgdGC0LDQstC40YLRjCDQvdC+0LLRi9C5INGD0LfQtdC7INCyINC90YPQttC90L7QtSDQvNC10YHRgtC+INGB0YDQtdC00Lgg0L/QvtGC0L7QvNC60L7Qsiwg0LIg0LDQu9GE0LDQstC40YLQvdC+0Lwg0L/QvtGA0Y/QtNC60LVcbiAgICAgICAgbGV0IGxpID0gbnVsbDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVsLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaSA9IHVsLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgICAgICBsZXQgY2hpbGRUaXRsZSA9IGxpLmNoaWxkcmVuWzBdLmlubmVySFRNTDtcbiAgICAgICAgICAgIGlmIChjaGlsZFRpdGxlID4gdGl0bGUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHVsLmluc2VydEJlZm9yZShlbGVtVG9Nb3ZlLCBsaSk7XG5cbiAgICAgICAgdGhpcy5fdGFyZ2V0RWxlbSA9IG51bGw7XG4gICAgfVxufVxuIiwiaW1wb3J0IERyYWdNYW5hZ2VyIGZyb20gJy4vRHJhZ01hbmFnZXInO1xuaW1wb3J0IERyYWdBdmF0YXIgZnJvbSAnLi9EcmFnQXZhdGFyJztcbmltcG9ydCBEcm9wVGFyZ2V0IGZyb20gJy4vRHJvcFRhcmdldCc7XG5pbXBvcnQgRHJhZ1pvbmUgZnJvbSAnLi9EcmFnWm9uZSc7XG5cbmltcG9ydCBUcmVlRHJhZ1pvbmUgZnJvbSAnLi9UcmVlRHJhZ1pvbmUnO1xuaW1wb3J0IFRyZWVEcm9wVGFyZ2V0IGZyb20gJy4vVHJlZURyb3BUYXJnZXQnO1xuaW1wb3J0IFRyZWVEcmFnQXZhdGFyIGZyb20gJy4vVHJlZURyYWdBdmF0YXInO1xuXG5leHBvcnQge1xuICAgIERyYWdNYW5hZ2VyLFxuICAgIERyYWdBdmF0YXIsXG4gICAgRHJvcFRhcmdldCxcbiAgICBEcmFnWm9uZSxcbiAgICBUcmVlRHJhZ1pvbmUsXG4gICAgVHJlZURyb3BUYXJnZXQsXG4gICAgVHJlZURyYWdBdmF0YXJcbn1cblxuLy8gbGV0IHRyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdHJlZScpO1xuLy8gbGV0IGRyYWdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyYWdnYWJsZScpO1xuLy9cbi8vIGNvbnN0IHRyZWVEcmFnWm9uZSA9IG5ldyBUcmVlRHJhZ1pvbmUodHJlZSk7XG4vLyBjb25zdCB0cmVlRHJvcFRhcmdldCA9IG5ldyBUcmVlRHJvcFRhcmdldCh0cmVlKTtcblxuXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmRzIChlbGVtKSB7XG4gICAgbGV0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgbGV0IGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICBsZXQgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wO1xuICAgIGxldCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsTGVmdCB8fCBib2R5LnNjcm9sbExlZnQ7XG5cbiAgICBsZXQgY2xpZW50VG9wID0gZG9jRWxlbS5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgICBsZXQgY2xpZW50TGVmdCA9IGRvY0VsZW0uY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcblxuICAgIGxldCB0b3AgPSBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wO1xuICAgIGxldCBsZWZ0ID0gYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCh0b3ApLFxuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGxlZnQpXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnRVbmRlckNsaWVudFhZIChlbGVtLCBjbGllbnRYLCBjbGllbnRZKSB7XG4gICAgbGV0IGRpc3BsYXkgPSBlbGVtLnN0eWxlLmRpc3BsYXkgfHwgJyc7XG5cbiAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChjbGllbnRYLCBjbGllbnRZKTtcblxuICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG5cbiAgICBpZiAoIXRhcmdldCB8fCB0YXJnZXQgPT0gZG9jdW1lbnQpIHsgLy8g0Y3RgtC+INCx0YvQstCw0LXRgiDQv9GA0Lgg0LLRi9C90L7RgdC1INC30LAg0LPRgNCw0L3QuNGG0Ysg0L7QutC90LBcbiAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTsgLy8g0L/QvtC/0YDQsNCy0LjRgtGMINC30L3QsNGH0LXQvdC40LUsINGH0YLQvtCx0Ysg0LHRi9C7INC40LzQtdC90L3QviDRjdC70LXQvNC10L3RglxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQgKENoaWxkLCBQYXJlbnQpIHtcbiAgICBmdW5jdGlvbiBGKCkge31cblxuICAgIEYucHJvdG90eXBlID0gUGFyZW50LnByb3RvdHlwZTtcbiAgICBDaGlsZC5wcm90b3R5cGUgPSBuZXcgRigpO1xuICAgIENoaWxkLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENoaWxkO1xuICAgIENoaWxkLnBhcmVudCA9IFBhcmVudC5wcm90b3R5cGU7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9