import { getResource } from "../services/request"

export const showMoreStyles = (trigger: string, wrapper: string) => {
	const btn = document.querySelector(trigger)
	interface StyleCard {
		src: string,
		title: string,
		link: string
	}

	const createCards = (response: StyleCard[]) => {
		response.forEach(({src, title, link}) => {
			const card = document.createElement('div')

			card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1')
			card.innerHTML = `
			<div class='styles-block'>
				<img src=${src} alt>
				<h4>${title}</h4>
				<a href=${link}>Подробнее</a>
			</div>
			`

			const wrapperElement = document.querySelector(wrapper)
			if (wrapperElement) {
				wrapperElement.appendChild(card)
			}
		})
	}
	btn?.addEventListener('click', () => {
		getResource('http://localhost:3000/styles')
			.then(result => createCards(result))
			.catch(error => console.log(error))

			btn.remove()
	})
}