interface ModalConfig {
	triggerSelector: string,
	modalSelector: string,
	closeSelector: string,
	closeClickOverlay?: boolean
}

//создаём структуру для экспорта в наш файл main.js
//создаём стрелочную функцию которая будет выполнять функцию
export const modals = () => {
	//отвечает за привязку нашего модального окна к триггеру
	//triggerSelector (например селектор нашей кнопки по которой будем кликать)
	//modalSelector говорит о том какое модальное окно мы будем открывать
	//closeSelector (селектор который будет закрывать наше модальное окно например крестик)
	const bindModal = ({
		triggerSelector,
		modalSelector,
		closeSelector,
		closeClickOverlay = true
	}: ModalConfig) => {
		const triggers = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector) as HTMLElement | null;
		const close = document.querySelector(closeSelector) as HTMLElement | null;
		const windows = document.querySelectorAll('[data-modal]');
		const scroll = calcScroll();
		const closeModal = () => {
			//если modal не равно null то это true, то выполнится
			if (modal) {
				//обращаемся к модалке и скрываем её
				modal.style.display = 'none';
				//возвращаем прокрутку страницы
				document.body.style.overflow = '';
			}
		}
		const closeAllModal = () => {
			//приводим window к типу Element
			windows.forEach((window: Element) => {
				//проверяем чтобы window являлся елементом, так как только у элементов есть свойство style
				if (window instanceof HTMLElement)
					//закрываем их
					window.style.display = 'none'
				document.body.style.overflow = '';
			});
		}
		const deleteDivScroll = () => {
			//убираем заменитель скролла при закрытии модалки
			document.body.style.marginRight = 0 + 'px';
		}

		//делаем перебор элементов так как используем queryselectorall
		triggers.forEach(trigger => {
			trigger.addEventListener('click', (event) => {
				//делаем условие, что если существует событие у элемента, то отменяем стандартную работу браузера для него
				if (event.target) {
					event.preventDefault();
				}

				closeAllModal();

				//если modal не равно null то это true, то выполнится
				if (modal) {
					//показываем модальное окно
					modal.style.display = 'block';
					//блокируем прокрутку страницы когда модалка открыта
					document.body.style.overflow = 'hidden';
					//добавляем заменитель скролла чтобы страница не прыгала при открытии модалки
					document.body.style.marginRight = scroll + 'px';
					//если в css присутствуют классы для показf и скрытия, можно использовать их
					//document.body.classList.add('modal-open')
				}
			});
		});

		//проверяем чтобы close не являлся null
		if (close) {
			//навешиваем обработчик событий при клике на закрывающий элемент
			close.addEventListener('click', () => {
				closeModal();
				closeAllModal();
				deleteDivScroll();

				//если в css присутствуют классы для показы и скрытия, можно использовать их
				//document.body.classList.remove('modal-open')
			});
		}

		//проверяем чтобы modal не являлся null
		if (modal) {
			//делаем функцию закрытия модалки при нажатии на область которая к ней не относится
			modal.addEventListener('click', (event) => {
				if (event.target === modal && closeClickOverlay) {
					closeModal();
					closeAllModal();
					deleteDivScroll();
					//если в css присутствуют классы для показы и скрытия, можно использовать их
					//document.body.classList.remove('modal-open')
				}
			});
		}
	}

	//функция для открытия модалки, если пользователь находится на сайте определённое время
	//передаём селектор модалки и время через которое откроется модалка
	//приводим аргументы к типам
	const showModalByTime = (selector: string, time: number) => {
		setTimeout(() => {
			//обозначаем новую переменную которая будет проверять открыта у нас модалка или нет
			let display;
			//получаем все модальные окна и перебираем все чтобы проверить открыто ли какое-то в данный момент
			document.querySelectorAll('[data-modal]').forEach(modal => {
				//метод getComputedStyle() проверяет стили которые применил сам браузер к модалке
				//само условие звучит так если свойство display у модального окна не равно none (то есть какое-то модальное окно показано пользователю)
				if (getComputedStyle(modal).display !== 'none') {
					//то присвоим переменной display такое же значение
					display = 'block'
				}
			})

			//если у нас не одно модальное окно не открыто, то показываем модальное окно которое нам нужно
			if (!display) {
				//создаём проверку на модалку, чтобы она не являлась null
				const modalToDisplay = document.querySelector<HTMLElement>(selector)
				if (modalToDisplay) {
					modalToDisplay.style.display = 'block';
					//блокируем прокрутку страницы когда модалка открыта
					document.body.style.overflow = 'hidden';
				}
			}
		}, time);
	}

	//создаём функцию которая при вызове модалок будет скрывать скролл станицы, чтобы она не прыгала
	const calcScroll = () => {
		//создаём див для того чтобы положить туда отступ который будет идентичен скроллу
		const div = document.createElement('div');

		//задаём ему ширину, высоту, скролл если элемент больше странциы и скрываем его
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		//пушим его в конец родителя
		document.body.appendChild(div);

		//вычисляем его ширину скролла
		//offsetWidth - ширина с прокруткой
		//clientWidth - ширина без прокрутки
		const scrollWidth = div.offsetWidth - div.clientWidth;
		//после получения ширины скролла, удаляем див
		div.remove();

		//вытаскиваем ширину скролла
		return scrollWidth;
	}

	bindModal({
		triggerSelector: '.button-design',
		modalSelector: '.popup-design',
		closeSelector: '.popup-design .popup-close',
	});
	bindModal({
		triggerSelector: '.button-consultation',
		modalSelector: '.popup-consultation',
		closeSelector: '.popup-consultation .popup-close',
	});

	showModalByTime('.popup-consultation', 5000);
};