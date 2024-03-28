interface SlidersConfig {
	slides: string,
	direction?: string,
	prev: string,
	next: string
}

//создаём функцию которая листает слайды
export const sliders = ({
	slides,
	direction,
	prev,
	next }: SlidersConfig) => {

	let slideIndex: number = 1
	//получаем все слайды
	const items = document.querySelectorAll<HTMLElement>(slides)

	//создаём функцию где n это индекс слайда
	const showSlides = (n: number) => {
		//если окажется что последний слайд показывается и дильше нет, начинаем снова с первого слайда
		if (n > items.length) {
			slideIndex = 1;
		}

		//если окажется что число меньше чем один, то показываем последний слайд
		if (n < 1) {
			slideIndex = items.length
		}

		//получаем каждый слайд по отдельности
		items.forEach((item: HTMLElement) => {
			//добавляем им анимацию и скрываем
			item.classList.add('animated')
			item.style.display = 'none'
		})

		//оставляем один слайд
		items[slideIndex - 1].style.display = 'block'
	}

	//вызываем функцию
	showSlides(slideIndex)

	//функция смены слайда
	const changeSlides = (n: number) => {
		if (slideIndex) {
			showSlides(slideIndex += n)
		}
	}

	try {
		const prevBtn = document.querySelector(prev)
		const nextBtn = document.querySelector(next)

		//вешаем обработчик событий клика предыдущий слайд
		prevBtn?.addEventListener('click', () => {
			changeSlides(-1)
			if (slideIndex) {
				items[slideIndex - 1].classList.remove('slideInLeft')
				items[slideIndex - 1].classList.add('slideInRight')
			}
		})
		//вешаем обработчик событий клика следующий слайд
		nextBtn?.addEventListener('click', () => {
			changeSlides(1)
			if (slideIndex) {
				items[slideIndex - 1].classList.remove('slideInRight')
				items[slideIndex - 1].classList.add('slideInLeft')
			}
		})
	} catch (error) { }

	let paused: number | undefined

	//создаём функцию автоматического слайда
	const stopAnimation = () => {
		if (direction === 'vertical') {
			paused = setInterval(() => {
				changeSlides(1)
				items[slideIndex - 1].classList.add('slideInDown')
			}, 3000)
		} else {
			paused = setInterval(() => {
				changeSlides(1)
				items[slideIndex - 1].classList.remove('slideInRight')
				items[slideIndex - 1].classList.add('slideInLeft')
			}, 3000)
		}
	}

	stopAnimation();

	//обработчики событий если мышка на слайде то автоматический слайд останавливается, если курсор вышел за пределы слайда, то запускается обратно
	if (items.length > 0) {
		items[0].parentNode?.addEventListener('mouseenter', () => {
			if (paused !== undefined) {
				clearInterval(paused)
				paused = undefined
			}
		})

		items[0].parentNode?.addEventListener('mouseleave', () => {
			stopAnimation()
		})
	}
}
