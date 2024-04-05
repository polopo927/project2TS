export const burger = (burgerSelector: string, menuSelector: string) => {
	const burgerElement = document.querySelector(burgerSelector)
	const menuElement: HTMLElement | null = document.querySelector(menuSelector)

	const hideBurger = () => {
		if (menuElement) {
			menuElement.style.display = 'none'
		}
	}

	hideBurger()

	burgerElement?.addEventListener('click', () => {
		if (menuElement?.style.display == 'none' && window.screen.availWidth < 993) {
			menuElement.style.display = 'block'
		} else {
			hideBurger()
		}
	})

	window.addEventListener('resize', () => {
		if (window.screen.availWidth > 992) {
			hideBurger()
		}
	})
}