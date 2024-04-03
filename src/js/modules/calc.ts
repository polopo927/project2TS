interface CalcConfig {
	size: string,
	material: string,
	options: string,
	promocode: string,
	result: string
}

export const calc = ({
	size,
	material,
	options,
	promocode,
	result
}: CalcConfig) => {
	const sizeBlock: HTMLSelectElement | null = document.querySelector(size);
	const materialBlock: HTMLSelectElement | null = document.querySelector(material);
	const optionsBlock: HTMLSelectElement | null = document.querySelector(options);
	const promocodeBlock: HTMLInputElement | null = document.querySelector(promocode);
	const resultBlock = document.querySelector(result)

	let sum = 0

	const calcFunc = () => {
		if (sizeBlock && materialBlock && optionsBlock && resultBlock && promocodeBlock) {

			sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

			if ((sizeBlock.value == '') || (materialBlock.value == '')) {
				return resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины'
			} else if (promocodeBlock.value === 'IWANTPOPART') {
				resultBlock.textContent = Math.round(sum * 0.7).toString()
			} else {
				resultBlock.textContent = sum.toString()
			}
		}
	}

	sizeBlock?.addEventListener('change', calcFunc)
	materialBlock?.addEventListener('change', calcFunc)
	optionsBlock?.addEventListener('change', calcFunc)
	promocodeBlock?.addEventListener('input', calcFunc)
}