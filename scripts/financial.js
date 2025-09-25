document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('table');

    let draggingEle;
    let draggingColumnIndex;
    let placeholder;
    let list;
    let isDraggingStarted = false;

    // The current position of mouse relative to the dragging element
    let x = 0;
    let y = 0;

    let startDrag = false

    // Swap two nodes
    const swap = function (nodeA, nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        // Move `nodeA` to before the `nodeB`
        nodeB.parentNode.insertBefore(nodeA, nodeB);

        // Move `nodeB` to before the sibling of `nodeA`
        parentA.insertBefore(nodeB, siblingA);
    };

    // Check if `nodeA` is on the left of `nodeB`
    const isOnLeft = function (nodeA, nodeB) {
        // Get the bounding rectangle of nodes
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();
        return rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2;
    };


    const cloneTable = function () {
        const rect = table.getBoundingClientRect();

        list = document.createElement('div');
        list.classList.add('clone-list');
        list.style.position = 'absolute';
        list.style.left = `${rect.left}px`;
        list.style.top = `${rect.top}px`;
        table.parentNode.insertBefore(list, table);

        // Hide the original table
        table.style.visibility = 'hidden';

        // Get all cells
        const originalCells = [].slice.call(table.querySelectorAll('.tbody .td'));


        const originalHeaderCells = [].slice.call(table.querySelectorAll('.th'));
        const numColumns = originalHeaderCells.length;

        // Loop through the header cells
        originalHeaderCells.forEach(function (headerCell, headerIndex) {
            const width = parseInt(window.getComputedStyle(headerCell).width);

            // Create a new table from given row
            const item = document.createElement('div');
            item.classList.add('draggable');

            const newTable = document.createElement('div');
            newTable.classList.add('table')
            newTable.setAttribute('class', 'clone-table');
            newTable.style.width = `${width}px`;

            // Header
            const th = headerCell.cloneNode(true);
            let newRow = document.createElement('div');
            newRow.classList.add('tr')
            newRow.appendChild(th);
            newTable.appendChild(newRow);


            const cells = originalCells.filter(function (c, idx) {
                return (idx - headerIndex) % numColumns === 0;
            });


            cells.forEach(function (cell) {
                const newCell = cell.cloneNode(true);
                newCell.style.width = `${width}px`;
                newRow = document.createElement('div');
                newRow.classList.add('tr')
                newRow.appendChild(newCell);
                newTable.appendChild(newRow);
            });


            item.appendChild(newTable);
            list.appendChild(item);
        });
    };



    const mouseDownHandler = function (e) {
        draggingColumnIndex = [].slice.call(table.querySelectorAll('.th')).indexOf(e.target.closest('.th'));

        // console.log('mouseDownHandler');

        // console.log(e);

        // Determine the mouse position
        // x = e.clientX - e.target.offsetLeft;
        // y = e.clientY - e.target.offsetTop;


        x = e.clientX - e.target.getBoundingClientRect().left;
        y = e.clientY - e.target.getBoundingClientRect().top;


        // Attach the listeners to `document`

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };


    const mouseMoveHandler = function (e) {
        if (!isDraggingStarted) {

            // console.log(e);

            isDraggingStarted = true;

            cloneTable();

            draggingEle = [].slice.call(list.children)[draggingColumnIndex];
            draggingEle.classList.add('dragging');


            // Let the placeholder take the height of dragging element
            // So the next element won't move to the left or right
            // to fill the dragging element space
            placeholder = document.createElement('div');
            placeholder.classList.add('placeholder');
            draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
            placeholder.style.width = `${draggingEle.offsetWidth}px`;
        }


        let rectX = draggingEle.getBoundingClientRect().x

        // Set position for dragging element
        draggingEle.style.position = 'absolute';
        // draggingEle.style.top = `${draggingEle.offsetTop + e.clientY - y - (rectY - y)}px`;
        draggingEle.style.left = `${draggingEle.offsetLeft + e.clientX - x - (rectX - x)}px`;


        // draggingEle.style.top = `${0}px`;
        // draggingEle.style.left = `${e.clientX - x}px`;


        // Reassign the position of mouse
        x = e.clientX;
        y = e.clientY;

        // The current order
        // prevEle
        // draggingEle
        // placeholder
        // nextEle
        const prevEle = draggingEle.previousElementSibling;
        const nextEle = placeholder.nextElementSibling;

        // // The dragging element is above the previous element
        // // User moves the dragging element to the left
        if (prevEle && isOnLeft(draggingEle, prevEle)) {
            // The current order    -> The new order
            // prevEle              -> placeholder
            // draggingEle          -> draggingEle
            // placeholder          -> prevEle
            swap(placeholder, draggingEle);
            swap(placeholder, prevEle);
            return;
        }

        // The dragging element is below the next element
        // User moves the dragging element to the bottom
        if (nextEle && isOnLeft(nextEle, draggingEle)) {
            // The current order    -> The new order
            // draggingEle          -> nextEle
            // placeholder          -> placeholder
            // nextEle              -> draggingEle
            swap(nextEle, placeholder);
            swap(nextEle, draggingEle);
        }
    };

    const mouseUpHandler = function () {

        if (!isDraggingStarted) {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
            return
        }

        // // Remove the placeholder
        placeholder && placeholder.parentNode.removeChild(placeholder);

        draggingEle.classList.remove('dragging');
        draggingEle.style.removeProperty('top');
        draggingEle.style.removeProperty('left');
        draggingEle.style.removeProperty('position');

        // Get the end index
        const endColumnIndex = [].slice.call(list.children).indexOf(draggingEle);

        isDraggingStarted = false;

        // Remove the `list` element
        list.parentNode.removeChild(list);

        // Move the dragged column to `endColumnIndex`
        table.querySelectorAll('.tr').forEach(function (row) {
            const cells = [].slice.call(row.querySelectorAll('.th, .td'));
            draggingColumnIndex > endColumnIndex
                ? cells[endColumnIndex].parentNode.insertBefore(
                    cells[draggingColumnIndex],
                    cells[endColumnIndex]
                )
                : cells[endColumnIndex].parentNode.insertBefore(
                    cells[draggingColumnIndex],
                    cells[endColumnIndex].nextSibling
                );
        });

        // Bring back the table
        table.style.removeProperty('visibility');

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    table.querySelectorAll('.th').forEach(function (headerCell) {
        headerCell.classList.add('draggable');
        headerCell.addEventListener('mousedown', mouseDownHandler);
    });
});



async function getFinancial() {
    const endpoint = `${requestUrl}CabinetFin`
    const cabinetToken = getCookie('authToken')
    const storageGuid = getSelectedCabinetState()

    const headers = new Headers({
        Authorization: `${cabinetToken}`
    });

    const params = new URLSearchParams({
        guid: storageGuid,
    }).toString()

    const response = await fetch(`${endpoint}?${params}`, {
        method: 'GET',
        headers: headers
    })

    
    const data = await response.json()
    console.log(data)

    if (data.result) {
        const products = data.result.productReports

        document.querySelector('#financial-products').innerHTML = ''

        products.forEach(product => {
            let template = `				<div class="financial__tables-week-products-item">
												<div class="financial__tables-week-products-item__header">
													<div class="financial__tables-week-products-item__header-image hover-image"
														data-img-large="images/product.png">
														<img src="images/product-thumb.png" alt="" />
													</div>
													<div class="financial__tables-week-products-item__header-name">
														Мультитул тактический армейский нож складной с
														чехлом
													</div>
												</div>
												<table>
													<thead>
														<tr>
															<th>Параметры</th>
															<th>Данные</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>Продажа шт</td>
															<td>200</td>
														</tr>
														<tr>
															<td>Возврат шт</td>
															<td>100</td>
														</tr>
														<tr>
															<td>Продажа</td>
															<td>102 022</td>
														</tr>
														<tr>
															<td>Логистика</td>
															<td>5000</td>
														</tr>
														<tr>
															<td>Хранение</td>
															<td>2000</td>
														</tr>
														<tr>
															<td>К перечислению</td>
															<td>45 000</td>
														</tr>
														<tr>
															<td>Затраты на рекламу</td>
															<td>${product.advertisingCosts}</td>
														</tr>
														<tr>
															<td>Итого к оплате</td>
															<td>65 000</td>
														</tr>
														<tr>
															<td>Валовая прибыль</td>
															<td>120 000</td>
														</tr>
														<tr>
															<td>Налог</td>
															<td>${product.tax}</td>
														</tr>
														<tr>
															<td>ДРР</td>
															<td>90%</td>
														</tr>
														<tr>
															<td>ЧП</td>
															<td>5000</td>
														</tr>
														<tr>
															<td>ROI</td>
															<td>${product.roi}%</td>
														</tr>
														<tr>
															<td>ROS</td>
															<td>${product.ros}%</td>
														</tr>
													</tbody>
												</table>
											</div>`

            document.querySelector('#financial-products').innerHTML += template
        })
    }
}
getFinancial()