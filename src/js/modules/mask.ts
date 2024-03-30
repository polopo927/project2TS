export const mask = (selector: string) => {

	const setCursorPosition = (pos: number, el: HTMLInputElement | any) => {
		el.focus();

		if (el.setSelectionRange) {
			el.setSelectionRange(pos, pos)
		} else if (el.createTextRange) {
			const range = el.createTextRange()

			range.collapse(true)
			range.moveStart('character', pos)
			range.moveEnd('character', pos)
			range.select()
		}
	}

	function createMask(this: HTMLInputElement, event: Event) {
		let i = 0
		const matrix = '+7 (___)-___-__-__'
		const def = matrix.replace(/\D/g, '')
		let val = this.value.replace(/\D/g, '')

		if (def.length >= val.length) {
			val = def
		}

		this.value = matrix.replace(/./g, (a) => {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a
		})

		if (event.type === 'blur') {
			if (this.value.length == 2) {
				this.value = ''
			}
		} else {
			setCursorPosition(this.value.length, this)
		}
	}

	const inputs = document.querySelectorAll(selector)

	inputs.forEach(input => {
		input.addEventListener('input', createMask)
		input.addEventListener('focus', createMask)
		input.addEventListener('blur', createMask)
	})
}