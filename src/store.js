/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.count = 0;
    }

    /**
     * Подписка слушателя на изменения состояния
     * @param listener {Function}
     * @returns {Function} Функция отписки
     */
    subscribe(listener) {
        this.listeners.push(listener);
        // Возвращается функция для удаления добавленного слушателя
        return () => {
            this.listeners = this.listeners.filter((item) => item !== listener);
        };
    }

    /**
     * Выбор состояния
     * @returns {Object}
     */
    getState() {
        return this.state;
    }

    /**
     * Установка состояния
     * @param newState {Object}
     */
    setState(newState) {
        this.state = newState;
        // Вызываем всех слушателей
        for (const listener of this.listeners) listener();
    }

    // Генератор случайных чисел
    generateUniqueId() {
        return Math.floor(Math.random() * 100) + 1;
    }

    /**
     * Добавление новой записи
     */
    addItem() {
        this.setState({
            ...this.state,
            list: [
                ...this.state.list,
                {
                    code: this.generateUniqueId(),
                    title: 'Новая запись',
                    numberOfClicks: 0,
                },
            ],
        });
    }

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.filter((item) => item.code !== code),
        });
    }

    /**
     * Выделение записи по коду
     * @param code
     */
    selectItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map((item) => {
                if (item.code === code) {
                    item.selected = !item.selected;
                    if (item.selected) {
                        item.numberOfClicks = item.numberOfClicks + 1;
                    }
                } else {
                    item.selected = false;
                }
                return item;
            }),
        });
    }
}

export default Store;
