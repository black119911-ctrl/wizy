async function getCabinetsStorage() {
    const endpoint = `${requestUrl}CabinetStorage`
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
        const products = data.result

        document.querySelector('#table-warehouse').innerHTML = ''

        products.forEach(product => {
            let template = `			<div class="tables__item">
											<section class="table no-scroll-y flexible bg-white">
												<div class="table__head">
													<span class="table__head-cell table__image align-left" style="width: 98px;"><b>Товар</b></span>
												</div>
												<div class="table__body">
													<div class="table__row">
														<div class="table__cell table__image" style="width: 98px;">
															<span><img src="images/product-thumb.png" alt=""></span>
															<i><img src="images/product.png" alt=""></i>
														</div>
														<div class="table__cell table__article hover" style="width: 140px;"><a href="#" class="table__cell-link">ART12456</a></div>
														<div class="table__cell table__article hover" style="width: 110px;"><a href="#" class="table__cell-link">WB12456</a></div>
													</div>
												</div>

												<div class="table table-sticked no-scroll-y">
													<div class="table__head">
														<span class="table__head-cell align-left" style="width: 98px;"><b>Размеры</b></span>
														<span class="table__head-cell" style="width: 140px;"></span>
														<span class="table__head-cell" style="width: 110px;">Тула</span>
														<span class="table__head-cell" style="width: 110px;">Казань</span>
														<span class="table__head-cell" style="width: 110px;">Коледино</span>
														<span class="table__head-cell" style="width: 110px;">Владимир</span>
														<span class="table__head-cell" style="width: 120px;">Электросталь</span>
													</div>
													<div class="table__flex">
														<div class="table__parameters">
															<div class="table__checker">
																<div class="checker">
																	<div class="checker__swith"><i></i></div>
																	<div class="checker__label">Все</div>
																</div>
															</div>
														</div>
														<div class="table__body">
															<div class="table__row">
																<div class="table__cell table__title" style="width: 140px;"><span><b>Остаток вб</b></span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>88</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>34</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>23</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>42</span></div>
																<div class="table__cell table__text" style="width: 120px;"><span>57</span></div>
															</div>

															<div class="table__row">
																<div class="table__cell table__title" style="width: 140px;"><span><b>Ср.заказы со склада</b><sup>За месяц</sup></span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>91</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>65</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>76</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>54</span></div>
																<div class="table__cell table__text" style="width: 120px;"><span>29</span></div>
															</div>

															<div class="table__row">
																<div class="table__cell table__title" style="width: 140px;"><span><b>Товара хватит на (дней)</b></span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>73</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>47</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>38</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>25</span></div>
																<div class="table__cell table__text" style="width: 120px;"><span>82</span></div>
															</div>

															<div class="table__row">
																<div class="table__cell table__title" style="width: 140px;"><span><b>Количество в поставку</b></span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>61</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>49</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>99</span></div>
																<div class="table__cell table__text" style="width: 110px;"><span>30</span></div>
																<div class="table__cell table__text" style="width: 120px;"><span>85</span></div>
															</div>

															<div class="table__row">
																<div class="table__cell table__title" style="width: 140px;"><span><b>Дата поставки</b></span></div>
																<div class="table__cell table__text light" style="width: 110px;"><span>20.06.2025</span></div>
																<div class="table__cell table__text light" style="width: 110px;"><span>20.06.2025</span></div>
																<div class="table__cell table__text light" style="width: 110px;"><span>20.06.2025</span></div>
																<div class="table__cell table__text light" style="width: 110px;"><span>20.06.2025</span></div>
																<div class="table__cell table__text light" style="width: 120px;"><span>20.06.2025</span></div>
															</div>
														</div>
													</div>
												</div>
											</section>
										</div>`;

            document.querySelector('#table-warehouse').innerHTML += template
        });
    }
}
getCabinetsStorage()