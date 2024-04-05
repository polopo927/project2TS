export const accordion = (triggers: string/* , itemsSelector: string */) => {
	const btns = document.querySelectorAll<HTMLElement>(triggers)

	btns.forEach((btn: HTMLElement) => {
		btn.addEventListener('click', () => {
			const nextElement = btn.nextElementSibling
			btn.classList.toggle('active-style')
			nextElement?.classList.toggle('active-content')

			if (btn.classList.contains('active-style')) {
				if (nextElement instanceof HTMLElement)
					nextElement.style.maxHeight = nextElement.scrollHeight + 80 + 'px'
			} else {
				if (nextElement instanceof HTMLElement) {
					nextElement.style.maxHeight = '0px'
				}
			}
		})
	});

}
//реализация с помощью css стилей

/* const blocks = document.querySelectorAll<HTMLElement>(itemsSelector) */

/* blocks.forEach(block => block.classList.add('animated', 'fadeInDown'))

btns.forEach(btn => {
	btn.addEventListener('click', () => {
		if (!btn.classList.contains('active')) {
			btns.forEach(btn => btn.classList.remove('active', 'active-style'))
		}

		btn.classList.add('active', 'active-style')
	})
}) */
