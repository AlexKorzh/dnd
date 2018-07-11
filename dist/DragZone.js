import Mediator from './Mediator';
/**
 * Зона, из которой можно переносить объекты
 * Умеет обрабатывать начало переноса на себе и создавать "аватар"
 * @param elem DOM-элемент, к которому привязана зона
 */
export default class DragZone extends Mediator {
    constructor(elem) {
        super();

        if (elem !== null) elem.dragZone = this;
        this._elem = elem;
    }

    /**
     * Инициализация элемента (получение ссылки на DOM - элемент)
     * @param elem DOM-элемент, к которому привязана зона
     */

    initDragZone(elem) {
        this._elem = elem;
        elem.dragZone = this;
    }

    /**
     * Создать аватар, соответствующий зоне.
     * У разных зон могут быть разные типы аватаров
     */
    _makeAvatar() {
        /* override */
    }

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
    onDragStart(downX, downY, event) {

        let avatar = this._makeAvatar();

        if (!avatar.initFromEvent(downX, downY, event)) {
            return false;
        }

        return avatar;
    }
}