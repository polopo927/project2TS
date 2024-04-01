export const showMoreStyles = (trigger: string, styles: string) => {
	const btn = document.querySelector(trigger)
	const cards = document.querySelectorAll<HTMLElement>(styles)

	cards.forEach(card => {
		card.classList.add('animated', 'fadeInUp')
	})

	if (btn) {
		btn.addEventListener('click', () => {
			cards.forEach(card => {
				card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs')
				card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1')
			})

			btn.remove()
		})
	}
}