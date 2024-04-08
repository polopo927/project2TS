export const scrolling = (upSelector: string) => {
	const upElement = document.querySelector<HTMLAnchorElement>(upSelector)

	window.addEventListener('scroll', () => {
		const showUp = () => {
			upElement?.classList.remove('fadeOut')
			upElement?.classList.add('fadeIn')
		}
		const hideUp = () => {
			upElement?.classList.remove('fadeIn')
			upElement?.classList.add('fadeOut')
		}

		if (document.documentElement.scrollTop > 1650) {
			upElement?.classList.add('animated')
			showUp()
		} else {
			hideUp()
		}
	})

	// scrolling with scrollIntoView
	const links = document.querySelectorAll<HTMLAnchorElement>('[href^="#"]')

	links.forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault()
			const hash = link.getAttribute('href')
			if (hash) {
				const toBlock = document.querySelector(hash)
				if (toBlock) {
					toBlock.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					})
				}
			}
		})
	})
}
//scrolling with request animation frame
/* let links = document.querySelectorAll<HTMLAnchorElement>('[href^="#"]')
let speed = 0.2

links.forEach(link => {
	link.addEventListener('click', (event) => {
		event.preventDefault()

		const widthTop = document.documentElement.scrollTop
		const hash = link.hash
		const toBlock = document.querySelector(hash)?.getBoundingClientRect().top
		let start: number | null = null

		const step = (time: number) => {
			if (start === null) {
				start = time
			}

			const progress = time - start
			let pixel: number = widthTop
			if (toBlock !== undefined) {
				pixel = (toBlock < 0
					? Math.max(widthTop - progress / speed, widthTop + toBlock)
					: Math.min(widthTop + progress / speed, widthTop + toBlock))
			}

			document.documentElement.scrollTo(0, pixel)

			if (toBlock !== undefined && pixel !== widthTop + toBlock) {
				requestAnimationFrame(step)
			} else {
				location.hash = hash
			}
		}
		requestAnimationFrame(step)
	})
})
} */
/* 	const element = document.documentElement;
	const body = document.body;

	const calcScroll = () => {
		upElement?.addEventListener('click', (event) => {
			const scrollTop = Math.round(body.scrollTop || element.scrollTop)

			if (upElement.hash !== '') {
				event.preventDefault()
				let hashElement: HTMLElement | null = document.querySelector(upElement.hash)
				let hashElementTop = 0

				while (hashElement !== null) {
					hashElementTop += hashElement.offsetTop
					const parent = hashElement.offsetParent
					if (parent instanceof HTMLElement) {
						hashElement = parent
					} else {
						break
					}
				}
				hashElementTop = Math.round(hashElementTop)

				smoothScroll(scrollTop, hashElementTop, upElement.hash)
			}
		})
	}

	const smoothScroll = (from: number, to: number, hash: string) => {
		let timeInterval = 1
		let prevSkrollTop: number
		let speed: number

		if (to > from) {
			speed = 30
		} else {
			speed = -30
		}

		let move = setInterval(() => {
			let scrollTop = Math.round(body.scrollTop || element.scrollTop)
			const sharp = /#.*$/g

			if (
				prevSkrollTop === scrollTop ||
				(to > from && scrollTop >= to) ||
				(to < from && scrollTop <= to)
			) {
				clearInterval(move)
				history.replaceState(history.state, document.title, location.href.replace(sharp, '') + hash)
			} else {
				body.scrollTop += speed
				element.scrollTop += speed
				prevSkrollTop = scrollTop
			}
		},timeInterval)
	} 

	calcScroll()*/
