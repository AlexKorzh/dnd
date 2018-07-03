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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RyYWdBdmF0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RyYWdNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9EcmFnWm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJvcFRhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVHJlZURyYWdBdmF0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RyZWVEcmFnWm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVHJlZURyb3BUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJEcmFnQXZhdGFyIiwiZHJhZ1pvbmUiLCJkcmFnRWxlbSIsIl9kcmFnWm9uZSIsIl9kcmFnWm9uZUVsZW0iLCJfZWxlbSIsInByb3RvdHlwZSIsImluaXRGcm9tRXZlbnQiLCJkb3duWCIsImRvd25ZIiwiZXZlbnQiLCJnZXREcmFnSW5mbyIsImVsZW0iLCJkcmFnWm9uZUVsZW0iLCJnZXRUYXJnZXRFbGVtIiwiX2N1cnJlbnRUYXJnZXRFbGVtIiwib25EcmFnTW92ZSIsInN0eWxlIiwibGVmdCIsInBhZ2VYIiwiX3NoaWZ0WCIsInRvcCIsInBhZ2VZIiwiX3NoaWZ0WSIsImNsaWVudFgiLCJjbGllbnRZIiwib25EcmFnQ2FuY2VsIiwib25EcmFnRW5kIiwiZHJhZ01hbmFnZXIiLCJhdmF0YXIiLCJkcm9wVGFyZ2V0Iiwic2VsZiIsIm9uRHJhZ1N0YXJ0Iiwib25Nb3VzZURvd24iLCJlIiwid2hpY2giLCJmaW5kRHJhZ1pvbmUiLCJvbk1vdXNlTW92ZSIsIk1hdGgiLCJhYnMiLCJjbGVhblVwIiwibmV3RHJvcFRhcmdldCIsImZpbmREcm9wVGFyZ2V0Iiwib25EcmFnTGVhdmUiLCJvbkRyYWdFbnRlciIsIm9uTW91c2VVcCIsInRhcmdldCIsImRvY3VtZW50IiwicGFyZW50Tm9kZSIsImluaXRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiRHJhZ1pvbmUiLCJfbWFrZUF2YXRhciIsIkRyb3BUYXJnZXQiLCJfdGFyZ2V0RWxlbSIsIl9nZXRUYXJnZXRFbGVtIiwiX2hpZGVIb3ZlckluZGljYXRpb24iLCJfc2hvd0hvdmVySW5kaWNhdGlvbiIsIm5ld1RhcmdldEVsZW0iLCJmcm9tRHJvcFRhcmdldCIsImNvb3JkcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIlkiLCJoZWlnaHQiLCJ0b0Ryb3BUYXJnZXQiLCJUcmVlRHJhZ0F2YXRhciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xvbmVOb2RlIiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwiekluZGV4IiwicG9zaXRpb24iLCJyZW1vdmVDaGlsZCIsIl9kZXN0cm95IiwiVHJlZURyYWdab25lIiwiVHJlZURyb3BUYXJnZXQiLCJhZGQiLCJyZW1vdmUiLCJlbGVtVG9Nb3ZlIiwiYm9yZGVyIiwiZWxlbWVudE1pZGRsZSIsInJlbW92ZUJvcmRlciIsImFkZEJvcmRlciIsImF2YXRhckluZm8iLCJ0aXRsZSIsImlubmVySFRNTCIsInVsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjcmVhdGVFbGVtZW50IiwibGkiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjaGlsZFRpdGxlIiwiaW5zZXJ0QmVmb3JlIiwiRHJhZ01hbmFnZXIiLCJnZXRDb29yZHMiLCJnZXRFbGVtZW50VW5kZXJDbGllbnRYWSIsImV4dGVuZCIsImJveCIsImRvY0VsZW0iLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsInNjcm9sbExlZnQiLCJwYWdlWE9mZnNldCIsImNsaWVudFRvcCIsImNsaWVudExlZnQiLCJyb3VuZCIsImRpc3BsYXkiLCJlbGVtZW50RnJvbVBvaW50IiwiQ2hpbGQiLCJQYXJlbnQiLCJGIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiXSwi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RixJQUFYO0FBRkgsS0FBUDtBQUlIOztBQUVNLFNBQVNpRix1QkFBVCxDQUFrQ3ZGLElBQWxDLEVBQXdDWSxPQUF4QyxFQUFpREMsT0FBakQsRUFBMEQ7QUFDN0QsUUFBSXVGLFVBQVVwRyxLQUFLSyxLQUFMLENBQVcrRixPQUFYLElBQXNCLEVBQXBDOztBQUVBcEcsU0FBS0ssS0FBTCxDQUFXK0YsT0FBWCxHQUFxQixNQUFyQjs7QUFFQSxRQUFJbEUsU0FBU0MsU0FBU2tFLGdCQUFULENBQTBCekYsT0FBMUIsRUFBbUNDLE9BQW5DLENBQWI7O0FBRUFiLFNBQUtLLEtBQUwsQ0FBVytGLE9BQVgsR0FBcUJBLE9BQXJCOztBQUVBLFFBQUksQ0FBQ2xFLE1BQUQsSUFBV0EsVUFBVUMsUUFBekIsRUFBbUM7QUFBRTtBQUNqQ0QsaUJBQVNDLFNBQVN1QixJQUFsQixDQUQrQixDQUNQO0FBQzNCOztBQUVELFdBQU94QixNQUFQO0FBQ0g7O0FBRU0sU0FBU3NELE1BQVQsQ0FBaUJjLEtBQWpCLEVBQXdCQyxNQUF4QixFQUFnQztBQUNuQyxhQUFTQyxDQUFULEdBQWEsQ0FBRTs7QUFFZkEsTUFBRTlHLFNBQUYsR0FBYzZHLE9BQU83RyxTQUFyQjtBQUNBNEcsVUFBTTVHLFNBQU4sR0FBa0IsSUFBSThHLENBQUosRUFBbEI7QUFDQUYsVUFBTTVHLFNBQU4sQ0FBZ0IrRyxXQUFoQixHQUE4QkgsS0FBOUI7QUFDQUEsVUFBTUksTUFBTixHQUFlSCxPQUFPN0csU0FBdEI7QUFDSCxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBnZXRFbGVtZW50VW5kZXJDbGllbnRYWSB9IGZyb20gJy4vdXRpbHMnO1xuLyoqXG4gKiBcItCQ0LLQsNGC0LDRgFwiIC0g0Y3Qu9C10LzQtdC90YIsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10YLQsNGB0LrQuNCy0LDQtdGC0YHRjy5cbiAqXG4gKiDQkiDQv9GA0L7RgdGC0LXQudGI0LXQvCDRgdC70YPRh9Cw0LUg0LDQstCw0YLQsNGA0L7QvCDRj9Cy0LvRj9C10YLRgdGPINGB0LDQvCDQv9C10YDQtdC90L7RgdC40LzRi9C5INGN0LvQtdC80LXQvdGCXG4gKiDQotCw0LrQttC1INCw0LLQsNGC0LDRgCDQvNC+0LbQtdGCINCx0YvRgtGMINC60LvQvtC90LjRgNC+0LLQsNC90L3Ri9C8INGN0LvQtdC80LXQvdGC0L7QvFxuICog0KLQsNC60LbQtSDQsNCy0LDRgtCw0YAg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNC60L7QvdC60L7QuSDQuCDQstC+0L7QsdGJ0LUg0YfQtdC8INGD0LPQvtC00L3Qvi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHJhZ0F2YXRhcihkcmFnWm9uZSwgZHJhZ0VsZW0pIHtcbiAgICAvKiogXCLRgNC+0LTQuNGC0LXQu9GM0YHQutCw0Y9cIiDQt9C+0L3QsCDQv9C10YDQtdC90L7RgdCwICovXG4gICAgdGhpcy5fZHJhZ1pvbmUgPSBkcmFnWm9uZTtcblxuICAgIC8qKlxuICAgICAqINC/0L7QtNGN0LvQtdC80LXQvdGCINGA0L7QtNC40YLQtdC70YzRgdC60L7QuSDQt9C+0L3Riywg0Log0LrQvtGC0L7RgNC+0LzRgyDQvtGC0L3QvtGB0LjRgtGB0Y8g0LDQstCw0YLQsNGAXG4gICAgICog0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4gLSDRjdC70LXQvNC10L3Rgiwg0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQuNC5INCy0YHQtdC5INC30L7QvdC1XG4gICAgICog0LzQvtC20LXRgiDQsdGL0YLRjCDRg9GC0L7Rh9C90LXQvSDQsiBpbml0RnJvbUV2ZW50XG4gICAgICovXG4gICAgdGhpcy5fZHJhZ1pvbmVFbGVtID0gZHJhZ0VsZW07XG5cbiAgICAvKipcbiAgICAgKiDQodCw0Lwg0Y3Qu9C10LzQtdC90YIg0LDQstCw0YLQsNGA0LAsINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L3QvtGB0LjRgtGM0YHRjyDQv9C+INGN0LrRgNCw0L3Rgy5cbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfRg9C10YLRgdGPINCyIGluaXRGcm9tRXZlbnRcbiAgICAgKi9cbiAgICB0aGlzLl9lbGVtID0gZHJhZ0VsZW07XG59XG5cbi8qKlxuICog0JjQvdC40YbQuNCw0LvQuNC30L7QstCw0YLRjCB0aGlzLl9lbGVtINC4INC/0L7Qt9C40YbQuNC+0L3QuNGA0L7QstCw0YLRjCDQtdCz0L5cbiAqINCf0YDQuCDQvdC10L7QsdGF0L7QtNC40LzQvtGB0YLQuCDRg9GC0L7Rh9C90LjRgtGMIHRoaXMuX2RyYWdab25lRWxlbVxuICogQHBhcmFtIGRvd25YINCa0L7QvtGA0LTQuNC90LDRgtCwIFgg0L3QsNC20LDRgtC40Y8g0LzRi9GI0LhcbiAqIEBwYXJhbSBkb3duWSDQmtC+0L7RgNC00LjQvdCw0YLQsCBZINC90LDQttCw0YLQuNGPINC80YvRiNC4XG4gKiBAcGFyYW0gZXZlbnQg0KLQtdC60YPRidC10LUg0YHQvtCx0YvRgtC40LUg0LzRi9GI0LhcbiAqL1xuRHJhZ0F2YXRhci5wcm90b3R5cGUuaW5pdEZyb21FdmVudCA9IGZ1bmN0aW9uKGRvd25YLCBkb3duWSwgZXZlbnQpIHtcbiAgICAvKiBvdmVycmlkZSAqL1xufTtcblxuLyoqXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDQuNC90YTQvtGA0LzQsNGG0LjRjiDQviDQv9C10YDQtdC90L7RgdC40LzQvtC8INGN0LvQtdC80LXQvdGC0LUg0LTQu9GPIERyb3BUYXJnZXRcbiAqIEBwYXJhbSBldmVudFxuICovXG5EcmFnQXZhdGFyLnByb3RvdHlwZS5nZXREcmFnSW5mbyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8g0YLRg9GCINC80L7QttC10YIg0LHRi9GC0Ywg0LXRidC1INC60LDQutCw0Y8t0YLQviDQuNC90YTQvtGA0LzQsNGG0LjRjywg0L3QtdC+0LHRhdC+0LTQuNC80LDRjyDQtNC70Y8g0L7QsdGA0LDQsdC+0YLQutC4INC60L7QvdGG0LAg0LjQu9C4INC/0YDQvtGG0LXRgdGB0LAg0L/QtdGA0LXQvdC+0YHQsFxuICAgIHJldHVybiB7XG4gICAgICAgIGVsZW06IHRoaXMuX2VsZW0sXG4gICAgICAgIGRyYWdab25lRWxlbTogdGhpcy5fZHJhZ1pvbmVFbGVtLFxuICAgICAgICBkcmFnWm9uZTogdGhpcy5fZHJhZ1pvbmVcbiAgICB9O1xufTtcblxuLyoqXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgtC10LrRg9GJ0LjQuSDRgdCw0LzRi9C5INCz0LvRg9Cx0L7QutC40LkgRE9NLdGN0LvQtdC80LXQvdGCINC/0L7QtCB0aGlzLl9lbGVtXG4gKiDQn9GA0LjQstCw0YLQvdC+0LUg0YHQstC+0LnRgdGC0LLQviBfY3VycmVudFRhcmdldEVsZW0g0L7QsdC90L7QstC70Y/QtdGC0YHRjyDQv9GA0Lgg0LrQsNC20LTQvtC8INC/0LXRgNC10LTQstC40LbQtdC90LjQuFxuICovXG5EcmFnQXZhdGFyLnByb3RvdHlwZS5nZXRUYXJnZXRFbGVtID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRUYXJnZXRFbGVtO1xufTtcblxuLyoqXG4gKiDQn9GA0Lgg0LrQsNC20LTQvtC8INC00LLQuNC20LXQvdC40Lgg0LzRi9GI0Lgg0L/QtdGA0LXQvNC10YnQsNC10YIgdGhpcy5fZWxlbVxuICog0Lgg0LfQsNC/0LjRgdGL0LLQsNC10YIg0YLQtdC60YPRidC40Lkg0Y3Qu9C10LzQtdC90YIg0L/QvtC0IHRoaXMuX2VsZW0g0LIgX2N1cnJlbnRUYXJnZXRFbGVtXG4gKiBAcGFyYW0gZXZlbnRcbiAqL1xuRHJhZ0F2YXRhci5wcm90b3R5cGUub25EcmFnTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5fZWxlbS5zdHlsZS5sZWZ0ID0gZXZlbnQucGFnZVggLSB0aGlzLl9zaGlmdFggKyAncHgnO1xuICAgIHRoaXMuX2VsZW0uc3R5bGUudG9wID0gZXZlbnQucGFnZVkgLSB0aGlzLl9zaGlmdFkgKyAncHgnO1xuXG4gICAgdGhpcy5fY3VycmVudFRhcmdldEVsZW0gPSBnZXRFbGVtZW50VW5kZXJDbGllbnRYWSh0aGlzLl9lbGVtLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbn07XG5cbi8qKlxuICog0JTQtdC50YHRgtCy0LjRjyDRgSDQsNCy0LDRgtCw0YDQvtC8LCDQutC+0LPQtNCwINC/0LXRgNC10L3QvtGBINC90LUg0YPQtNCw0LvRgdGPXG4gKiDQndCw0L/RgNC40LzQtdGALCDQvNC+0LbQvdC+INCy0LXRgNC90YPRgtGMINGN0LvQtdC80LXQvdGCINC+0LHRgNCw0YLQvdC+INC40LvQuCDRg9C90LjRh9GC0L7QttC40YLRjFxuICovXG5EcmFnQXZhdGFyLnByb3RvdHlwZS5vbkRyYWdDYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAvKiBvdmVycmlkZSAqL1xufTtcblxuLyoqXG4gKiDQlNC10LnRgdGC0LLQuNGPINGBINCw0LLQsNGC0LDRgNC+0Lwg0L/QvtGB0LvQtSDRg9GB0L/QtdGI0L3QvtCz0L4g0L/QtdGA0LXQvdC+0YHQsFxuICovXG5EcmFnQXZhdGFyLnByb3RvdHlwZS5vbkRyYWdFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAvKiBvdmVycmlkZSAqL1xufTtcbiIsImxldCBkcmFnTWFuYWdlciA9IG5ldyBmdW5jdGlvbigpIHtcblxuICAgIGxldCBkcmFnWm9uZSwgYXZhdGFyLCBkcm9wVGFyZ2V0O1xuICAgIGxldCBkb3duWCwgZG93blk7XG5cbiAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBvbkRyYWdTdGFydCgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcblxuICAgICAgICBpZiAoZS53aGljaCAhPT0gMSkgeyAvLyDQvdC1INC70LXQstC+0Lkg0LrQvdC+0L/QutC+0LlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyYWdab25lID0gZmluZERyYWdab25lKGUpO1xuXG4gICAgICAgIGlmICghZHJhZ1pvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINC30LDQv9C+0LzQvdC40LwsINGH0YLQviDRjdC70LXQvNC10L3RgiDQvdCw0LbQsNGCINC90LAg0YLQtdC60YPRidC40YUg0LrQvtC+0YDQtNC40L3QsNGC0LDRhSBwYWdlWC9wYWdlWVxuICAgICAgICBkb3duWCA9IGUucGFnZVg7XG4gICAgICAgIGRvd25ZID0gZS5wYWdlWTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZU1vdmUoZSkge1xuICAgICAgICBpZiAoIWRyYWdab25lKSByZXR1cm47IC8vINGN0LvQtdC80LXQvdGCINC90LUg0LfQsNC20LDRglxuXG4gICAgICAgIGlmICghYXZhdGFyKSB7IC8vINGN0LvQtdC80LXQvdGCINC90LDQttCw0YIsINC90L4g0L/QvtC60LAg0L3QtSDQvdCw0YfQsNC70Lgg0LXQs9C+INC00LLQuNCz0LDRgtGMXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZS5wYWdlWCAtIGRvd25YKSA8IDMgJiYgTWF0aC5hYnMoZS5wYWdlWSAtIGRvd25ZKSA8IDMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDQv9C+0L/RgNC+0LHQvtCy0LDRgtGMINC30LDRhdCy0LDRgtC40YLRjCDRjdC70LXQvNC10L3RglxuICAgICAgICAgICAgYXZhdGFyID0gZHJhZ1pvbmUub25EcmFnU3RhcnQoZG93blgsIGRvd25ZLCBlKTtcblxuICAgICAgICAgICAgaWYgKCFhdmF0YXIpIHsgLy8g0L3QtSDQv9C+0LvRg9GH0LjQu9C+0YHRjCwg0LfQvdCw0YfQuNGCINC/0LXRgNC10L3QvtGBINC/0YDQvtC00L7Qu9C20LDRgtGMINC90LXQu9GM0LfRj1xuICAgICAgICAgICAgICAgIGNsZWFuVXAoKTsgLy8g0L7Rh9C40YHRgtC40YLRjCDQv9GA0LjQstCw0YLQvdGL0LUg0L/QtdGA0LXQvNC10L3QvdGL0LUsINGB0LLRj9C30LDQvdC90YvQtSDRgSDQv9C10YDQtdC90L7RgdC+0LxcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQvtGC0L7QsdGA0LDQt9C40YLRjCDQv9C10YDQtdC90L7RgSDQvtCx0YrQtdC60YLQsCwg0L/QtdGA0LXQstGL0YfQuNGB0LvQuNGC0Ywg0YLQtdC60YPRidC40Lkg0Y3Qu9C10LzQtdC90YIg0L/QvtC0INC60YPRgNGB0L7RgNC+0LxcbiAgICAgICAgYXZhdGFyLm9uRHJhZ01vdmUoZSk7XG5cbiAgICAgICAgLy8g0L3QsNC50YLQuCDQvdC+0LLRi9C5IGRyb3BUYXJnZXQg0L/QvtC0INC60YPRgNGB0L7RgNC+0Lw6IG5ld0Ryb3BUYXJnZXRcbiAgICAgICAgLy8g0YLQtdC60YPRidC40LkgZHJvcFRhcmdldCDQvtGB0YLQsNC70YHRjyDQvtGCINC/0YDQvtGI0LvQvtCz0L4gbW91c2Vtb3ZlXG4gICAgICAgIC8vICrQvtCx0LAg0LfQvdCw0YfQtdC90LjRjzog0LggbmV3RHJvcFRhcmdldCDQuCBkcm9wVGFyZ2V0INC80L7Qs9GD0YIg0LHRi9GC0YwgbnVsbFxuICAgICAgICBsZXQgbmV3RHJvcFRhcmdldCA9IGZpbmREcm9wVGFyZ2V0KGUpO1xuXG4gICAgICAgIGlmIChuZXdEcm9wVGFyZ2V0ICE9PSBkcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICAvLyDRg9Cy0LXQtNC+0LzQuNGC0Ywg0YHRgtCw0YDRg9GOINC4INC90L7QstGD0Y4g0LfQvtC90Yst0YbQtdC70Lgg0L4g0YLQvtC8LCDRh9GC0L4g0YEg0L3QuNGFINGD0YjQu9C4L9C90LAg0L3QuNGFINC30LDRiNC70LhcbiAgICAgICAgICAgIGRyb3BUYXJnZXQgJiYgZHJvcFRhcmdldC5vbkRyYWdMZWF2ZShuZXdEcm9wVGFyZ2V0LCBhdmF0YXIsIGUpO1xuICAgICAgICAgICAgbmV3RHJvcFRhcmdldCAmJiBuZXdEcm9wVGFyZ2V0Lm9uRHJhZ0VudGVyKGRyb3BUYXJnZXQsIGF2YXRhciwgZSk7XG4gICAgICAgIH1cblxuICAgICAgICBkcm9wVGFyZ2V0ID0gbmV3RHJvcFRhcmdldDtcblxuICAgICAgICBkcm9wVGFyZ2V0ICYmIGRyb3BUYXJnZXQub25EcmFnTW92ZShhdmF0YXIsIGUpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoZSkge1xuXG4gICAgICAgIGlmIChlLndoaWNoICE9PSAxKSB7IC8vINC90LUg0LvQtdCy0L7QuSDQutC90L7Qv9C60L7QuVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGF2YXRhcikgeyAvLyDQtdGB0LvQuCDRg9C20LUg0L3QsNGH0LDQu9C4INC/0LXRgNC10LTQstC40LPQsNGC0YxcblxuICAgICAgICAgICAgaWYgKGRyb3BUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAvLyDQt9Cw0LLQtdGA0YjQuNGC0Ywg0L/QtdGA0LXQvdC+0YEg0Lgg0LjQt9Cx0LDQstC40YLRjNGB0Y8g0L7RgiDQsNCy0LDRgtCw0YDQsCwg0LXRgdC70Lgg0Y3RgtC+INC90YPQttC90L5cbiAgICAgICAgICAgICAgICAvLyDRjdGC0LAg0YTRg9C90LrRhtC40Y8g0L7QsdGP0LfQsNC90LAg0LLRi9C30LLQsNGC0YwgYXZhdGFyLm9uRHJhZ0VuZC9vbkRyYWdDYW5jZWxcbiAgICAgICAgICAgICAgICBkcm9wVGFyZ2V0Lm9uRHJhZ0VuZChhdmF0YXIsIGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdmF0YXIub25EcmFnQ2FuY2VsKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFuVXAoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhblVwKCkge1xuICAgICAgICAvLyDQvtGH0LjRgdGC0LjRgtGMINCy0YHQtSDQv9GA0L7QvNC10LbRg9GC0L7Rh9C90YvQtSDQvtCx0YrQtdC60YLRi1xuICAgICAgICBkcmFnWm9uZSA9IGF2YXRhciA9IGRyb3BUYXJnZXQgPSBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmREcmFnWm9uZShldmVudCkge1xuICAgICAgICBsZXQgZWxlbSA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgICB3aGlsZSAoZWxlbSAhPT0gZG9jdW1lbnQgJiYgIWVsZW0uZHJhZ1pvbmUpIHtcbiAgICAgICAgICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbS5kcmFnWm9uZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kRHJvcFRhcmdldChldmVudCkge1xuICAgICAgICAvLyDQv9C+0LvRg9GH0LjRgtGMINGN0LvQtdC80LXQvdGCINC/0L7QtCDQsNCy0LDRgtCw0YDQvtC8XG4gICAgICAgIGxldCBlbGVtID0gYXZhdGFyLmdldFRhcmdldEVsZW0oKTtcblxuICAgICAgICB3aGlsZSAoZWxlbSAhPT0gZG9jdW1lbnQgJiYgIWVsZW0uZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZWxlbS5kcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtLmRyb3BUYXJnZXQ7XG4gICAgfVxuXG4gICAgLy8gZG9jdW1lbnQub25kcmFnc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vIH07XG4gICAgLy9cbiAgICAvLyBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG9uTW91c2VNb3ZlO1xuICAgIC8vIGRvY3VtZW50Lm9ubW91c2V1cCA9IG9uTW91c2VVcDtcbiAgICAvLyBkb2N1bWVudC5vbm1vdXNlZG93biA9IG9uTW91c2VEb3duO1xuXG4gICAgKGZ1bmN0aW9uIGluaXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIG9uRHJhZ1N0YXJ0KTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgIH0pKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkcmFnTWFuYWdlcjtcbiIsIi8qKlxuICog0JfQvtC90LAsINC40Lcg0LrQvtGC0L7RgNC+0Lkg0LzQvtC20L3QviDQv9C10YDQtdC90L7RgdC40YLRjCDQvtCx0YrQtdC60YLRi1xuICog0KPQvNC10LXRgiDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0L3QsNGH0LDQu9C+INC/0LXRgNC10L3QvtGB0LAg0L3QsCDRgdC10LHQtSDQuCDRgdC+0LfQtNCw0LLQsNGC0YwgXCLQsNCy0LDRgtCw0YBcIlxuICogQHBhcmFtIGVsZW0gRE9NLdGN0LvQtdC80LXQvdGCLCDQuiDQutC+0YLQvtGA0L7QvNGDINC/0YDQuNCy0Y/Qt9Cw0L3QsCDQt9C+0L3QsFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEcmFnWm9uZShlbGVtKSB7XG4gIGVsZW0uZHJhZ1pvbmUgPSB0aGlzO1xuICB0aGlzLl9lbGVtID0gZWxlbTtcbn1cblxuLyoqXG4gKiDQodC+0LfQtNCw0YLRjCDQsNCy0LDRgtCw0YAsINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPRjtGJ0LjQuSDQt9C+0L3QtS5cbiAqINCjINGA0LDQt9C90YvRhSDQt9C+0L0g0LzQvtCz0YPRgiDQsdGL0YLRjCDRgNCw0LfQvdGL0LUg0YLQuNC/0Ysg0LDQstCw0YLQsNGA0L7QslxuICovXG5EcmFnWm9uZS5wcm90b3R5cGUuX21ha2VBdmF0YXIgPSBmdW5jdGlvbigpIHtcbiAgLyogb3ZlcnJpZGUgKi9cbn07XG5cbi8qKlxuICog0J7QsdGA0LDQsdC+0YLQsNGC0Ywg0L3QsNGH0LDQu9C+INC/0LXRgNC10L3QvtGB0LAuXG4gKlxuICog0J/QvtC70YPRh9Cw0LXRgiDQutC+0L7RgNC00LjQvdCw0YLRiyDQuNC30L3QsNGH0LDQu9GM0L3QvtCz0L4g0L3QsNC20LDRgtC40Y8g0LzRi9GI0LrQuCwg0YHQvtCx0YvRgtC40LUuXG4gKlxuICogQHBhcmFtIGRvd25YINCa0L7QvtGA0LTQuNC90LDRgtCwINC40LfQvdCw0YfQsNC70YzQvdC+0LPQviDQvdCw0LbQsNGC0LjRjyDQv9C+IFhcbiAqIEBwYXJhbSBkb3duWSDQmtC+0L7RgNC00LjQvdCw0YLQsCDQuNC30L3QsNGH0LDQu9GM0L3QvtCz0L4g0L3QsNC20LDRgtC40Y8g0L/QviBZXG4gKiBAcGFyYW0gZXZlbnQg0YLQtdC60YPRidC10LUg0YHQvtCx0YvRgtC40LUg0LzRi9GI0LhcbiAqXG4gKiBAcmV0dXJuINCw0LLQsNGC0LDRgCDQuNC70LggZmFsc2UsINC10YHQu9C4INC30LDRhdCy0LDRgtC40YLRjCDRgSDQtNCw0L3QvdC+0Lkg0YLQvtGH0LrQuCDQvdC40YfQtdCz0L4g0L3QtdC70YzQt9GPXG4gKi9cbkRyYWdab25lLnByb3RvdHlwZS5vbkRyYWdTdGFydCA9IGZ1bmN0aW9uKGRvd25YLCBkb3duWSwgZXZlbnQpIHtcblxuICBsZXQgYXZhdGFyID0gdGhpcy5fbWFrZUF2YXRhcigpO1xuXG4gIGlmICghYXZhdGFyLmluaXRGcm9tRXZlbnQoZG93blgsIGRvd25ZLCBldmVudCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYXZhdGFyO1xufTtcbiIsIi8qKlxuICog0JfQvtC90LAsINCyINC60L7RgtC+0YDRg9GOINC+0LHRitC10LrRgtGLINC80L7QttC90L4g0LrQu9Cw0YHRgtGMXG4gKiDQl9Cw0L3QuNC80LDQtdGC0YHRjyDQuNC90LTQuNC60LDRhtC40LXQuSDQv9C10YDQtdC00LLQuNC20LXQvdC40Y8g0L/QviDRgdC10LHQtSwg0LTQvtCx0LDQstC70LXQvdC40LXQvCDQsiDRgdC10LHRj1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEcm9wVGFyZ2V0KGVsZW0pIHtcbiAgICBlbGVtLmRyb3BUYXJnZXQgPSB0aGlzO1xuICAgIHRoaXMuX2VsZW0gPSBlbGVtO1xuXG4gICAgLyoqXG4gICAgICog0J/QvtC00Y3Qu9C10LzQtdC90YIsINC90LDQtCDQutC+0YLQvtGA0YvQvCDQsiDQvdCw0YHRgtC+0Y/RidC40Lkg0LzQvtC80LXQvdGCINC90LDRhdC+0LTQuNGC0YHRjyDQsNCy0LDRgtCw0YBcbiAgICAgKi9cbiAgICB0aGlzLl90YXJnZXRFbGVtID0gbnVsbDtcbn1cblxuLyoqXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiBET00t0L/QvtC00Y3Qu9C10LzQtdC90YIsINC90LDQtCDQutC+0YLQvtGA0YvQvCDRgdC10LnRh9Cw0YEg0L/RgNC+0LvQtdGC0LDQtdGCINCw0LLQsNGC0LDRgFxuICpcbiAqIEByZXR1cm4gRE9NLdGN0LvQtdC80LXQvdGCLCDQvdCwINC60L7RgtC+0YDRi9C5INC80L7QttC90L4g0L/QvtC70L7QttC40YLRjCDQuNC70LggdW5kZWZpbmVkXG4gKi9cbkRyb3BUYXJnZXQucHJvdG90eXBlLl9nZXRUYXJnZXRFbGVtID0gZnVuY3Rpb24oYXZhdGFyLCBldmVudCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtO1xufTtcblxuLyoqXG4gKiDQodC/0YDRj9GC0LDRgtGMINC40L3QtNC40LrQsNGG0LjRjiDQv9C10YDQtdC90L7RgdCwXG4gKiDQktGL0LfRi9Cy0LDQtdGC0YHRjywg0LrQvtCz0LTQsCDQsNCy0LDRgtCw0YAg0YPRhdC+0LTQuNGCINGBINGC0LXQutGD0YnQtdCz0L4gdGhpcy5fdGFyZ2V0RWxlbVxuICovXG5Ecm9wVGFyZ2V0LnByb3RvdHlwZS5faGlkZUhvdmVySW5kaWNhdGlvbiA9IGZ1bmN0aW9uKGF2YXRhcikge1xuICAgIC8qIG92ZXJyaWRlICovXG59O1xuXG4vKipcbiAqINCf0L7QutCw0LfQsNGC0Ywg0LjQvdC00LjQutCw0YbQuNGOINC/0LXRgNC10L3QvtGB0LBcbiAqINCS0YvQt9GL0LLQsNC10YLRgdGPLCDQutC+0LPQtNCwINCw0LLQsNGC0LDRgCDQv9GA0LjRiNC10Lsg0L3QsCDQvdC+0LLRi9C5IHRoaXMuX3RhcmdldEVsZW1cbiAqL1xuRHJvcFRhcmdldC5wcm90b3R5cGUuX3Nob3dIb3ZlckluZGljYXRpb24gPSBmdW5jdGlvbihhdmF0YXIpIHtcbiAgICAvKiBvdmVycmlkZSAqL1xufTtcblxuLyoqXG4gKiDQnNC10YLQvtC0INCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQutCw0LbQtNC+0Lwg0LTQstC40LbQtdC90LjQuCDQsNCy0LDRgtCw0YDQsFxuICovXG5Ecm9wVGFyZ2V0LnByb3RvdHlwZS5vbkRyYWdNb3ZlID0gZnVuY3Rpb24oYXZhdGFyLCBldmVudCkge1xuICAgIGxldCBuZXdUYXJnZXRFbGVtID0gdGhpcy5fZ2V0VGFyZ2V0RWxlbShhdmF0YXIsIGV2ZW50KTtcblxuICAgIGlmICh0aGlzLl90YXJnZXRFbGVtICE9PSBuZXdUYXJnZXRFbGVtKSB7XG4gICAgICAgIHRoaXMuX2hpZGVIb3ZlckluZGljYXRpb24oYXZhdGFyKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWxlbSA9IG5ld1RhcmdldEVsZW07XG4gICAgICAgIHRoaXMuX3Nob3dIb3ZlckluZGljYXRpb24oYXZhdGFyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqINCX0LDQstC10YDRiNC10L3QuNC1INC/0LXRgNC10L3QvtGB0LAuXG4gKiDQkNC70LPQvtGA0LjRgtC8INC+0LHRgNCw0LHQvtGC0LrQuCAo0L/QtdGA0LXQvtC/0YDQtdC00LXQu9C40YLRjCDRhNGD0L3QutGG0LjRjiDQuCDQvdCw0L/QuNGB0LDRgtGMINCyINC/0L7RgtC+0LzQutC1KTpcbiAqIDEuINCf0L7Qu9GD0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC/0LXRgNC10L3QvtGB0LAg0LjQtyBhdmF0YXIuZ2V0RHJhZ0luZm8oKVxuICogMi4g0J7Qv9GA0LXQtNC10LvQuNGC0YwsINCy0L7Qt9C80L7QttC10L0g0LvQuCDQv9C10YDQtdC90L7RgSDQvdCwIF90YXJnZXRFbGVtICjQtdGB0LvQuCDQvtC9INC10YHRgtGMKVxuICogMy4g0JLRi9C30LLQsNGC0YwgYXZhdGFyLm9uRHJhZ0VuZCgpINC40LvQuCBhdmF0YXIub25EcmFnQ2FuY2VsKClcbiAqICDQldGB0LvQuCDQvdGD0LbQvdC+INC/0L7QtNGC0LLQtdGA0LTQuNGC0Ywg0L/QtdGA0LXQvdC+0YEg0LfQsNC/0YDQvtGB0L7QvCDQvdCwINGB0LXRgNCy0LXRgCwg0YLQviBhdmF0YXIub25EcmFnRW5kKCksXG4gKiAg0LAg0LfQsNGC0LXQvCDQsNGB0LjQvdGF0YDQvtC90L3Qviwg0LXRgdC70Lgg0YHQtdGA0LLQtdGAINCy0LXRgNC90YPQuyDQvtGI0LjQsdC60YMsIGF2YXRhci5vbkRyYWdDYW5jZWwoKVxuICogINCf0YDQuCDRjdGC0L7QvCDQsNCy0LDRgtCw0YAg0LTQvtC70LbQtdC9INGD0LzQtdGC0YwgXCLQvtGC0LrQsNGC0YvQstCw0YLRjNGB0Y9cIiDQv9C+0YHQu9C1IG9uRHJhZ0VuZC5cbiAqXG4gKiDQn9GA0Lgg0LvRjtCx0L7QvCDQt9Cw0LLQtdGA0YjQtdC90LjQuCDRjdGC0L7Qs9C+INC80LXRgtC+0LTQsCDQvdGD0LbQvdC+ICjQtNC10LvQsNC10YLRgdGPINC90LjQttC1KTpcbiAqICDRgdC90Y/RgtGMINGC0LXQutGD0YnRg9GOINC40L3QtNC40LrQsNGG0LjRjiDQv9C10YDQtdC90L7RgdCwXG4gKiAg0L7QsdC90YPQu9C40YLRjCB0aGlzLl90YXJnZXRFbGVtXG4gKi9cbkRyb3BUYXJnZXQucHJvdG90eXBlLm9uRHJhZ0VuZCA9IGZ1bmN0aW9uKGF2YXRhciwgZXZlbnQpIHtcbiAgICB0aGlzLl9oaWRlSG92ZXJJbmRpY2F0aW9uKGF2YXRhcik7XG4gICAgdGhpcy5fdGFyZ2V0RWxlbSA9IG51bGw7XG59O1xuXG4vKipcbiAqINCS0YXQvtC0INCw0LLQsNGC0LDRgNCwINCyIERyb3BUYXJnZXRcbiAqL1xuRHJvcFRhcmdldC5wcm90b3R5cGUub25EcmFnRW50ZXIgPSBmdW5jdGlvbihmcm9tRHJvcFRhcmdldCwgYXZhdGFyLCBldmVudCkge1xuICAgIGNvbnN0IGNvb3JkcyA9IGV2ZW50LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBZID0gY29vcmRzLnRvcCArIGNvb3Jkcy5oZWlnaHQgLyAyO1xufTtcblxuLyoqXG4gKiDQktGL0YXQvtC0INCw0LLQsNGC0LDRgNCwINC40LcgRHJvcFRhcmdldFxuICovXG5Ecm9wVGFyZ2V0LnByb3RvdHlwZS5vbkRyYWdMZWF2ZSA9IGZ1bmN0aW9uKHRvRHJvcFRhcmdldCwgYXZhdGFyLCBldmVudCkge1xuICAgIHRoaXMuX2hpZGVIb3ZlckluZGljYXRpb24oKTtcbiAgICB0aGlzLl90YXJnZXRFbGVtID0gbnVsbDtcbn07XG4iLCJpbXBvcnQgRHJhZ0F2YXRhciBmcm9tICcuL0RyYWdBdmF0YXInO1xuaW1wb3J0IHtnZXRDb29yZHN9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVlRHJhZ0F2YXRhciBleHRlbmRzIERyYWdBdmF0YXIge1xuICAgIGNvbnN0cnVjdG9yIChkcmFnWm9uZSwgZHJhZ0VsZW0pIHtcbiAgICAgICAgc3VwZXIoZHJhZ1pvbmUsIGRyYWdFbGVtKTtcbiAgICB9XG5cbiAgICBpbml0RnJvbUV2ZW50IChkb3duWCwgZG93blksIGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJhZ2dhYmxlJykpIHJldHVybiBmYWxzZTtcblxuICAgICAgICB0aGlzLl9kcmFnWm9uZUVsZW0gPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtID0gdGhpcy5fZHJhZ1pvbmVFbGVtLmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9ICdhdmF0YXInO1xuXG4gICAgICAgIC8vINGB0L7Qt9C00LDRgtGMINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDRgdCy0L7QudGB0YLQstCwIHNoaWZ0WC9zaGlmdFlcbiAgICAgICAgbGV0IGNvb3JkcyA9IGdldENvb3Jkcyh0aGlzLl9kcmFnWm9uZUVsZW0pO1xuXG4gICAgICAgIHRoaXMuX3NoaWZ0WCA9IGRvd25YIC0gY29vcmRzLmxlZnQ7XG4gICAgICAgIHRoaXMuX3NoaWZ0WSA9IGRvd25ZIC0gY29vcmRzLnRvcDtcblxuICAgICAgICAvLyDQuNC90LjRhtC40LjRgNC+0LLQsNGC0Ywg0L3QsNGH0LDQu9C+INC/0LXRgNC10L3QvtGB0LBcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgZWxlbS5zdHlsZS56SW5kZXggPSA5OTk5O1xuICAgICAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgLy8gZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9kZXN0cm95ICgpIHtcbiAgICAgICAgdGhpcy5fZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2VsZW0pO1xuICAgIH1cblxuICAgIG9uRHJhZ0NhbmNlbCAoKSB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBvbkRyYWdFbmQgKCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IERyYWdab25lIGZyb20gJy4vRHJhZ1pvbmUnO1xuaW1wb3J0IFRyZWVEcmFnQXZhdGFyIGZyb20gJy4vVHJlZURyYWdBdmF0YXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVlRHJhZ1pvbmUgZXh0ZW5kcyBEcmFnWm9uZSB7XG4gICAgY29uc3RydWN0b3IoZWxlbSkge1xuICAgICAgICBzdXBlcihlbGVtKTtcbiAgICB9XG4gICAgX21ha2VBdmF0YXIgKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRyZWVEcmFnQXZhdGFyKHRoaXMsIHRoaXMuX2VsZW0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBEcm9wVGFyZ2V0IGZyb20gJy4vRHJvcFRhcmdldCc7XG5pbXBvcnQge2V4dGVuZH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWVEcm9wVGFyZ2V0IGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gICAgY29uc3RydWN0b3IoZWxlbSkge1xuICAgICAgICBzdXBlcihlbGVtKTtcbiAgICB9XG5cbiAgICBfc2hvd0hvdmVySW5kaWNhdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsZW0gJiYgdGhpcy5fdGFyZ2V0RWxlbS5jbGFzc0xpc3QuYWRkKCdob3ZlcicpO1xuICAgIH1cblxuICAgIF9oaWRlSG92ZXJJbmRpY2F0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWxlbSAmJiB0aGlzLl90YXJnZXRFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsZW0gJiYgdGhpcy5fdGFyZ2V0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdhYm92ZScpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbGVtICYmIHRoaXMuX3RhcmdldEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgndW5kZXInKTtcbiAgICB9XG5cbiAgICBfZ2V0VGFyZ2V0RWxlbSAoYXZhdGFyLCBldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gYXZhdGFyLmdldFRhcmdldEVsZW0oKTtcblxuICAgICAgICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3BwYWJsZScpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQv9GA0L7QstC10YDQuNGC0YwsINC80L7QttC10YIg0LHRi9GC0Ywg0L/QtdGA0LXQvdC+0YEg0YPQt9C70LAg0LLQvdGD0YLRgNGMINGB0LDQvNC+0LPQviDRgdC10LHRjyDQuNC70Lgg0LIg0YHQtdCx0Y8/XG4gICAgICAgIGxldCBlbGVtVG9Nb3ZlID0gYXZhdGFyLmdldERyYWdJbmZvKGV2ZW50KS5kcmFnWm9uZUVsZW0ucGFyZW50Tm9kZTtcblxuICAgICAgICBsZXQgZWxlbSA9IHRhcmdldDtcblxuICAgICAgICB3aGlsZSAoZWxlbSkge1xuICAgICAgICAgICAgaWYgKGVsZW0gPT09IGVsZW1Ub01vdmUpIHJldHVybjsgLy8g0L/QvtC/0YvRgtC60LAg0L/QtdGA0LXQvdC10YHRgtC4INGA0L7QtNC40YLQtdC70Y8g0LIg0L/QvtGC0L7QvNC60LBcbiAgICAgICAgICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGFkZEJvcmRlciAoYm9yZGVyKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsZW0gJiYgdGhpcy5fdGFyZ2V0RWxlbS5jbGFzc0xpc3QuYWRkKGJvcmRlcik7XG4gICAgfVxuXG4gICAgcmVtb3ZlQm9yZGVyIChib3JkZXIpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWxlbSAmJiB0aGlzLl90YXJnZXRFbGVtLmNsYXNzTGlzdC5yZW1vdmUoYm9yZGVyKTtcbiAgICB9XG5cbiAgICBvbkRyYWdNb3ZlKGF2YXRhciwgZXZlbnQpIHtcbiAgICAgICAgc3VwZXIub25EcmFnTW92ZShhdmF0YXIsIGV2ZW50KTtcblxuICAgICAgICBpZiAodGhpcy5fdGFyZ2V0RWxlbSkge1xuICAgICAgICAgICAgY29uc3QgY2xpZW50WSA9IGV2ZW50LmNsaWVudFk7XG5cbiAgICAgICAgICAgIGNvbnN0IHt0b3AsIGhlaWdodH0gPSB0aGlzLl90YXJnZXRFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50TWlkZGxlID0gdG9wICsgaGVpZ2h0IC8gMjtcblxuICAgICAgICAgICAgaWYgKGNsaWVudFkgPCBlbGVtZW50TWlkZGxlKSB7XG4gICAgICAgICAgICAgICAgLy8gdXB3YXJkc1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQm9yZGVyKCd1bmRlcicpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQm9yZGVyKCdhYm92ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBkb3dud2FyZHNcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUJvcmRlcignYWJvdmUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJvcmRlcigndW5kZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZ0VuZCAoYXZhdGFyLCBldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuX3RhcmdldEVsZW0pIHtcbiAgICAgICAgICAgIC8vINC/0LXRgNC10L3QvtGBINC30LDQutC+0L3Rh9C40LvRgdGPINCy0L3QtSDQv9C+0LTRhdC+0LTRj9GJ0LXQuSDRgtC+0YfQutC4INC/0YDQuNC30LXQvNC70LXQvdC40Y9cbiAgICAgICAgICAgIGF2YXRhci5vbkRyYWdDYW5jZWwoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faGlkZUhvdmVySW5kaWNhdGlvbigpO1xuICAgICAgICAvLyDQv9C+0LvRg9GH0LjRgtGMINC40L3RhNC+0YDQvNCw0YbQuNGOINC+0LEg0L7QsdGK0LXQutGC0LUg0L/QtdGA0LXQvdC+0YHQsFxuICAgICAgICBsZXQgYXZhdGFySW5mbyA9IGF2YXRhci5nZXREcmFnSW5mbyhldmVudCk7XG5cbiAgICAgICAgYXZhdGFyLm9uRHJhZ0VuZCgpOyAvLyDQsNCy0LDRgtCw0YAg0LHQvtC70YzRiNC1INC90LUg0L3Rg9C20LXQvSwg0L/QtdGA0LXQvdC+0YEg0YPRgdC/0LXRiNC10L1cblxuICAgICAgICAvLyDQstGB0YLQsNCy0LjRgtGMINGN0LvQtdC80LXQvdGCINCyINC00LXRgtC10Lkg0LIg0L7RgtGB0L7RgNGC0LjRgNC+0LLQsNC90L3QvtC8INC/0L7RgNGP0LTQutC1XG4gICAgICAgIGxldCBlbGVtVG9Nb3ZlID0gYXZhdGFySW5mby5kcmFnWm9uZUVsZW0ucGFyZW50Tm9kZTsgLy8gPExJPlxuICAgICAgICBsZXQgdGl0bGUgPSBhdmF0YXJJbmZvLmRyYWdab25lRWxlbS5pbm5lckhUTUw7IC8vINC/0LXRgNC10L3QvtGB0LjQvNGL0Lkg0LfQsNCz0L7Qu9C+0LLQvtC6XG5cbiAgICAgICAgLy8g0L/QvtC70YPRh9C40YLRjCDQutC+0L3RgtC10LnQvdC10YAg0LTQu9GPINGD0LfQu9C+0LIg0LTQtdGA0LXQstCwLCDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0Y7RidC40Lkg0YLQvtGH0LrQtSDQv9GA0LXQt9C10LzQu9C10L3QuNGPXG4gICAgICAgIGxldCB1bCA9IHRoaXMuX3RhcmdldEVsZW0ucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVUwnKVswXTtcblxuICAgICAgICBpZiAoIXVsKSB7IC8vINC90LXRgiDQtNC10YLQtdC5LCDRgdC+0LfQtNCw0LTQuNC8INC60L7QvdGC0LXQudC90LXRgFxuICAgICAgICAgICAgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdVTCcpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWxlbS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCy0YHRgtCw0LLQuNGC0Ywg0L3QvtCy0YvQuSDRg9C30LXQuyDQsiDQvdGD0LbQvdC+0LUg0LzQtdGB0YLQviDRgdGA0LXQtNC4INC/0L7RgtC+0LzQutC+0LIsINCyINCw0LvRhNCw0LLQuNGC0L3QvtC8INC/0L7RgNGP0LTQutC1XG4gICAgICAgIGxldCBsaSA9IG51bGw7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGkgPSB1bC5jaGlsZHJlbltpXTtcblxuICAgICAgICAgICAgbGV0IGNoaWxkVGl0bGUgPSBsaS5jaGlsZHJlblswXS5pbm5lckhUTUw7XG4gICAgICAgICAgICBpZiAoY2hpbGRUaXRsZSA+IHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB1bC5pbnNlcnRCZWZvcmUoZWxlbVRvTW92ZSwgbGkpO1xuXG4gICAgICAgIHRoaXMuX3RhcmdldEVsZW0gPSBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCBEcmFnTWFuYWdlciBmcm9tICcuL0RyYWdNYW5hZ2VyJztcbmltcG9ydCBEcmFnQXZhdGFyIGZyb20gJy4vRHJhZ0F2YXRhcic7XG5pbXBvcnQgRHJvcFRhcmdldCBmcm9tICcuL0Ryb3BUYXJnZXQnO1xuaW1wb3J0IERyYWdab25lIGZyb20gJy4vRHJhZ1pvbmUnO1xuXG5pbXBvcnQgVHJlZURyYWdab25lIGZyb20gJy4vVHJlZURyYWdab25lJztcbmltcG9ydCBUcmVlRHJvcFRhcmdldCBmcm9tICcuL1RyZWVEcm9wVGFyZ2V0JztcbmltcG9ydCBUcmVlRHJhZ0F2YXRhciBmcm9tICcuL1RyZWVEcmFnQXZhdGFyJztcblxuZXhwb3J0IHtcbiAgICBEcmFnTWFuYWdlcixcbiAgICBEcmFnQXZhdGFyLFxuICAgIERyb3BUYXJnZXQsXG4gICAgRHJhZ1pvbmUsXG4gICAgVHJlZURyYWdab25lLFxuICAgIFRyZWVEcm9wVGFyZ2V0LFxuICAgIFRyZWVEcmFnQXZhdGFyXG59XG5cbi8vIGxldCB0cmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RyZWUnKTtcbi8vIGxldCBkcmFnRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcmFnZ2FibGUnKTtcbi8vXG4vLyBjb25zdCB0cmVlRHJhZ1pvbmUgPSBuZXcgVHJlZURyYWdab25lKHRyZWUpO1xuLy8gY29uc3QgdHJlZURyb3BUYXJnZXQgPSBuZXcgVHJlZURyb3BUYXJnZXQodHJlZSk7XG5cblxuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkcyAoZWxlbSkge1xuICAgIGxldCBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgbGV0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGxldCBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgbGV0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbGVtLnNjcm9sbFRvcCB8fCBib2R5LnNjcm9sbFRvcDtcbiAgICBsZXQgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2NFbGVtLnNjcm9sbExlZnQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgbGV0IGNsaWVudFRvcCA9IGRvY0VsZW0uY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XG4gICAgbGV0IGNsaWVudExlZnQgPSBkb2NFbGVtLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG5cbiAgICBsZXQgdG9wID0gYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcDtcbiAgICBsZXQgbGVmdCA9IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IE1hdGgucm91bmQodG9wKSxcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZChsZWZ0KVxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50VW5kZXJDbGllbnRYWSAoZWxlbSwgY2xpZW50WCwgY2xpZW50WSkge1xuICAgIGxldCBkaXNwbGF5ID0gZWxlbS5zdHlsZS5kaXNwbGF5IHx8ICcnO1xuXG4gICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoY2xpZW50WCwgY2xpZW50WSk7XG5cbiAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuXG4gICAgaWYgKCF0YXJnZXQgfHwgdGFyZ2V0ID09IGRvY3VtZW50KSB7IC8vINGN0YLQviDQsdGL0LLQsNC10YIg0L/RgNC4INCy0YvQvdC+0YHQtSDQt9CwINCz0YDQsNC90LjRhtGLINC+0LrQvdCwXG4gICAgICAgIHRhcmdldCA9IGRvY3VtZW50LmJvZHk7IC8vINC/0L7Qv9GA0LDQstC40YLRjCDQt9C90LDRh9C10L3QuNC1LCDRh9GC0L7QsdGLINCx0YvQuyDQuNC80LXQvdC90L4g0Y3Qu9C10LzQtdC90YJcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kIChDaGlsZCwgUGFyZW50KSB7XG4gICAgZnVuY3Rpb24gRigpIHt9XG5cbiAgICBGLnByb3RvdHlwZSA9IFBhcmVudC5wcm90b3R5cGU7XG4gICAgQ2hpbGQucHJvdG90eXBlID0gbmV3IEYoKTtcbiAgICBDaGlsZC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDaGlsZDtcbiAgICBDaGlsZC5wYXJlbnQgPSBQYXJlbnQucHJvdG90eXBlO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==