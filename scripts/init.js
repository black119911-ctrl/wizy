jQuery(function ($) {
	$('input[type="tel"]').mask("+ 7 999 (999) 9999");

	$('[data-svg]').not('loaded').each(function () {
		var $i = $(this).addClass('loaded');

		$.get($i.data('svg'), function (data) {
			var $svg = $(data).find('svg');

			$svg.attr('class', $i.attr('class'));
			$i.replaceWith($svg);
		}, 'xml');
	});

	$('.sidebar__btn').on('click', function (e) {
		$('.sidebar').toggleClass('collapsed');
	});

	$('[data-modal]').on('click', function (e) {
		e.preventDefault();

		const modalId = $(this).data('modal');
		$('#' + modalId).addClass('active');

		$("body").addClass('shadow-overlay');
		if ($('body').hasClass('shadow-overlay')) {
			// $('body').css({
			// 	'padding-right': scrollbarWidth + 'px'
			// });
			// $('.header__menu').css({
			// 	'padding-right': scrollbarWidth + 'px'
			// });
		} else {
			$('body').css('padding-right', '');
			$('.header__menu').css('padding-right', '');
		};
	});

	$(document).mouseup(function (e) { // событие клика по веб-документу
		var div = $(".modal__content"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
			&&
			div.has(e.target).length === 0) { // и не по его дочерним элементам
			$('.modal').removeClass('active');
			$("body").removeClass('shadow-overlay');
		}
		if ($('body').hasClass('shadow-overlay')) {
			// $('body').css({
			// 	'padding-right': scrollbarWidth + 'px'
			// });
		} else {
			$('body').css('padding-right', '');
		};
	});

	$('.panel__head-edit').on('click', function (e) {
		$('.table .inputbox').removeClass('disabled').addClass('edit-mode');
		$('.panel__head-search, .panel__head-edit, .panel__head-insert, .panel__head-save').toggleClass('inactive');
	});

	$('.table__input').on('click', function (e) {
		$(this).find('.inputbox.disabled').removeClass('disabled');
	});

	$('.table__input .inputbox').on('keydown', function (e) {
		if (e.key === 'Enter') {
			e.preventDefault(); // ← важно! чтобы не было сабмита формы

			const $input = $(this);
			const value = $input.val().trim();

			if (value === '') {
				$input.removeClass('disabled'); // если вдруг был
				// можно вернуть стили, убрать ошибки и т.д. если надо
			} else {
				$input.addClass('disabled').blur();
			}
		}
	});

	$('.panel__head-save').on('click', function (e) {
		$('.table .inputbox').addClass('disabled').removeClass('edit-mode');
		$('.panel__head-search, .panel__head-edit, .panel__head-insert, .panel__head-save').toggleClass('inactive');
	});

	$('.panel__head-constructor .panel__head-btn').on('click', function (e) {
		$(this).siblings('.dropdown__block').addClass('open');
	});

	$('.table-constructor__close').on('click', function (e) {
		$('.table-constructor').removeClass('open');
	});

	$(document).ready(function () {
		$('[data-dropdown="dropdown-trigger"]').on('click', function (e) {
			const $currentDropdown = $(this).closest('.dropdown');
			const $currentBlock = $currentDropdown.find('[data-dropdown="dropdown-block"]');
			$('[data-dropdown="dropdown-block"]').not($currentBlock).removeClass('open').closest('.dropdown').removeClass('active');
			$currentBlock.toggleClass('open');
			$currentDropdown.toggleClass('active');
		});
		$(document).on('click', function (e) {
			if (
				!$(e.target).closest('[data-dropdown="dropdown-block"]').length &&
				!$(e.target).closest('[data-dropdown="dropdown-trigger"]').length
			) {
				$('[data-dropdown="dropdown-block"]').removeClass('open');
				$('.dropdown').removeClass('active');
			}
		});
	});

	$('.panel__tabs').on('click', '.panel__tabs-title', function (e) {
		e.preventDefault();

		const $this = $(this);
		const tab = $this.data('tab');
		const style = $this.data('style');
		const $panel = $this.closest('.panel');
		const $tabsContainer = $this.closest('.panel__tabs');

		// Обновляем активные табы
		$tabsContainer.find('.panel__tabs-title').removeClass('active');
		$tabsContainer.find('.panel__tabs-title[data-tab="' + tab + '"]').addClass('active');

		// Переключаем контент
		$tabsContainer.find('.panel__tabs-content').removeClass('active');
		$tabsContainer.find('.panel__tabs-content[data-tab="' + tab + '"]').addClass('active');

		// Меняем класс .panel, только если есть data-style
		if (style) {
			const currentClasses = $panel.attr('class').split(/\s+/).filter(cls => !cls.startsWith('style') && !cls.startsWith('bg-'));
			$panel.attr('class', currentClasses.join(' ').trim() + ' ' + style);
		}
	});

	$('.checker').on('click', function (e) {
		$(this).toggleClass('active');
	});

	$('.tables__inner').masonry();

	$('.checker_table').on('click', function (e) {
		$('.table-hide').toggleClass('active');
		equalizeHeights();
		$('.tables__inner').masonry();
	});

	$('.table__cell-fields').removeClass('is-first-fields is-last-fields'); // сбрасываем перед новым проходом

	$('.table__cell').each(function (i, el) {
		const $el = $(el);
		const isField = $el.hasClass('table__cell-fields');
		const $prev = $(el).prev('.table__cell');
		const $next = $(el).next('.table__cell');

		const wasPrevField = $prev.hasClass('table__cell-fields');
		const isNextField = $next.hasClass('table__cell-fields');

		if (isField && !wasPrevField) {
			$el.addClass('is-first-fields');
		}
		if (isField && !isNextField) {
			$el.addClass('is-last-fields');
		}
	});

	$('.table__collapsed-title').on('click', function (e) {
		$(this).toggleClass('active').siblings('.table__collapsed-content').slideToggle();
	});
});

const swiper = new Swiper('.table__slider-js', {
	loop: false,
	slidesPerView: 'auto',
	freeMode: true,
	grid: {
		rows: 2,
	},

	navigation: {
		nextEl: '.table__slider-next',
		prevEl: '.table__slider-prev',
	},
	//	scrollbar: {
	//		el: '.swiper-scrollbar',
	//	},
});
