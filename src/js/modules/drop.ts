export const drop = () => {
	const fileInputs = document.querySelectorAll<HTMLInputElement>('[name="upload"]')

	const preventDefaults = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()
	}

	['dragenter', 'dragleave', 'dragover', 'drop'].forEach((atribut: string) => {
		fileInputs.forEach(input => {
			input.addEventListener(atribut, preventDefaults, false)
		})
	});

	const highLight = (item: HTMLElement) => {
		const elem = item.closest('.file_upload')
		if (elem instanceof HTMLElement) {
			elem.style.border = '5px solid yellow'
			elem.style.backgroundColor = 'rgba(0,0,0 .7)'
		}
	}

	const unHighLight = (item: HTMLElement) => {
		let ColorBackground = item.style.backgroundColor
		const fileUpload = item.closest('.file_upload')

		if (fileUpload instanceof HTMLElement) {
			fileUpload.style.border = 'none'
			if (item.closest('.calc_form')) {
				ColorBackground = '#fff'
			} else if (item.classList.contains('header_upload-img')) {
				ColorBackground = '#f7e7e6'
			} else {
				ColorBackground = '#ededed'
			}
			fileUpload.style.backgroundColor = ColorBackground
		}
	}

	['dragenter', 'dragover'].forEach((atribut: string) => {
		fileInputs.forEach(input => {
			input.addEventListener(atribut, () => highLight(input), false)
		})
	});

	['dragleave', 'drop'].forEach((atribut: string) => {
		fileInputs.forEach(input => {
			input.addEventListener(atribut, () => unHighLight(input), false)
		})
	});

	fileInputs.forEach(input => {
		input.addEventListener('drop', (e) => {
			if (e.dataTransfer) {
				input.files = e.dataTransfer.files
				if (input.files) {
					//с помощью деструктуризации получаем имя и разрешение файла 
					const [name, ext] = input.files[0].name.split('.')
					//тернарное условие если имя файла длинее 10 символов, то dots присваиваем ..., если нет, то точку
					const dots = name.length > 9 ? '...' : '.'
					//получаем полное имя файла подставляем из переменной name символы с 0 по 9, если больше там больше дотс будет ... и разрешение файла
					const fullName = name.substring(0, 9) + dots + ext
					//если предыдущий элемент существует, он не является null
					if (input.previousElementSibling) {
						//то заменяем ему текст на полное имя файла 
						input.previousElementSibling.textContent = fullName
					}
				}
			}
		})
	})
}

//события использующиеся при draganddrop функционале

//срабатывающие на элементе который перетаскиваем (например картинку)
// drag
// dragend
// dragexit
// dragstart



// dragenter - срабатывает когда перетаскиваемый объект перетаскивается над кокой-то dropArea
// dragleave - срабатывает если переносимый объект перетащили за пределы dropArea
// dragover - срабатывает если перетаскиваемый объект находится над dropArea
// drop - срабатывает если пользователь отпустил кнопку мышки когда перетаскивал объект и он упал в dropAreat