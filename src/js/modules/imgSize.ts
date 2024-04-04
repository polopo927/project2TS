export const imgSize = (imgSelector: string) => {
	const blocks = document.querySelectorAll<HTMLElement>(imgSelector);

	const showImg = (block: HTMLElement) => {
		const img = block.querySelector('img')

		if (img) {
			img.src = img.src.slice(0, -4) + '-1.png'
			block.querySelectorAll<HTMLElement>('p:not(.sizes-hit)').forEach(p => {
				p.style.display = 'none'
			})
		}
	}

	const hideImg = (block: HTMLElement) => {
		const img = block.querySelector('img')

		if (img) {
			img.src = img.src.slice(0, -6) + '.png'
			block.querySelectorAll<HTMLElement>('p').forEach(p => {
				p.style.display = 'block'
			})
		}
	}

	blocks.forEach(block => {
		block.addEventListener('mouseover', () => {
			showImg(block)
		})
		block.addEventListener('mouseout', () => {
			hideImg(block)
		})
	})
}