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
/******/ 	__webpack_require__.p = "/dist/";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RyYWdBdmF0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RyYWdNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9EcmFnWm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJvcFRhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVHJlZURyYWdBdmF0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RyZWVEcmFnWm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVHJlZURyb3BUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJEcmFnQXZhdGFyIiwiZHJhZ1pvbmUiLCJkcmFnRWxlbSIsIl9kcmFnWm9uZSIsIl9kcmFnWm9uZUVsZW0iLCJfZWxlbSIsInByb3RvdHlwZSIsImluaXRGcm9tRXZlbnQiLCJkb3duWCIsImRvd25ZIiwiZXZlbnQiLCJnZXREcmFnSW5mbyIsImVsZW0iLCJkcmFnWm9uZUVsZW0iLCJnZXRUYXJnZXRFbGVtIiwiX2N1cnJlbnRUYXJnZXRFbGVtIiwib25EcmFnTW92ZSIsInN0eWxlIiwibGVmdCIsInBhZ2VYIiwiX3NoaWZ0WCIsInRvcCIsInBhZ2VZIiwiX3NoaWZ0WSIsImNsaWVudFgiLCJjbGllbnRZIiwib25EcmFnQ2FuY2VsIiwib25EcmFnRW5kIiwiZHJhZ01hbmFnZXIiLCJhdmF0YXIiLCJkcm9wVGFyZ2V0Iiwic2VsZiIsIm9uRHJhZ1N0YXJ0Iiwib25Nb3VzZURvd24iLCJlIiwid2hpY2giLCJmaW5kRHJhZ1pvbmUiLCJvbk1vdXNlTW92ZSIsIk1hdGgiLCJhYnMiLCJjbGVhblVwIiwibmV3RHJvcFRhcmdldCIsImZpbmREcm9wVGFyZ2V0Iiwib25EcmFnTGVhdmUiLCJvbkRyYWdFbnRlciIsIm9uTW91c2VVcCIsInRhcmdldCIsImRvY3VtZW50IiwicGFyZW50Tm9kZSIsImluaXRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiRHJhZ1pvbmUiLCJfbWFrZUF2YXRhciIsIkRyb3BUYXJnZXQiLCJfdGFyZ2V0RWxlbSIsIl9nZXRUYXJnZXRFbGVtIiwiX2hpZGVIb3ZlckluZGljYXRpb24iLCJfc2hvd0hvdmVySW5kaWNhdGlvbiIsIm5ld1RhcmdldEVsZW0iLCJmcm9tRHJvcFRhcmdldCIsImNvb3JkcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIlkiLCJoZWlnaHQiLCJ0b0Ryb3BUYXJnZXQiLCJUcmVlRHJhZ0F2YXRhciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xvbmVOb2RlIiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwiekluZGV4IiwicG9zaXRpb24iLCJyZW1vdmVDaGlsZCIsIl9kZXN0cm95IiwiVHJlZURyYWdab25lIiwiVHJlZURyb3BUYXJnZXQiLCJhZGQiLCJyZW1vdmUiLCJlbGVtVG9Nb3ZlIiwiYm9yZGVyIiwiZWxlbWVudE1pZGRsZSIsInJlbW92ZUJvcmRlciIsImFkZEJvcmRlciIsImF2YXRhckluZm8iLCJ0aXRsZSIsImlubmVySFRNTCIsInVsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjcmVhdGVFbGVtZW50IiwibGkiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjaGlsZFRpdGxlIiwiaW5zZXJ0QmVmb3JlIiwiRHJhZ01hbmFnZXIiLCJnZXRDb29yZHMiLCJnZXRFbGVtZW50VW5kZXJDbGllbnRYWSIsImV4dGVuZCIsImJveCIsImRvY0VsZW0iLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsInNjcm9sbExlZnQiLCJwYWdlWE9mZnNldCIsImNsaWVudFRvcCIsImNsaWVudExlZnQiLCJyb3VuZCIsImRpc3BsYXkiLCJlbGVtZW50RnJvbVBvaW50IiwiQ2hpbGQiLCJQYXJlbnQiLCJGIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiXSwi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RixJQUFYO0FBRkgsS0FBUDtBQUlIOztBQUVNLFNBQVNpRix1QkFBVCxDQUFrQ3ZGLElBQWxDLEVBQXdDWSxPQUF4QyxFQUFpREMsT0FBakQsRUFBMEQ7QUFDN0QsUUFBSXVGLFVBQVVwRyxLQUFLSyxLQUFMLENBQVcrRixPQUFYLElBQXNCLEVBQXBDOztBQUVBcEcsU0FBS0ssS0FBTCxDQUFXK0YsT0FBWCxHQUFxQixNQUFyQjs7QUFFQSxRQUFJbEUsU0FBU0MsU0FBU2tFLGdCQUFULENBQTBCekYsT0FBMUIsRUFBbUNDLE9BQW5DLENBQWI7O0FBRUFiLFNBQUtLLEtBQUwsQ0FBVytGLE9BQVgsR0FBcUJBLE9BQXJCOztBQUVBLFFBQUksQ0FBQ2xFLE1BQUQsSUFBV0EsVUFBVUMsUUFBekIsRUFBbUM7QUFBRTtBQUNqQ0QsaUJBQVNDLFNBQVN1QixJQUFsQixDQUQrQixDQUNQO0FBQzNCOztBQUVELFdBQU94QixNQUFQO0FBQ0g7O0FBRU0sU0FBU3NELE1BQVQsQ0FBaUJjLEtBQWpCLEVBQXdCQyxNQUF4QixFQUFnQztBQUNuQyxhQUFTQyxDQUFULEdBQWEsQ0FBRTs7QUFFZkEsTUFBRTlHLFNBQUYsR0FBYzZHLE9BQU83RyxTQUFyQjtBQUNBNEcsVUFBTTVHLFNBQU4sR0FBa0IsSUFBSThHLENBQUosRUFBbEI7QUFDQUYsVUFBTTVHLFNBQU4sQ0FBZ0IrRyxXQUFoQixHQUE4QkgsS0FBOUI7QUFDQUEsVUFBTUksTUFBTixHQUFlSCxPQUFPN0csU0FBdEI7QUFDSCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgZ2V0RWxlbWVudFVuZGVyQ2xpZW50WFkgfSBmcm9tICcuL3V0aWxzJztcbi8qKlxuICogXCLQkNCy0LDRgtCw0YBcIiAtINGN0LvQtdC80LXQvdGCLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdGC0LDRgdC60LjQstCw0LXRgtGB0Y8uXG4gKlxuICog0JIg0L/RgNC+0YHRgtC10LnRiNC10Lwg0YHQu9GD0YfQsNC1INCw0LLQsNGC0LDRgNC+0Lwg0Y/QstC70Y/QtdGC0YHRjyDRgdCw0Lwg0L/QtdGA0LXQvdC+0YHQuNC80YvQuSDRjdC70LXQvNC10L3RglxuICog0KLQsNC60LbQtSDQsNCy0LDRgtCw0YAg0LzQvtC20LXRgiDQsdGL0YLRjCDQutC70L7QvdC40YDQvtCy0LDQvdC90YvQvCDRjdC70LXQvNC10L3RgtC+0LxcbiAqINCi0LDQutC20LUg0LDQstCw0YLQsNGAINC80L7QttC10YIg0LHRi9GC0Ywg0LjQutC+0L3QutC+0Lkg0Lgg0LLQvtC+0LHRidC1INGH0LXQvCDRg9Cz0L7QtNC90L4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERyYWdBdmF0YXIoZHJhZ1pvbmUsIGRyYWdFbGVtKSB7XG4gICAgLyoqIFwi0YDQvtC00LjRgtC10LvRjNGB0LrQsNGPXCIg0LfQvtC90LAg0L/QtdGA0LXQvdC+0YHQsCAqL1xuICAgIHRoaXMuX2RyYWdab25lID0gZHJhZ1pvbmU7XG5cbiAgICAvKipcbiAgICAgKiDQv9C+0LTRjdC70LXQvNC10L3RgiDRgNC+0LTQuNGC0LXQu9GM0YHQutC+0Lkg0LfQvtC90YssINC6INC60L7RgtC+0YDQvtC80YMg0L7RgtC90L7RgdC40YLRgdGPINCw0LLQsNGC0LDRgFxuICAgICAqINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOIC0g0Y3Qu9C10LzQtdC90YIsINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPRjtGJ0LjQuSDQstGB0LXQuSDQt9C+0L3QtVxuICAgICAqINC80L7QttC10YIg0LHRi9GC0Ywg0YPRgtC+0YfQvdC10L0g0LIgaW5pdEZyb21FdmVudFxuICAgICAqL1xuICAgIHRoaXMuX2RyYWdab25lRWxlbSA9IGRyYWdFbGVtO1xuXG4gICAgLyoqXG4gICAgICog0KHQsNC8INGN0LvQtdC80LXQvdGCINCw0LLQsNGC0LDRgNCwLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC90L7RgdC40YLRjNGB0Y8g0L/QviDRjdC60YDQsNC90YMuXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30YPQtdGC0YHRjyDQsiBpbml0RnJvbUV2ZW50XG4gICAgICovXG4gICAgdGhpcy5fZWxlbSA9IGRyYWdFbGVtO1xufVxuXG4vKipcbiAqINCY0L3QuNGG0LjQsNC70LjQt9C+0LLQsNGC0YwgdGhpcy5fZWxlbSDQuCDQv9C+0LfQuNGG0LjQvtC90LjRgNC+0LLQsNGC0Ywg0LXQs9C+XG4gKiDQn9GA0Lgg0L3QtdC+0LHRhdC+0LTQuNC80L7RgdGC0Lgg0YPRgtC+0YfQvdC40YLRjCB0aGlzLl9kcmFnWm9uZUVsZW1cbiAqIEBwYXJhbSBkb3duWCDQmtC+0L7RgNC00LjQvdCw0YLQsCBYINC90LDQttCw0YLQuNGPINC80YvRiNC4XG4gKiBAcGFyYW0gZG93blkg0JrQvtC+0YDQtNC40L3QsNGC0LAgWSDQvdCw0LbQsNGC0LjRjyDQvNGL0YjQuFxuICogQHBhcmFtIGV2ZW50INCi0LXQutGD0YnQtdC1INGB0L7QsdGL0YLQuNC1INC80YvRiNC4XG4gKi9cbkRyYWdBdmF0YXIucHJvdG90eXBlLmluaXRGcm9tRXZlbnQgPSBmdW5jdGlvbihkb3duWCwgZG93blksIGV2ZW50KSB7XG4gICAgLyogb3ZlcnJpZGUgKi9cbn07XG5cbi8qKlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0LjQvdGE0L7RgNC80LDRhtC40Y4g0L4g0L/QtdGA0LXQvdC+0YHQuNC80L7QvCDRjdC70LXQvNC10L3RgtC1INC00LvRjyBEcm9wVGFyZ2V0XG4gKiBAcGFyYW0gZXZlbnRcbiAqL1xuRHJhZ0F2YXRhci5wcm90b3R5cGUuZ2V0RHJhZ0luZm8gPSBmdW5jdGlvbihldmVudCkge1xuICAgIC8vINGC0YPRgiDQvNC+0LbQtdGCINCx0YvRgtGMINC10YnQtSDQutCw0LrQsNGPLdGC0L4g0LjQvdGE0L7RgNC80LDRhtC40Y8sINC90LXQvtCx0YXQvtC00LjQvNCw0Y8g0LTQu9GPINC+0LHRgNCw0LHQvtGC0LrQuCDQutC+0L3RhtCwINC40LvQuCDQv9GA0L7RhtC10YHRgdCwINC/0LXRgNC10L3QvtGB0LBcbiAgICByZXR1cm4ge1xuICAgICAgICBlbGVtOiB0aGlzLl9lbGVtLFxuICAgICAgICBkcmFnWm9uZUVsZW06IHRoaXMuX2RyYWdab25lRWxlbSxcbiAgICAgICAgZHJhZ1pvbmU6IHRoaXMuX2RyYWdab25lXG4gICAgfTtcbn07XG5cbi8qKlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YLQtdC60YPRidC40Lkg0YHQsNC80YvQuSDQs9C70YPQsdC+0LrQuNC5IERPTS3RjdC70LXQvNC10L3RgiDQv9C+0LQgdGhpcy5fZWxlbVxuICog0J/RgNC40LLQsNGC0L3QvtC1INGB0LLQvtC50YHRgtCy0L4gX2N1cnJlbnRUYXJnZXRFbGVtINC+0LHQvdC+0LLQu9GP0LXRgtGB0Y8g0L/RgNC4INC60LDQttC00L7QvCDQv9C10YDQtdC00LLQuNC20LXQvdC40LhcbiAqL1xuRHJhZ0F2YXRhci5wcm90b3R5cGUuZ2V0VGFyZ2V0RWxlbSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGFyZ2V0RWxlbTtcbn07XG5cbi8qKlxuICog0J/RgNC4INC60LDQttC00L7QvCDQtNCy0LjQttC10L3QuNC4INC80YvRiNC4INC/0LXRgNC10LzQtdGJ0LDQtdGCIHRoaXMuX2VsZW1cbiAqINC4INC30LDQv9C40YHRi9Cy0LDQtdGCINGC0LXQutGD0YnQuNC5INGN0LvQtdC80LXQvdGCINC/0L7QtCB0aGlzLl9lbGVtINCyIF9jdXJyZW50VGFyZ2V0RWxlbVxuICogQHBhcmFtIGV2ZW50XG4gKi9cbkRyYWdBdmF0YXIucHJvdG90eXBlLm9uRHJhZ01vdmUgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuX2VsZW0uc3R5bGUubGVmdCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5fc2hpZnRYICsgJ3B4JztcbiAgICB0aGlzLl9lbGVtLnN0eWxlLnRvcCA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5fc2hpZnRZICsgJ3B4JztcblxuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXRFbGVtID0gZ2V0RWxlbWVudFVuZGVyQ2xpZW50WFkodGhpcy5fZWxlbSwgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG59O1xuXG4vKipcbiAqINCU0LXQudGB0YLQstC40Y8g0YEg0LDQstCw0YLQsNGA0L7QvCwg0LrQvtCz0LTQsCDQv9C10YDQtdC90L7RgSDQvdC1INGD0LTQsNC70YHRj1xuICog0J3QsNC/0YDQuNC80LXRgCwg0LzQvtC20L3QviDQstC10YDQvdGD0YLRjCDRjdC70LXQvNC10L3RgiDQvtCx0YDQsNGC0L3QviDQuNC70Lgg0YPQvdC40YfRgtC+0LbQuNGC0YxcbiAqL1xuRHJhZ0F2YXRhci5wcm90b3R5cGUub25EcmFnQ2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgLyogb3ZlcnJpZGUgKi9cbn07XG5cbi8qKlxuICog0JTQtdC50YHRgtCy0LjRjyDRgSDQsNCy0LDRgtCw0YDQvtC8INC/0L7RgdC70LUg0YPRgdC/0LXRiNC90L7Qs9C+INC/0LXRgNC10L3QvtGB0LBcbiAqL1xuRHJhZ0F2YXRhci5wcm90b3R5cGUub25EcmFnRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgLyogb3ZlcnJpZGUgKi9cbn07XG4iLCJsZXQgZHJhZ01hbmFnZXIgPSBuZXcgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgZHJhZ1pvbmUsIGF2YXRhciwgZHJvcFRhcmdldDtcbiAgICBsZXQgZG93blgsIGRvd25ZO1xuXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gb25EcmFnU3RhcnQoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG5cbiAgICAgICAgaWYgKGUud2hpY2ggIT09IDEpIHsgLy8g0L3QtSDQu9C10LLQvtC5INC60L3QvtC/0LrQvtC5XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBkcmFnWm9uZSA9IGZpbmREcmFnWm9uZShlKTtcblxuICAgICAgICBpZiAoIWRyYWdab25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQt9Cw0L/QvtC80L3QuNC8LCDRh9GC0L4g0Y3Qu9C10LzQtdC90YIg0L3QsNC20LDRgiDQvdCwINGC0LXQutGD0YnQuNGFINC60L7QvtGA0LTQuNC90LDRgtCw0YUgcGFnZVgvcGFnZVlcbiAgICAgICAgZG93blggPSBlLnBhZ2VYO1xuICAgICAgICBkb3duWSA9IGUucGFnZVk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VNb3ZlKGUpIHtcbiAgICAgICAgaWYgKCFkcmFnWm9uZSkgcmV0dXJuOyAvLyDRjdC70LXQvNC10L3RgiDQvdC1INC30LDQttCw0YJcblxuICAgICAgICBpZiAoIWF2YXRhcikgeyAvLyDRjdC70LXQvNC10L3RgiDQvdCw0LbQsNGCLCDQvdC+INC/0L7QutCwINC90LUg0L3QsNGH0LDQu9C4INC10LPQviDQtNCy0LjQs9Cw0YLRjFxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGUucGFnZVggLSBkb3duWCkgPCAzICYmIE1hdGguYWJzKGUucGFnZVkgLSBkb3duWSkgPCAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g0L/QvtC/0YDQvtCx0L7QstCw0YLRjCDQt9Cw0YXQstCw0YLQuNGC0Ywg0Y3Qu9C10LzQtdC90YJcbiAgICAgICAgICAgIGF2YXRhciA9IGRyYWdab25lLm9uRHJhZ1N0YXJ0KGRvd25YLCBkb3duWSwgZSk7XG5cbiAgICAgICAgICAgIGlmICghYXZhdGFyKSB7IC8vINC90LUg0L/QvtC70YPRh9C40LvQvtGB0YwsINC30L3QsNGH0LjRgiDQv9C10YDQtdC90L7RgSDQv9GA0L7QtNC+0LvQttCw0YLRjCDQvdC10LvRjNC30Y9cbiAgICAgICAgICAgICAgICBjbGVhblVwKCk7IC8vINC+0YfQuNGB0YLQuNGC0Ywg0L/RgNC40LLQsNGC0L3Ri9C1INC/0LXRgNC10LzQtdC90L3Ri9C1LCDRgdCy0Y/Qt9Cw0L3QvdGL0LUg0YEg0L/QtdGA0LXQvdC+0YHQvtC8XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g0L7RgtC+0LHRgNCw0LfQuNGC0Ywg0L/QtdGA0LXQvdC+0YEg0L7QsdGK0LXQutGC0LAsINC/0LXRgNC10LLRi9GH0LjRgdC70LjRgtGMINGC0LXQutGD0YnQuNC5INGN0LvQtdC80LXQvdGCINC/0L7QtCDQutGD0YDRgdC+0YDQvtC8XG4gICAgICAgIGF2YXRhci5vbkRyYWdNb3ZlKGUpO1xuXG4gICAgICAgIC8vINC90LDQudGC0Lgg0L3QvtCy0YvQuSBkcm9wVGFyZ2V0INC/0L7QtCDQutGD0YDRgdC+0YDQvtC8OiBuZXdEcm9wVGFyZ2V0XG4gICAgICAgIC8vINGC0LXQutGD0YnQuNC5IGRyb3BUYXJnZXQg0L7RgdGC0LDQu9GB0Y8g0L7RgiDQv9GA0L7RiNC70L7Qs9C+IG1vdXNlbW92ZVxuICAgICAgICAvLyAq0L7QsdCwINC30L3QsNGH0LXQvdC40Y86INC4IG5ld0Ryb3BUYXJnZXQg0LggZHJvcFRhcmdldCDQvNC+0LPRg9GCINCx0YvRgtGMIG51bGxcbiAgICAgICAgbGV0IG5ld0Ryb3BUYXJnZXQgPSBmaW5kRHJvcFRhcmdldChlKTtcblxuICAgICAgICBpZiAobmV3RHJvcFRhcmdldCAhPT0gZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgLy8g0YPQstC10LTQvtC80LjRgtGMINGB0YLQsNGA0YPRjiDQuCDQvdC+0LLRg9GOINC30L7QvdGLLdGG0LXQu9C4INC+INGC0L7QvCwg0YfRgtC+INGBINC90LjRhSDRg9GI0LvQuC/QvdCwINC90LjRhSDQt9Cw0YjQu9C4XG4gICAgICAgICAgICBkcm9wVGFyZ2V0ICYmIGRyb3BUYXJnZXQub25EcmFnTGVhdmUobmV3RHJvcFRhcmdldCwgYXZhdGFyLCBlKTtcbiAgICAgICAgICAgIG5ld0Ryb3BUYXJnZXQgJiYgbmV3RHJvcFRhcmdldC5vbkRyYWdFbnRlcihkcm9wVGFyZ2V0LCBhdmF0YXIsIGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZHJvcFRhcmdldCA9IG5ld0Ryb3BUYXJnZXQ7XG5cbiAgICAgICAgZHJvcFRhcmdldCAmJiBkcm9wVGFyZ2V0Lm9uRHJhZ01vdmUoYXZhdGFyLCBlKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKGUpIHtcblxuICAgICAgICBpZiAoZS53aGljaCAhPT0gMSkgeyAvLyDQvdC1INC70LXQstC+0Lkg0LrQvdC+0L/QutC+0LlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhdmF0YXIpIHsgLy8g0LXRgdC70Lgg0YPQttC1INC90LDRh9Cw0LvQuCDQv9C10YDQtdC00LLQuNCz0LDRgtGMXG5cbiAgICAgICAgICAgIGlmIChkcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8g0LfQsNCy0LXRgNGI0LjRgtGMINC/0LXRgNC10L3QvtGBINC4INC40LfQsdCw0LLQuNGC0YzRgdGPINC+0YIg0LDQstCw0YLQsNGA0LAsINC10YHQu9C4INGN0YLQviDQvdGD0LbQvdC+XG4gICAgICAgICAgICAgICAgLy8g0Y3RgtCwINGE0YPQvdC60YbQuNGPINC+0LHRj9C30LDQvdCwINCy0YvQt9Cy0LDRgtGMIGF2YXRhci5vbkRyYWdFbmQvb25EcmFnQ2FuY2VsXG4gICAgICAgICAgICAgICAgZHJvcFRhcmdldC5vbkRyYWdFbmQoYXZhdGFyLCBlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXZhdGFyLm9uRHJhZ0NhbmNlbCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjbGVhblVwKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW5VcCgpIHtcbiAgICAgICAgLy8g0L7Rh9C40YHRgtC40YLRjCDQstGB0LUg0L/RgNC+0LzQtdC20YPRgtC+0YfQvdGL0LUg0L7QsdGK0LXQutGC0YtcbiAgICAgICAgZHJhZ1pvbmUgPSBhdmF0YXIgPSBkcm9wVGFyZ2V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kRHJhZ1pvbmUoZXZlbnQpIHtcbiAgICAgICAgbGV0IGVsZW0gPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgd2hpbGUgKGVsZW0gIT09IGRvY3VtZW50ICYmICFlbGVtLmRyYWdab25lKSB7XG4gICAgICAgICAgICBlbGVtID0gZWxlbS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW0uZHJhZ1pvbmU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZERyb3BUYXJnZXQoZXZlbnQpIHtcbiAgICAgICAgLy8g0L/QvtC70YPRh9C40YLRjCDRjdC70LXQvNC10L3RgiDQv9C+0LQg0LDQstCw0YLQsNGA0L7QvFxuICAgICAgICBsZXQgZWxlbSA9IGF2YXRhci5nZXRUYXJnZXRFbGVtKCk7XG5cbiAgICAgICAgd2hpbGUgKGVsZW0gIT09IGRvY3VtZW50ICYmICFlbGVtLmRyb3BUYXJnZXQpIHtcbiAgICAgICAgICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWVsZW0uZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbS5kcm9wVGFyZ2V0O1xuICAgIH1cblxuICAgIC8vIGRvY3VtZW50Lm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIHJldHVybiBmYWxzZTtcbiAgICAvLyB9O1xuICAgIC8vXG4gICAgLy8gZG9jdW1lbnQub25tb3VzZW1vdmUgPSBvbk1vdXNlTW92ZTtcbiAgICAvLyBkb2N1bWVudC5vbm1vdXNldXAgPSBvbk1vdXNlVXA7XG4gICAgLy8gZG9jdW1lbnQub25tb3VzZWRvd24gPSBvbk1vdXNlRG93bjtcblxuICAgIChmdW5jdGlvbiBpbml0TGlzdGVuZXJzKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBvbkRyYWdTdGFydCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICB9KSgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZHJhZ01hbmFnZXI7XG4iLCIvKipcbiAqINCX0L7QvdCwLCDQuNC3INC60L7RgtC+0YDQvtC5INC80L7QttC90L4g0L/QtdGA0LXQvdC+0YHQuNGC0Ywg0L7QsdGK0LXQutGC0YtcbiAqINCj0LzQtdC10YIg0L7QsdGA0LDQsdCw0YLRi9Cy0LDRgtGMINC90LDRh9Cw0LvQviDQv9C10YDQtdC90L7RgdCwINC90LAg0YHQtdCx0LUg0Lgg0YHQvtC30LTQsNCy0LDRgtGMIFwi0LDQstCw0YLQsNGAXCJcbiAqIEBwYXJhbSBlbGVtIERPTS3RjdC70LXQvNC10L3Rgiwg0Log0LrQvtGC0L7RgNC+0LzRgyDQv9GA0LjQstGP0LfQsNC90LAg0LfQvtC90LBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHJhZ1pvbmUoZWxlbSkge1xuICBlbGVtLmRyYWdab25lID0gdGhpcztcbiAgdGhpcy5fZWxlbSA9IGVsZW07XG59XG5cbi8qKlxuICog0KHQvtC30LTQsNGC0Ywg0LDQstCw0YLQsNGALCDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0Y7RidC40Lkg0LfQvtC90LUuXG4gKiDQoyDRgNCw0LfQvdGL0YUg0LfQvtC9INC80L7Qs9GD0YIg0LHRi9GC0Ywg0YDQsNC30L3Ri9C1INGC0LjQv9GLINCw0LLQsNGC0LDRgNC+0LJcbiAqL1xuRHJhZ1pvbmUucHJvdG90eXBlLl9tYWtlQXZhdGFyID0gZnVuY3Rpb24oKSB7XG4gIC8qIG92ZXJyaWRlICovXG59O1xuXG4vKipcbiAqINCe0LHRgNCw0LHQvtGC0LDRgtGMINC90LDRh9Cw0LvQviDQv9C10YDQtdC90L7RgdCwLlxuICpcbiAqINCf0L7Qu9GD0YfQsNC10YIg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0LjQt9C90LDRh9Cw0LvRjNC90L7Qs9C+INC90LDQttCw0YLQuNGPINC80YvRiNC60LgsINGB0L7QsdGL0YLQuNC1LlxuICpcbiAqIEBwYXJhbSBkb3duWCDQmtC+0L7RgNC00LjQvdCw0YLQsCDQuNC30L3QsNGH0LDQu9GM0L3QvtCz0L4g0L3QsNC20LDRgtC40Y8g0L/QviBYXG4gKiBAcGFyYW0gZG93blkg0JrQvtC+0YDQtNC40L3QsNGC0LAg0LjQt9C90LDRh9Cw0LvRjNC90L7Qs9C+INC90LDQttCw0YLQuNGPINC/0L4gWVxuICogQHBhcmFtIGV2ZW50INGC0LXQutGD0YnQtdC1INGB0L7QsdGL0YLQuNC1INC80YvRiNC4XG4gKlxuICogQHJldHVybiDQsNCy0LDRgtCw0YAg0LjQu9C4IGZhbHNlLCDQtdGB0LvQuCDQt9Cw0YXQstCw0YLQuNGC0Ywg0YEg0LTQsNC90L3QvtC5INGC0L7Rh9C60Lgg0L3QuNGH0LXQs9C+INC90LXQu9GM0LfRj1xuICovXG5EcmFnWm9uZS5wcm90b3R5cGUub25EcmFnU3RhcnQgPSBmdW5jdGlvbihkb3duWCwgZG93blksIGV2ZW50KSB7XG5cbiAgbGV0IGF2YXRhciA9IHRoaXMuX21ha2VBdmF0YXIoKTtcblxuICBpZiAoIWF2YXRhci5pbml0RnJvbUV2ZW50KGRvd25YLCBkb3duWSwgZXZlbnQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGF2YXRhcjtcbn07XG4iLCIvKipcbiAqINCX0L7QvdCwLCDQsiDQutC+0YLQvtGA0YPRjiDQvtCx0YrQtdC60YLRiyDQvNC+0LbQvdC+INC60LvQsNGB0YLRjFxuICog0JfQsNC90LjQvNCw0LXRgtGB0Y8g0LjQvdC00LjQutCw0YbQuNC10Lkg0L/QtdGA0LXQtNCy0LjQttC10L3QuNGPINC/0L4g0YHQtdCx0LUsINC00L7QsdCw0LLQu9C10L3QuNC10Lwg0LIg0YHQtdCx0Y9cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHJvcFRhcmdldChlbGVtKSB7XG4gICAgZWxlbS5kcm9wVGFyZ2V0ID0gdGhpcztcbiAgICB0aGlzLl9lbGVtID0gZWxlbTtcblxuICAgIC8qKlxuICAgICAqINCf0L7QtNGN0LvQtdC80LXQvdGCLCDQvdCw0LQg0LrQvtGC0L7RgNGL0Lwg0LIg0L3QsNGB0YLQvtGP0YnQuNC5INC80L7QvNC10L3RgiDQvdCw0YXQvtC00LjRgtGB0Y8g0LDQstCw0YLQsNGAXG4gICAgICovXG4gICAgdGhpcy5fdGFyZ2V0RWxlbSA9IG51bGw7XG59XG5cbi8qKlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIgRE9NLdC/0L7QtNGN0LvQtdC80LXQvdGCLCDQvdCw0LQg0LrQvtGC0L7RgNGL0Lwg0YHQtdC50YfQsNGBINC/0YDQvtC70LXRgtCw0LXRgiDQsNCy0LDRgtCw0YBcbiAqXG4gKiBAcmV0dXJuIERPTS3RjdC70LXQvNC10L3Rgiwg0L3QsCDQutC+0YLQvtGA0YvQuSDQvNC+0LbQvdC+INC/0L7Qu9C+0LbQuNGC0Ywg0LjQu9C4IHVuZGVmaW5lZFxuICovXG5Ecm9wVGFyZ2V0LnByb3RvdHlwZS5fZ2V0VGFyZ2V0RWxlbSA9IGZ1bmN0aW9uKGF2YXRhciwgZXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbTtcbn07XG5cbi8qKlxuICog0KHQv9GA0Y/RgtCw0YLRjCDQuNC90LTQuNC60LDRhtC40Y4g0L/QtdGA0LXQvdC+0YHQsFxuICog0JLRi9C30YvQstCw0LXRgtGB0Y8sINC60L7Qs9C00LAg0LDQstCw0YLQsNGAINGD0YXQvtC00LjRgiDRgSDRgtC10LrRg9GJ0LXQs9C+IHRoaXMuX3RhcmdldEVsZW1cbiAqL1xuRHJvcFRhcmdldC5wcm90b3R5cGUuX2hpZGVIb3ZlckluZGljYXRpb24gPSBmdW5jdGlvbihhdmF0YXIpIHtcbiAgICAvKiBvdmVycmlkZSAqL1xufTtcblxuLyoqXG4gKiDQn9C+0LrQsNC30LDRgtGMINC40L3QtNC40LrQsNGG0LjRjiDQv9C10YDQtdC90L7RgdCwXG4gKiDQktGL0LfRi9Cy0LDQtdGC0YHRjywg0LrQvtCz0LTQsCDQsNCy0LDRgtCw0YAg0L/RgNC40YjQtdC7INC90LAg0L3QvtCy0YvQuSB0aGlzLl90YXJnZXRFbGVtXG4gKi9cbkRyb3BUYXJnZXQucHJvdG90eXBlLl9zaG93SG92ZXJJbmRpY2F0aW9uID0gZnVuY3Rpb24oYXZhdGFyKSB7XG4gICAgLyogb3ZlcnJpZGUgKi9cbn07XG5cbi8qKlxuICog0JzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LrQsNC20LTQvtC8INC00LLQuNC20LXQvdC40Lgg0LDQstCw0YLQsNGA0LBcbiAqL1xuRHJvcFRhcmdldC5wcm90b3R5cGUub25EcmFnTW92ZSA9IGZ1bmN0aW9uKGF2YXRhciwgZXZlbnQpIHtcbiAgICBsZXQgbmV3VGFyZ2V0RWxlbSA9IHRoaXMuX2dldFRhcmdldEVsZW0oYXZhdGFyLCBldmVudCk7XG5cbiAgICBpZiAodGhpcy5fdGFyZ2V0RWxlbSAhPT0gbmV3VGFyZ2V0RWxlbSkge1xuICAgICAgICB0aGlzLl9oaWRlSG92ZXJJbmRpY2F0aW9uKGF2YXRhcik7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsZW0gPSBuZXdUYXJnZXRFbGVtO1xuICAgICAgICB0aGlzLl9zaG93SG92ZXJJbmRpY2F0aW9uKGF2YXRhcik7XG4gICAgfVxufTtcblxuLyoqXG4gKiDQl9Cw0LLQtdGA0YjQtdC90LjQtSDQv9C10YDQtdC90L7RgdCwLlxuICog0JDQu9Cz0L7RgNC40YLQvCDQvtCx0YDQsNCx0L7RgtC60LggKNC/0LXRgNC10L7Qv9GA0LXQtNC10LvQuNGC0Ywg0YTRg9C90LrRhtC40Y4g0Lgg0L3QsNC/0LjRgdCw0YLRjCDQsiDQv9C+0YLQvtC80LrQtSk6XG4gKiAxLiDQn9C+0LvRg9GH0LjRgtGMINC00LDQvdC90YvQtSDQv9C10YDQtdC90L7RgdCwINC40LcgYXZhdGFyLmdldERyYWdJbmZvKClcbiAqIDIuINCe0L/RgNC10LTQtdC70LjRgtGMLCDQstC+0LfQvNC+0LbQtdC9INC70Lgg0L/QtdGA0LXQvdC+0YEg0L3QsCBfdGFyZ2V0RWxlbSAo0LXRgdC70Lgg0L7QvSDQtdGB0YLRjClcbiAqIDMuINCS0YvQt9Cy0LDRgtGMIGF2YXRhci5vbkRyYWdFbmQoKSDQuNC70LggYXZhdGFyLm9uRHJhZ0NhbmNlbCgpXG4gKiAg0JXRgdC70Lgg0L3Rg9C20L3QviDQv9C+0LTRgtCy0LXRgNC00LjRgtGMINC/0LXRgNC10L3QvtGBINC30LDQv9GA0L7RgdC+0Lwg0L3QsCDRgdC10YDQstC10YAsINGC0L4gYXZhdGFyLm9uRHJhZ0VuZCgpLFxuICogINCwINC30LDRgtC10Lwg0LDRgdC40L3RhdGA0L7QvdC90L4sINC10YHQu9C4INGB0LXRgNCy0LXRgCDQstC10YDQvdGD0Lsg0L7RiNC40LHQutGDLCBhdmF0YXIub25EcmFnQ2FuY2VsKClcbiAqICDQn9GA0Lgg0Y3RgtC+0Lwg0LDQstCw0YLQsNGAINC00L7Qu9C20LXQvSDRg9C80LXRgtGMIFwi0L7RgtC60LDRgtGL0LLQsNGC0YzRgdGPXCIg0L/QvtGB0LvQtSBvbkRyYWdFbmQuXG4gKlxuICog0J/RgNC4INC70Y7QsdC+0Lwg0LfQsNCy0LXRgNGI0LXQvdC40Lgg0Y3RgtC+0LPQviDQvNC10YLQvtC00LAg0L3Rg9C20L3QviAo0LTQtdC70LDQtdGC0YHRjyDQvdC40LbQtSk6XG4gKiAg0YHQvdGP0YLRjCDRgtC10LrRg9GJ0YPRjiDQuNC90LTQuNC60LDRhtC40Y4g0L/QtdGA0LXQvdC+0YHQsFxuICogINC+0LHQvdGD0LvQuNGC0YwgdGhpcy5fdGFyZ2V0RWxlbVxuICovXG5Ecm9wVGFyZ2V0LnByb3RvdHlwZS5vbkRyYWdFbmQgPSBmdW5jdGlvbihhdmF0YXIsIGV2ZW50KSB7XG4gICAgdGhpcy5faGlkZUhvdmVySW5kaWNhdGlvbihhdmF0YXIpO1xuICAgIHRoaXMuX3RhcmdldEVsZW0gPSBudWxsO1xufTtcblxuLyoqXG4gKiDQktGF0L7QtCDQsNCy0LDRgtCw0YDQsCDQsiBEcm9wVGFyZ2V0XG4gKi9cbkRyb3BUYXJnZXQucHJvdG90eXBlLm9uRHJhZ0VudGVyID0gZnVuY3Rpb24oZnJvbURyb3BUYXJnZXQsIGF2YXRhciwgZXZlbnQpIHtcbiAgICBjb25zdCBjb29yZHMgPSBldmVudC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgWSA9IGNvb3Jkcy50b3AgKyBjb29yZHMuaGVpZ2h0IC8gMjtcbn07XG5cbi8qKlxuICog0JLRi9GF0L7QtCDQsNCy0LDRgtCw0YDQsCDQuNC3IERyb3BUYXJnZXRcbiAqL1xuRHJvcFRhcmdldC5wcm90b3R5cGUub25EcmFnTGVhdmUgPSBmdW5jdGlvbih0b0Ryb3BUYXJnZXQsIGF2YXRhciwgZXZlbnQpIHtcbiAgICB0aGlzLl9oaWRlSG92ZXJJbmRpY2F0aW9uKCk7XG4gICAgdGhpcy5fdGFyZ2V0RWxlbSA9IG51bGw7XG59O1xuIiwiaW1wb3J0IERyYWdBdmF0YXIgZnJvbSAnLi9EcmFnQXZhdGFyJztcbmltcG9ydCB7Z2V0Q29vcmRzfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlZURyYWdBdmF0YXIgZXh0ZW5kcyBEcmFnQXZhdGFyIHtcbiAgICBjb25zdHJ1Y3RvciAoZHJhZ1pvbmUsIGRyYWdFbGVtKSB7XG4gICAgICAgIHN1cGVyKGRyYWdab25lLCBkcmFnRWxlbSk7XG4gICAgfVxuXG4gICAgaW5pdEZyb21FdmVudCAoZG93blgsIGRvd25ZLCBldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RyYWdnYWJsZScpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fZHJhZ1pvbmVFbGVtID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIGxldCBlbGVtID0gdGhpcy5fZWxlbSA9IHRoaXMuX2RyYWdab25lRWxlbS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgZWxlbS5jbGFzc05hbWUgPSAnYXZhdGFyJztcblxuICAgICAgICAvLyDRgdC+0LfQtNCw0YLRjCDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0YHQstC+0LnRgdGC0LLQsCBzaGlmdFgvc2hpZnRZXG4gICAgICAgIGxldCBjb29yZHMgPSBnZXRDb29yZHModGhpcy5fZHJhZ1pvbmVFbGVtKTtcblxuICAgICAgICB0aGlzLl9zaGlmdFggPSBkb3duWCAtIGNvb3Jkcy5sZWZ0O1xuICAgICAgICB0aGlzLl9zaGlmdFkgPSBkb3duWSAtIGNvb3Jkcy50b3A7XG5cbiAgICAgICAgLy8g0LjQvdC40YbQuNC40YDQvtCy0LDRgtGMINC90LDRh9Cw0LvQviDQv9C10YDQtdC90L7RgdCwXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgIGVsZW0uc3R5bGUuekluZGV4ID0gOTk5OTtcbiAgICAgICAgZWxlbS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIC8vIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBfZGVzdHJveSAoKSB7XG4gICAgICAgIHRoaXMuX2VsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9lbGVtKTtcbiAgICB9XG5cbiAgICBvbkRyYWdDYW5jZWwgKCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgb25EcmFnRW5kICgpIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBEcmFnWm9uZSBmcm9tICcuL0RyYWdab25lJztcbmltcG9ydCBUcmVlRHJhZ0F2YXRhciBmcm9tICcuL1RyZWVEcmFnQXZhdGFyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlZURyYWdab25lIGV4dGVuZHMgRHJhZ1pvbmUge1xuICAgIGNvbnN0cnVjdG9yKGVsZW0pIHtcbiAgICAgICAgc3VwZXIoZWxlbSk7XG4gICAgfVxuICAgIF9tYWtlQXZhdGFyICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUcmVlRHJhZ0F2YXRhcih0aGlzLCB0aGlzLl9lbGVtKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHJvcFRhcmdldCBmcm9tICcuL0Ryb3BUYXJnZXQnO1xuaW1wb3J0IHtleHRlbmR9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVlRHJvcFRhcmdldCBleHRlbmRzIERyb3BUYXJnZXQge1xuICAgIGNvbnN0cnVjdG9yKGVsZW0pIHtcbiAgICAgICAgc3VwZXIoZWxlbSk7XG4gICAgfVxuXG4gICAgX3Nob3dIb3ZlckluZGljYXRpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbGVtICYmIHRoaXMuX3RhcmdldEVsZW0uY2xhc3NMaXN0LmFkZCgnaG92ZXInKTtcbiAgICB9XG5cbiAgICBfaGlkZUhvdmVySW5kaWNhdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsZW0gJiYgdGhpcy5fdGFyZ2V0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcicpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbGVtICYmIHRoaXMuX3RhcmdldEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWJvdmUnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWxlbSAmJiB0aGlzLl90YXJnZXRFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3VuZGVyJyk7XG4gICAgfVxuXG4gICAgX2dldFRhcmdldEVsZW0gKGF2YXRhciwgZXZlbnQpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IGF2YXRhci5nZXRUYXJnZXRFbGVtKCk7XG5cbiAgICAgICAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wcGFibGUnKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjRgtGMLCDQvNC+0LbQtdGCINCx0YvRgtGMINC/0LXRgNC10L3QvtGBINGD0LfQu9CwINCy0L3Rg9GC0YDRjCDRgdCw0LzQvtCz0L4g0YHQtdCx0Y8g0LjQu9C4INCyINGB0LXQsdGPP1xuICAgICAgICBsZXQgZWxlbVRvTW92ZSA9IGF2YXRhci5nZXREcmFnSW5mbyhldmVudCkuZHJhZ1pvbmVFbGVtLnBhcmVudE5vZGU7XG5cbiAgICAgICAgbGV0IGVsZW0gPSB0YXJnZXQ7XG5cbiAgICAgICAgd2hpbGUgKGVsZW0pIHtcbiAgICAgICAgICAgIGlmIChlbGVtID09PSBlbGVtVG9Nb3ZlKSByZXR1cm47IC8vINC/0L7Qv9GL0YLQutCwINC/0LXRgNC10L3QtdGB0YLQuCDRgNC+0LTQuNGC0LXQu9GPINCyINC/0L7RgtC+0LzQutCwXG4gICAgICAgICAgICBlbGVtID0gZWxlbS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBhZGRCb3JkZXIgKGJvcmRlcikge1xuICAgICAgICB0aGlzLl90YXJnZXRFbGVtICYmIHRoaXMuX3RhcmdldEVsZW0uY2xhc3NMaXN0LmFkZChib3JkZXIpO1xuICAgIH1cblxuICAgIHJlbW92ZUJvcmRlciAoYm9yZGVyKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsZW0gJiYgdGhpcy5fdGFyZ2V0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKGJvcmRlcik7XG4gICAgfVxuXG4gICAgb25EcmFnTW92ZShhdmF0YXIsIGV2ZW50KSB7XG4gICAgICAgIHN1cGVyLm9uRHJhZ01vdmUoYXZhdGFyLCBldmVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldEVsZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudFkgPSBldmVudC5jbGllbnRZO1xuXG4gICAgICAgICAgICBjb25zdCB7dG9wLCBoZWlnaHR9ID0gdGhpcy5fdGFyZ2V0RWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgY29uc3QgZWxlbWVudE1pZGRsZSA9IHRvcCArIGhlaWdodCAvIDI7XG5cbiAgICAgICAgICAgIGlmIChjbGllbnRZIDwgZWxlbWVudE1pZGRsZSkge1xuICAgICAgICAgICAgICAgIC8vIHVwd2FyZHNcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUJvcmRlcigndW5kZXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJvcmRlcignYWJvdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZG93bndhcmRzXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVCb3JkZXIoJ2Fib3ZlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCb3JkZXIoJ3VuZGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyYWdFbmQgKGF2YXRhciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl90YXJnZXRFbGVtKSB7XG4gICAgICAgICAgICAvLyDQv9C10YDQtdC90L7RgSDQt9Cw0LrQvtC90YfQuNC70YHRjyDQstC90LUg0L/QvtC00YXQvtC00Y/RidC10Lkg0YLQvtGH0LrQuCDQv9GA0LjQt9C10LzQu9C10L3QuNGPXG4gICAgICAgICAgICBhdmF0YXIub25EcmFnQ2FuY2VsKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2hpZGVIb3ZlckluZGljYXRpb24oKTtcbiAgICAgICAgLy8g0L/QvtC70YPRh9C40YLRjCDQuNC90YTQvtGA0LzQsNGG0LjRjiDQvtCxINC+0LHRitC10LrRgtC1INC/0LXRgNC10L3QvtGB0LBcbiAgICAgICAgbGV0IGF2YXRhckluZm8gPSBhdmF0YXIuZ2V0RHJhZ0luZm8oZXZlbnQpO1xuXG4gICAgICAgIGF2YXRhci5vbkRyYWdFbmQoKTsgLy8g0LDQstCw0YLQsNGAINCx0L7Qu9GM0YjQtSDQvdC1INC90YPQttC10L0sINC/0LXRgNC10L3QvtGBINGD0YHQv9C10YjQtdC9XG5cbiAgICAgICAgLy8g0LLRgdGC0LDQstC40YLRjCDRjdC70LXQvNC10L3RgiDQsiDQtNC10YLQtdC5INCyINC+0YLRgdC+0YDRgtC40YDQvtCy0LDQvdC90L7QvCDQv9C+0YDRj9C00LrQtVxuICAgICAgICBsZXQgZWxlbVRvTW92ZSA9IGF2YXRhckluZm8uZHJhZ1pvbmVFbGVtLnBhcmVudE5vZGU7IC8vIDxMST5cbiAgICAgICAgbGV0IHRpdGxlID0gYXZhdGFySW5mby5kcmFnWm9uZUVsZW0uaW5uZXJIVE1MOyAvLyDQv9C10YDQtdC90L7RgdC40LzRi9C5INC30LDQs9C+0LvQvtCy0L7QulxuXG4gICAgICAgIC8vINC/0L7Qu9GD0YfQuNGC0Ywg0LrQvtC90YLQtdC50L3QtdGAINC00LvRjyDRg9C30LvQvtCyINC00LXRgNC10LLQsCwg0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQuNC5INGC0L7Rh9C60LUg0L/RgNC10LfQtdC80LvQtdC90LjRj1xuICAgICAgICBsZXQgdWwgPSB0aGlzLl90YXJnZXRFbGVtLnBhcmVudE5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1VMJylbMF07XG5cbiAgICAgICAgaWYgKCF1bCkgeyAvLyDQvdC10YIg0LTQtdGC0LXQuSwg0YHQvtC30LTQsNC00LjQvCDQutC+0L3RgtC10LnQvdC10YBcbiAgICAgICAgICAgIHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVUwnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsZW0ucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh1bCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQstGB0YLQsNCy0LjRgtGMINC90L7QstGL0Lkg0YPQt9C10Lsg0LIg0L3Rg9C20L3QvtC1INC80LXRgdGC0L4g0YHRgNC10LTQuCDQv9C+0YLQvtC80LrQvtCyLCDQsiDQsNC70YTQsNCy0LjRgtC90L7QvCDQv9C+0YDRj9C00LrQtVxuICAgICAgICBsZXQgbGkgPSBudWxsO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdWwuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpID0gdWwuY2hpbGRyZW5baV07XG5cbiAgICAgICAgICAgIGxldCBjaGlsZFRpdGxlID0gbGkuY2hpbGRyZW5bMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgaWYgKGNoaWxkVGl0bGUgPiB0aXRsZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGkgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdWwuaW5zZXJ0QmVmb3JlKGVsZW1Ub01vdmUsIGxpKTtcblxuICAgICAgICB0aGlzLl90YXJnZXRFbGVtID0gbnVsbDtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHJhZ01hbmFnZXIgZnJvbSAnLi9EcmFnTWFuYWdlcic7XG5pbXBvcnQgRHJhZ0F2YXRhciBmcm9tICcuL0RyYWdBdmF0YXInO1xuaW1wb3J0IERyb3BUYXJnZXQgZnJvbSAnLi9Ecm9wVGFyZ2V0JztcbmltcG9ydCBEcmFnWm9uZSBmcm9tICcuL0RyYWdab25lJztcblxuaW1wb3J0IFRyZWVEcmFnWm9uZSBmcm9tICcuL1RyZWVEcmFnWm9uZSc7XG5pbXBvcnQgVHJlZURyb3BUYXJnZXQgZnJvbSAnLi9UcmVlRHJvcFRhcmdldCc7XG5pbXBvcnQgVHJlZURyYWdBdmF0YXIgZnJvbSAnLi9UcmVlRHJhZ0F2YXRhcic7XG5cbmV4cG9ydCB7XG4gICAgRHJhZ01hbmFnZXIsXG4gICAgRHJhZ0F2YXRhcixcbiAgICBEcm9wVGFyZ2V0LFxuICAgIERyYWdab25lLFxuICAgIFRyZWVEcmFnWm9uZSxcbiAgICBUcmVlRHJvcFRhcmdldCxcbiAgICBUcmVlRHJhZ0F2YXRhclxufVxuXG4vLyBsZXQgdHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0cmVlJyk7XG4vLyBsZXQgZHJhZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJhZ2dhYmxlJyk7XG4vL1xuLy8gY29uc3QgdHJlZURyYWdab25lID0gbmV3IFRyZWVEcmFnWm9uZSh0cmVlKTtcbi8vIGNvbnN0IHRyZWVEcm9wVGFyZ2V0ID0gbmV3IFRyZWVEcm9wVGFyZ2V0KHRyZWUpO1xuXG5cbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZHMgKGVsZW0pIHtcbiAgICBsZXQgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBsZXQgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIGxldCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3A7XG4gICAgbGV0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxMZWZ0IHx8IGJvZHkuc2Nyb2xsTGVmdDtcblxuICAgIGxldCBjbGllbnRUb3AgPSBkb2NFbGVtLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuICAgIGxldCBjbGllbnRMZWZ0ID0gZG9jRWxlbS5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuXG4gICAgbGV0IHRvcCA9IGJveC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3A7XG4gICAgbGV0IGxlZnQgPSBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKHRvcCksXG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQobGVmdClcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudFVuZGVyQ2xpZW50WFkgKGVsZW0sIGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICBsZXQgZGlzcGxheSA9IGVsZW0uc3R5bGUuZGlzcGxheSB8fCAnJztcblxuICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGNsaWVudFgsIGNsaWVudFkpO1xuXG4gICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcblxuICAgIGlmICghdGFyZ2V0IHx8IHRhcmdldCA9PSBkb2N1bWVudCkgeyAvLyDRjdGC0L4g0LHRi9Cy0LDQtdGCINC/0YDQuCDQstGL0L3QvtGB0LUg0LfQsCDQs9GA0LDQvdC40YbRiyDQvtC60L3QsFxuICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5ib2R5OyAvLyDQv9C+0L/RgNCw0LLQuNGC0Ywg0LfQvdCw0YfQtdC90LjQtSwg0YfRgtC+0LHRiyDQsdGL0Lsg0LjQvNC10L3QvdC+INGN0LvQtdC80LXQvdGCXG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCAoQ2hpbGQsIFBhcmVudCkge1xuICAgIGZ1bmN0aW9uIEYoKSB7fVxuXG4gICAgRi5wcm90b3R5cGUgPSBQYXJlbnQucHJvdG90eXBlO1xuICAgIENoaWxkLnByb3RvdHlwZSA9IG5ldyBGKCk7XG4gICAgQ2hpbGQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ2hpbGQ7XG4gICAgQ2hpbGQucGFyZW50ID0gUGFyZW50LnByb3RvdHlwZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=