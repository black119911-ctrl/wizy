const productsTable = document.querySelector('#products-table')

async function getProducts() {
    const endpoint = `${requestUrl}CabinetProducts`
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
        headers: headers,
    })


    if (!response.ok) throw new Error(`Ошибка запроса: ${response.statusText}`);
    const data = await response.json()

    if (data.result) {
        const products = data.result
        
        productsTable.innerHTML = ''
        products.forEach(product => {
            productsTable.append(createTableRow(product))
        });
    }


}
getProducts()



function createTableRow(product) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "table__row";

    // Добавляем первый столбец с изображением и названием продукта
    const productCell = document.createElement("div");
    productCell.className = "table__cell table__product hover";
    productCell.style.width = "250px";

    const imageContainer = document.createElement("div");
    imageContainer.className = "table__product-image";

    const spanImgThumb = document.createElement("span");
    const imgThumb = document.createElement("img");
    imgThumb.src = product.photoLink; // Подставьте реальный путь к изображению
    imgThumb.alt = "";
    spanImgThumb.appendChild(imgThumb);

    const iProductImage = document.createElement("i");
    const imgProduct = document.createElement("img");
    imgProduct.src = product.photoLink; // Подставьте реальный путь к изображению
    imgProduct.alt = "";
    iProductImage.appendChild(imgProduct);

    imageContainer.append(spanImgThumb, iProductImage);

    const titleDiv = document.createElement("div");
    titleDiv.className = "table__product-title";
    titleDiv.textContent = product.name;

    productCell.append(imageContainer, titleDiv);

    // Второй столбец с артикулом товара
    const articleCell = document.createElement("div");
    articleCell.className = "table__cell table__article hover";
    articleCell.style.width = "100px";

    const link = document.createElement("a");
    link.href = "#";
    link.className = "table__cell-link";
    link.textContent = "654321789";

    articleCell.append(link);

    // Третий столбец с категорией товара
    const categoryCell = document.createElement("div");
    categoryCell.className = "table__cell";
    categoryCell.style.width = "162px";
    categoryCell.innerHTML = `<span>${product.category}</span>`;

    // Четвертый столбец с числовым полем ввода
    const numberInputCell = document.createElement("div");
    numberInputCell.className = "table__cell table__input hover";
    numberInputCell.style.width = "162px";

    const firstNumberInput = document.createElement("input");
    firstNumberInput.type = "number";
    firstNumberInput.className = "inputbox disabled";
    firstNumberInput.value = product.tax

    numberInputCell.append(firstNumberInput);

    // Аналогично создаём два аналогичных поля
    const secondNumberInputCell = numberInputCell.cloneNode(true); // Клонируем предыдущий контейнер
    secondNumberInputCell.querySelector(".inputbox").value = product.packaging;

    const thirdNumberInputCell = numberInputCell.cloneNode(true); // Ещё одно поле
    thirdNumberInputCell.querySelector(".inputbox").value = product.wholesalePrice;

    // Объединяем все ячейки в одну строку
    rowDiv.append(productCell, articleCell, categoryCell, numberInputCell, secondNumberInputCell, thirdNumberInputCell);

    return rowDiv;
}



/*
<div class="table__row">
    <div class="table__cell table__product hover" style="width: 250px;">
        <div class="table__product-image">
            <span><img src="images/product-thumb.png" alt=""></span>
            <i><img src="images/product.png" alt=""></i>
        </div>
        <div class="table__product-title">Мультитул тактический армейский нож складной с чехлом</div>
    </div>
    <div class="table__cell table__article hover" style="width: 100px;"><a href="#" class="table__cell-link">654321789</a></div>
    <div class="table__cell" style="width: 162px;"><span>Электроника</span></div>
    <div class="table__cell table__input hover" style="width: 162px;"><input type="number" class="inputbox disabled" value="45.000"></div>
    <div class="table__cell table__input hover" style="width: 162px;"><input type="number" class="inputbox disabled" value="45.000"></div>
    <div class="table__cell table__input hover" style="width: 162px;"><input type="number" class="inputbox disabled" value="45.000"></div>
</div>

*/