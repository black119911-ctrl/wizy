document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('table');

    let draggingEle;
    let draggingColumnIndex;
    let placeholder;
    let list;
    let isDraggingStarted = false;

    // Начальная позиция мыши
    let x = 0;
    let y = 0;

    // Порог для обнаружения начала перетаскивания
    const THRESHOLD = 5;

    // Функция для обмена двумя узлами
    const swap = function (nodeA, nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        nodeB.parentNode.insertBefore(nodeA, nodeB);
        parentA.insertBefore(nodeB, siblingA);
    };

    // Функция для определения левой стороны
    const isOnLeft = function (nodeA, nodeB) {
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();
        return rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2;
    };

    // Функция для клонирования таблицы
    const cloneTable = function () {
        const rect = table.getBoundingClientRect();

        list = document.createElement('div');
        list.classList.add('clone-list');
        list.style.position = 'absolute';
        list.style.left = `${rect.left}px`;
        list.style.top = `${rect.top}px`;
        table.parentNode.insertBefore(list, table);

        // Скрываем оригинальную таблицу
        table.style.visibility = 'hidden';

        // Собираем все ячейки
        const originalCells = [].slice.call(table.querySelectorAll('.tbody .td'));
        const originalHeaderCells = [].slice.call(table.querySelectorAll('.th'));
        const numColumns = originalHeaderCells.length;

        originalHeaderCells.forEach((headerCell, headerIndex) => {
            const width = window.getComputedStyle(headerCell).width;

            const item = document.createElement('div');
            item.classList.add('draggable');

            const newTable = document.createElement('div');
            newTable.classList.add('table');
            newTable.style.width = width;

            // Заголовок строки
            const th = headerCell.cloneNode(true);
            const newRow = document.createElement('div');
            newRow.classList.add('tr');
            newRow.appendChild(th);
            newTable.appendChild(newRow);

            // Данные таблицы
            const cells = originalCells.filter((c, idx) => (idx - headerIndex) % numColumns === 0);
            cells.forEach(cell => {
                const newCell = cell.cloneNode(true);
                newCell.style.width = width;
                const tr = document.createElement('div');
                tr.classList.add('tr');
                tr.appendChild(newCell);
                newTable.appendChild(tr);
            });

            item.appendChild(newTable);
            list.appendChild(item);
        });
    };

    // Обработчик нажатия мыши
    const mouseDownHandler = function (e) {
        draggingColumnIndex = [].slice.call(table.querySelectorAll('.th')).indexOf(e.target.closest('.th'));

        // Сохраняем начальную позицию мыши
        x = e.clientX - e.target.getBoundingClientRect().left;
        y = e.clientY - e.target.getBoundingClientRect().top;

        // Регистрация событий
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    // Обработчик движения мыши
    const mouseMoveHandler = function (e) {
        if (!isDraggingStarted) {
            // Первая проверка: существует ли list
            if (!list) return;

            // Присваиваем элемент, который будем перетаскивать
            draggingEle = [].slice.call(list.children)[draggingColumnIndex];

            // Расчёт координат
            const dx = Math.abs(x - (e.clientX - draggingEle.getBoundingClientRect().left));
            const dy = Math.abs(y - (e.clientY - draggingEle.getBoundingClientRect().top));

            // Проверка условия начала перетаскивания
            if (dx >= THRESHOLD || dy >= THRESHOLD) {
                isDraggingStarted = true;
                cloneTable();
                draggingEle.classList.add('dragging');

                // Создание заглушки
                placeholder = document.createElement('div');
                placeholder.classList.add('placeholder');
                placeholder.style.width = `${draggingEle.offsetWidth}px`;
                draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
            }
        }

        if (isDraggingStarted) {
            // Абсолюное позиционирование
            draggingEle.style.position = 'absolute';
            draggingEle.style.left = `${e.clientX - x}px`;
            draggingEle.style.top = `${e.clientY - y}px`;

            // Логика переключения колонок
            const prevEle = draggingEle.previousElementSibling;
            const nextEle = placeholder.nextElementSibling;

            if (prevEle && isOnLeft(draggingEle, prevEle)) {
                swap(placeholder, draggingEle);
                swap(placeholder, prevEle);
            }

            if (nextEle && isOnLeft(nextEle, draggingEle)) {
                swap(nextEle, placeholder);
                swap(nextEle, draggingEle);
            }
        }
    };

    // Обработчик отпускания мыши
    const mouseUpHandler = function () {
        if (!isDraggingStarted) return;

        // Убираем заглушку
        placeholder && placeholder.parentNode.removeChild(placeholder);

        draggingEle.classList.remove('dragging');
        draggingEle.style.removeProperty('top');
        draggingEle.style.removeProperty('left');
        draggingEle.style.removeProperty('position');

        // Сохраняем новый индекс колонки
        const endColumnIndex = [].slice.call(list.children).indexOf(draggingEle);

        isDraggingStarted = false;

        // Восстанавливаем оригинальную таблицу
        list.parentNode.removeChild(list);
        table.style.removeProperty('visibility');

        // Обновляем порядок колонок
        table.querySelectorAll('.tr').forEach(row => {
            const cells = [].slice.call(row.querySelectorAll('.th, .td'));
            draggingColumnIndex > endColumnIndex
                ? cells[endColumnIndex].parentNode.insertBefore(cells[draggingColumnIndex], cells[endColumnIndex])
                : cells[endColumnIndex].parentNode.insertBefore(cells[draggingColumnIndex], cells[endColumnIndex].nextSibling);
        });

        // Удаляем обработчики событий
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Присваиваем обработчики каждому заголовочному элементу
    table.querySelectorAll('.th').forEach(headerCell => {
        headerCell.classList.add('draggable');
        headerCell.addEventListener('mousedown', mouseDownHandler);
    });
});