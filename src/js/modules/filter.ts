export const filter = () => {
	const menu = document.querySelector('.portfolio-menu')
	const items = document.querySelectorAll<HTMLElement>('li')
	const btnAll = document.querySelector('.all')
	const btnLovers = document.querySelector('.lovers')
	const btnChef = document.querySelector('.chef')
	const btnGirl = document.querySelector('.girl')
	const btnGuy = document.querySelector('.guy')
	const btnGrandmother = document.querySelector('.grandmother')
	const btnGranddad = document.querySelector('.granddad')
	const wrapper = document.querySelectorAll<HTMLElement>('.portfolio-block')
	const markAll = document.querySelectorAll<HTMLElement>('.all')
	const markLovers = document.querySelectorAll<HTMLElement>('.lovers')
	const markGirl = document.querySelectorAll<HTMLElement>('.girl')
	const markChef = document.querySelectorAll<HTMLElement>('.chef')
	const markGuy = document.querySelectorAll<HTMLElement>('.guy')
	const no = document.querySelector<HTMLElement>('.portfolio-no')


	const typeFilter = (markType: NodeListOf<HTMLElement> | HTMLElement | null) => {
		wrapper.forEach(mark => {
			mark.style.display = 'none'
			mark.classList.remove('animated', 'fadeIn')
		})

		if (no) {
			no.style.display = 'none'
			no?.classList.remove('animated', 'fadeIn')
		}

		if (markType instanceof NodeList) {
			markType.forEach(mark => {
				mark.style.display = 'block'
				mark.classList.add('animated', 'fadeIn')
			});
		}

		if (markType instanceof HTMLElement) {
			markType.style.display = 'block'
			markType.classList.add('animated', 'fadeIn')
		}

		if (markType && markType === no) {
			no.style.display = 'block'
			no?.classList.add('animated', 'fadeIn')
		}
	}

	const filters = [
		{ button: btnAll, marks: markAll },
		{ button: btnLovers, marks: markLovers },
		{ button: btnChef, marks: markChef },
		{ button: btnGirl, marks: markGirl },
		{ button: btnGuy, marks: markGuy },
		{ button: btnGrandmother, marks: no },
		{ button: btnGranddad, marks: no }
	]

	filters.forEach(({ button, marks }) => {
		button?.addEventListener('click', () => {
			typeFilter(marks)
		})
	})

	menu?.addEventListener('click', (event) => {
		const target = event.target

		if (target instanceof HTMLElement && target.tagName == 'LI') {
			items.forEach(item => item.classList.remove('active'));
			target.classList.add('active')
		}
	})
}