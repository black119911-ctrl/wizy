async function getPlanFact() {
    const endpoint = `${requestUrl}CabinetPlan`
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

    const data = await response.json()

    console.log(data);

    if (data.result) {
        const planFactProducts = data.result

        document.getElementById('plan-fact-table').innerHTML = '';

        planFactProducts.forEach(product => {
        let rowHtml = `
            <div class="table__row">
                <div class="table__cell table__image" style="width: 60px;">
                    <span><img src="${product.productPhoto}" alt=""></span>
                    <i><img src="${product.productPhoto}" alt=""></i>
                </div>
                <div class="table__cell table__article hover" style="width: 100px;"><a href="#" class="table__cell-link">${product.product}</a></div>
                <div class="table__cell table__text" style="width: 100px;"><span>2346</span></div>
                <div class="table__cell table__text" style="width: 110px;"><span>8</span></div>
                <div class="table__cell table__text" style="width: 100px;"><span>8</span></div>
                <div class="table__cell table__text" style="width: 100px;"><span>6780</span></div>
                <div class="table__cell table__progress" style="width: 160px;">
                    <div class="table__progress-line"><i style="width: ${Math.floor((Math.random() * 150))}%;"></i></div>
                    <div class="table__progress-count">${Math.floor((Math.random() * 150))}%</div>
                </div>
                <div class="table__cell table__text bad" style="width: 130px;"><span>-10</span></div>
                <div class="table__cell table__text" style="width: 110px;"><span>7892</span></div>
                <div class="table__cell table__text" style="width: 70px;"><span><strong>1.5</strong></span></div>
                <div class="table__cell table__progress" style="width: 160px;">
                    <div class="table__progress-line poor"><i style="width: ${Math.floor((Math.random() * 100))}%;"></i></div>
                    <div class="table__progress-count">${Math.floor((Math.random() * 100))}%</div>
                </div>
                <div class="table__cell table__text good" style="width: 130px;"><span>24</span></div>
                <div class="table__cell table__text" style="width: 110px;"><span>1.5</span></div>
            </div>`

            document.getElementById('plan-fact-table').innerHTML += rowHtml;
        });
    }
}
getPlanFact()