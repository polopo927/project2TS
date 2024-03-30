export const checkEmailInputs = (selector: string) => {
	const emailInputs = document.querySelectorAll<HTMLInputElement>(selector)

	emailInputs.forEach(input => {
		const engKeyboard = /[^a-z 0-9 @]/ig
		input.addEventListener('keypress', (event: KeyboardEvent) => {
			if (event.key.match(engKeyboard)) {
				event.preventDefault()
			}
		})
	})
}