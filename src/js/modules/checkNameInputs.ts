export const checkNameInputs = (selector: string) => {
	const nameInputs = document.querySelectorAll<HTMLInputElement>(selector)

	nameInputs.forEach(input => {
		const rusKeyboard = /[^а-яё 0-9]/ig
		input.addEventListener('keypress', (event: KeyboardEvent) => {
			if (event.key.match(rusKeyboard)) {
				event.preventDefault()
			}
		})
	})
}