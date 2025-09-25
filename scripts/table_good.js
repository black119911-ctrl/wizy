function equalizeHeights() {
	// Выравнивание заголовков
	const headCells = document.querySelectorAll('.table__head .table__head-cell');
	let maxHeadHeight = 0;

	headCells.forEach(cell => {
		cell.style.height = ''; // сброс
		maxHeadHeight = Math.max(maxHeadHeight, cell.offsetHeight);
	});
	headCells.forEach(cell => {
		cell.style.height = `${maxHeadHeight}px`;
	});

	// Выравнивание ячеек по строкам
	const rows = document.querySelectorAll('.table__body .table__row');
	rows.forEach(row => {
		const cells = row.querySelectorAll('.table__cell');
		let maxRowHeight = 0;

		cells.forEach(cell => {
			cell.style.height = ''; // сброс
			maxRowHeight = Math.max(maxRowHeight, cell.offsetHeight);
		});
		cells.forEach(cell => {
			cell.style.height = `${maxRowHeight}px`;
		});
	});
}
document.addEventListener("DOMContentLoaded", equalizeHeights);

function tableStickyCells() {
	var $headPanel = $('.panel__head');
	var $table = $('.table-sticked');
	var $head = $table.find('.table__head');
	var $items = $table.find('.table__row');

	if ($items.length < 1 || $head.length < 1) return;

	var isWide = $(window).width() >= 768;
	var isOverflowing = $table.get(0).scrollWidth > $table.get(0).clientWidth;

	// Сброс sticky-классов и inline-стилей
	$items.each(function () {
		$(this).children().removeClass('sticky-cell sticky-shadow-right').css('left', '');
	});
	$head.children().removeClass('sticky-cell sticky-shadow-right').css('left', '');
	$table.removeClass('overflowed');
	$headPanel.removeClass('overflowed');

	if (isWide && isOverflowing) {
		var firstColWidth = $head.children().eq(0).outerWidth();

		$items.each(function () {
			var $children = $(this).children();
			$children.eq(0).addClass('sticky-cell').css('left', 0);
			$children.eq(1).addClass('sticky-cell sticky-shadow-right').css('left', firstColWidth);
		});

		var $headCells = $head.children();
		$headCells.eq(0).addClass('sticky-cell').css('left', 0);
		$headCells.eq(1).addClass('sticky-cell sticky-shadow-right').css('left', firstColWidth);

		$table.addClass('overflowed');
		$headPanel.addClass('overflowed');
	}
}

$(window).on('load resize', tableStickyCells);

// ===== Скрипт для работы конструктора таблицы с возможностью скрытия, закрепления и сортировки колонок =====
document.addEventListener("DOMContentLoaded", function () {
	const table = document.querySelector(".table-constructed");
	const allFieldsContainer = document.querySelector(".table-constructor__all .table-constructor__fields");
	const fixedFieldsContainer = document.querySelector(".table-constructor__fixed .table-constructor__fields");

	if (!table || !allFieldsContainer || !fixedFieldsContainer) return;

	const headCells = table.querySelectorAll(".table__head .table__head-cell");
	const template = allFieldsContainer.querySelector(".table-constructor__field");
	if (!template) return;

	allFieldsContainer.innerHTML = "";
	fixedFieldsContainer.innerHTML = "";

	headCells.forEach((cell, index) => {
		// Пропускаем колонки: изображения, артикулы и фиксированную справа
		if (cell.classList.contains("table__image") ||
			cell.classList.contains("table__article") ||
			cell.classList.contains("table__right-fixed")) return;

		const title = cell.textContent.trim();
		const columnClass = `table-column-${index + 1}`;
		const fieldClass = `constructor-field-${index + 1}`;

		cell.classList.add(columnClass);
		table.querySelectorAll(".table__body .table__row").forEach(row => {
			const cells = Array.from(row.children);
			if (cells[index]) cells[index].classList.add(columnClass);
		});

		const createField = (checked = false) => {
			const clone = template.cloneNode(true);
			const input = clone.querySelector('input[type="checkbox"]');
			const b = clone.querySelector("b");
			if (input) {
				input.value = title;
				input.checked = checked;
				input.classList.add("table-constructor__field-input");
			}
			if (b) b.textContent = title;
			clone.classList.add(fieldClass);
			return clone;
		};

		allFieldsContainer.appendChild(createField(true));
		fixedFieldsContainer.appendChild(createField(false));
	});

	function updateStickyPadding() {
		const stickyHeadCells = table.querySelectorAll(".table__head .table__head-cell.table-column-sticky");
		let totalStickyWidth = 0;
		stickyHeadCells.forEach(cell => {
			totalStickyWidth += cell.getBoundingClientRect().width;
		});

		const head = table.querySelector(".table__head");
		const body = table.querySelector(".table__body");
		if (head) head.style.paddingRight = `${totalStickyWidth}px`;
		if (body) body.style.paddingRight = `${totalStickyWidth}px`;
	}

	document.addEventListener("change", function (e) {
		const input = e.target;
		if (!input.matches(".table-constructor__field-input")) return;

		const field = input.closest("[class*='constructor-field-']");
		if (!field) return;

		const match = Array.from(field.classList).find(cls => cls.startsWith("constructor-field-"));
		if (!match) return;

		const columnIndex = match.split("-").pop();
		const columnClass = `table-column-${columnIndex}`;
		const relatedColumns = table.querySelectorAll(`.${columnClass}`);

		if (field.closest(".table-constructor__all")) {
			relatedColumns.forEach(el => el.classList.toggle("table-column-hidden", !input.checked));

			const fixedField = fixedFieldsContainer.querySelector(`.constructor-field-${columnIndex}`);
			if (fixedField) {
				const fixedInput = fixedField.querySelector(".table-constructor__field-input");
				if (input.checked) {
					fixedField.classList.remove("disabled-show");
				} else {
					if (fixedInput) fixedInput.checked = false;
					fixedField.classList.remove("active");
					fixedField.classList.add("disabled-show");
					relatedColumns.forEach(el => {
						el.classList.remove("table-column-sticky");
						el.style.right = "";
					});
					updateStickyOffsets();
					enforceStickyLimit();
					updateStickyPadding();
				}
			}
		}

		if (field.closest(".table-constructor__fixed")) {
			const allField = allFieldsContainer.querySelector(`.constructor-field-${columnIndex} .table-constructor__field-input`);
			const allEnabled = allField?.checked;
			field.classList.toggle("active", input.checked);
			if (!allEnabled) {
				if (input.checked) input.checked = false;
				field.classList.remove("active");
				field.classList.add("disabled-show");
			} else {
				field.classList.remove("disabled-show");
			}

			relatedColumns.forEach(el => el.classList.toggle("table-column-sticky", input.checked));
			updateStickyOffsets();
			enforceStickyLimit();
			updateStickyPadding();
		}
	});

	let draggedItem = null;

	allFieldsContainer.addEventListener("mousedown", function (e) {
		const dragHandle = e.target.closest(".table-constructor__drag");
		if (!dragHandle) return;

		draggedItem = dragHandle.closest(".table-constructor__field");
		if (!draggedItem) return;

		e.preventDefault();
		draggedItem.classList.add("is-dragging");

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	});

	function onMouseMove(e) {
		if (!draggedItem) return;
		const y = e.clientY;
		const siblings = Array.from(allFieldsContainer.querySelectorAll(".table-constructor__field")).filter(el => el !== draggedItem);
		for (const sibling of siblings) {
			const rect = sibling.getBoundingClientRect();
			const midpoint = rect.top + rect.height / 2;
			if (y < midpoint) {
				allFieldsContainer.insertBefore(draggedItem, sibling);
				break;
			}
			if (y > midpoint && sibling.nextSibling === null) {
				allFieldsContainer.appendChild(draggedItem);
				break;
			}
		}
	}

	function onMouseUp() {
		if (!draggedItem) return;
		draggedItem.classList.remove("is-dragging");
		draggedItem = null;
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("mouseup", onMouseUp);
		syncTableColumnOrder();
	}

	function syncTableColumnOrder() {
		const headRow = table.querySelector(".table__head");
		const bodyRows = table.querySelectorAll(".table__body .table__row");
		const newOrder = Array.from(allFieldsContainer.querySelectorAll(".table-constructor__field"))
			.map(field => {
				const match = Array.from(field.classList).find(cls => cls.startsWith("constructor-field-"));
				return match ? match.replace("constructor-field-", "") : null;
			})
			.filter(Boolean);

		const rightFixedHead = headRow.querySelector(".table__right-fixed");
		const rightFixedIndex = Array.from(headRow.children).indexOf(rightFixedHead);
		const newHead = newOrder.map(i => headRow.querySelector(`.table-column-${i}`)).filter(cell => cell && !cell.classList.contains("table__right-fixed"));
		newHead.forEach(cell => headRow.appendChild(cell));
		if (rightFixedHead) headRow.appendChild(rightFixedHead);

		bodyRows.forEach(row => {
			const rightFixedCell = row.children[rightFixedIndex];
			const cells = newOrder.map(i => row.querySelector(`.table-column-${i}`)).filter(cell => cell && !cell.classList.contains("table__right-fixed"));
			cells.forEach(cell => row.appendChild(cell));
			if (rightFixedCell) row.appendChild(rightFixedCell);
		});
	}

	function updateStickyOffsets() {
	const headRow = table.querySelector(".table__head");
	const bodyRows = table.querySelectorAll(".table__body .table__row");
	const stickyHeadCells = Array.from(headRow.querySelectorAll(".table__head-cell.table-column-sticky:not(.table__right-fixed)"));

	let totalRight = 0;

	table.querySelectorAll(".sticky-shadow-left").forEach(el => el.classList.remove("sticky-shadow-left"));
	table.querySelectorAll(".table__body .table__cell").forEach(cell => cell.classList.remove("sticky-shadow-left"));

	const isOverflowing = table.scrollWidth > table.clientWidth;
	let rightFixedWidth = 0;

	if (isOverflowing) {
		const rightFixed = headRow.querySelector(".table__right-fixed");
		if (rightFixed) {
			rightFixed.classList.add("table-column-sticky");
			rightFixed.style.right = `0px`;
			const index = Array.from(headRow.children).indexOf(rightFixed);
			if (index !== -1) {
				bodyRows.forEach(row => {
					const cell = row.children[index];
					if (cell) {
						cell.classList.add("table-column-sticky");
						cell.style.right = `0px`;
					}
				});
			}
			rightFixedWidth = rightFixed.getBoundingClientRect().width;
			totalRight += rightFixedWidth;
		}
	}

	stickyHeadCells.reverse().forEach((headCell, index) => {
		const columnClass = Array.from(headCell.classList).find(cls => cls.startsWith("table-column-"));
		if (!columnClass) return;
		const headWidth = headCell.getBoundingClientRect().width;
		headCell.style.right = `${totalRight}px`;
		const bodyCells = table.querySelectorAll(`.table__body .table__row .${columnClass}`);
		bodyCells.forEach(cell => cell.style.right = `${totalRight}px`);
		if (index === stickyHeadCells.length - 1) {
			headCell.classList.add("sticky-shadow-left");
			bodyCells.forEach(cell => cell.classList.add("sticky-shadow-left"));
		}
		totalRight += headWidth;
	});

	if (isOverflowing && stickyHeadCells.length === 0) {
		const rightFixed = headRow.querySelector(".table__right-fixed");
		if (rightFixed) {
			rightFixed.classList.add("sticky-shadow-left");
			const index = Array.from(headRow.children).indexOf(rightFixed);
			if (index !== -1) {
				bodyRows.forEach(row => {
					const cell = row.children[index];
					if (cell) cell.classList.add("sticky-shadow-left");
				});
			}
		}
	}

	// Обновление padding, включая right-fixed
	const head = table.querySelector(".table__head");
	const body = table.querySelector(".table__body");
	if (head) head.style.paddingRight = `${totalRight}px`;
	if (body) body.style.paddingRight = `${totalRight}px`;
}


	function enforceStickyLimit() {
		const fixedFields = fixedFieldsContainer.querySelectorAll(".table-constructor__field");
		const activeCount = Array.from(fixedFields).filter(f => f.classList.contains("active")).length;
		fixedFields.forEach(field => {
			if (!field.classList.contains("active")) {
				field.classList.toggle("disabled", activeCount >= 4);
			} else {
				field.classList.remove("disabled");
			}
		});
	}

	let draggedFixedItem = null;

	fixedFieldsContainer.addEventListener("mousedown", function (e) {
		const dragHandle = e.target.closest(".table-constructor__drag");
		if (!dragHandle) return;
		const parentField = dragHandle.closest(".table-constructor__field");
		if (!parentField || !parentField.classList.contains("active")) return;
		draggedFixedItem = parentField;
		e.preventDefault();
		draggedFixedItem.classList.add("is-dragging");
		document.addEventListener("mousemove", onFixedMouseMove);
		document.addEventListener("mouseup", onFixedMouseUp);
	});

	function onFixedMouseMove(e) {
		if (!draggedFixedItem) return;
		const y = e.clientY;
		const allFields = Array.from(fixedFieldsContainer.querySelectorAll(".table-constructor__field")).filter(el => el !== draggedFixedItem);
		let insertBefore = null;
		for (const sibling of allFields) {
			const rect = sibling.getBoundingClientRect();
			const midpoint = rect.top + rect.height / 2;
			if (y < midpoint) {
				insertBefore = sibling;
				break;
			}
		}
		if (insertBefore) {
			fixedFieldsContainer.insertBefore(draggedFixedItem, insertBefore);
		} else {
			fixedFieldsContainer.appendChild(draggedFixedItem);
		}
	}

	function onFixedMouseUp() {
		if (!draggedFixedItem) return;
		draggedFixedItem.classList.remove("is-dragging");
		draggedFixedItem = null;
		document.removeEventListener("mousemove", onFixedMouseMove);
		document.removeEventListener("mouseup", onFixedMouseUp);
		syncStickyColumnOrder();
	}

	fixedFieldsContainer.addEventListener("change", function (e) {
		const input = e.target;
		if (!input.matches(".table-constructor__field-input")) return;
		const field = input.closest(".table-constructor__field");
		if (!field) return;
		if (input.checked) {
			field.classList.add("active");
			field.classList.remove("disabled");
		} else {
			field.classList.remove("active");
			field.classList.add("disabled");
		}
		reorderStickyFromDOM();
		enforceStickyLimit?.();
	});

	fixedFieldsContainer.addEventListener("click", function (e) {
		const toggle = e.target.closest(".table-constructor__field-trigger");
		if (toggle) {
			reorderStickyFromDOM();
		}
	});

	function reorderStickyFromDOM() {
		const headRow = table.querySelector(".table__head");
		const bodyRows = table.querySelectorAll(".table__body .table__row");
		const orderedStickyIndices = Array.from(fixedFieldsContainer.querySelectorAll(".table-constructor__field"))
			.map(field => {
				if (!field.classList.contains("active")) return null;
				const match = Array.from(field.classList).find(cls => cls.startsWith("constructor-field-"));
				return match ? match.replace("constructor-field-", "") : null;
			})
			.filter(Boolean);

		orderedStickyIndices.reverse().forEach(i => {
			const headCell = headRow.querySelector(`.table__head-cell.table-column-${i}`);
			if (headCell && !headCell.classList.contains("table__right-fixed")) {
				headCell.classList.add("table-column-sticky");
				headRow.insertBefore(headCell, headRow.querySelector(".table__right-fixed"));
			}
			bodyRows.forEach(row => {
				const cell = row.querySelector(`.table-column-${i}`);
				if (cell && !cell.classList.contains("table__right-fixed")) {
					cell.classList.add("table-column-sticky");
					row.insertBefore(cell, row.querySelector(".table__right-fixed"));
				}
			});
		});
		updateStickyOffsets();
	}

	function syncStickyColumnOrder() {
		reorderStickyFromDOM();
	}
	
	// Вызов пересчёта при загрузке и ресайзе окна
	window.addEventListener("load", updateStickyOffsets);
	window.addEventListener("resize", updateStickyOffsets);
});
