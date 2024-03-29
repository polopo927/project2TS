
export const formsFeedback = () => {
	const forms = document.querySelectorAll('form')
	const inputs = document.querySelectorAll('input')
	const inputsUpload = document.querySelectorAll<HTMLInputElement>('[name="upload"]')

	const messageFromSend = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро с Вами свяжемся!',
		failure: 'что-то пошло не так...',
		spinner: '/src/assets/img/spinner.gif',
		ok: '/src/assets/img/ok.png',
		fail: '/src/assets/img/fail.png'
	}

	const postData = async (url: string, data: string) => {
		const result = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: data
		})
		return await result.text()
	}

	const clearInputs = () => {
		inputs.forEach(input => {
			input.value = ''
		})
		inputsUpload.forEach(input => {
			if (input.previousElementSibling) {
				input.previousElementSibling.textContent = 'Файл не выбран'
			}
		})
	}

	inputsUpload.forEach(input => {
		input.addEventListener('input', () => {
			if (input.files) {
				let dots;
				const arrName = input.files[0].name.split('.')
				arrName[0].length > 9 ? dots = '...' : dots = '.'
				const name = arrName[0].substring(0, 6) + dots + arrName[1]
				if (input.previousElementSibling) {
					input.previousElementSibling.textContent = name
				}
			}
		})
	})

	forms.forEach(form => {
		form.addEventListener('submit', event => {
			event.preventDefault()

			const urlServer = 'https://simple-server-2ow5.onrender.com/api/data'

			const statusMessage = document.createElement('div')
			statusMessage.classList.add('status')
			form.parentNode?.appendChild(statusMessage)

			form.classList.add('animated', 'fadeOutUp')
			setTimeout(() => {
				form.style.display = 'none'
			}, 400)

			const statusImg = document.createElement('img')
			statusImg.setAttribute('src', messageFromSend.spinner)
			statusImg.classList.add('animated', 'fadeInUp')
			statusMessage.appendChild(statusImg)

			const statusText = document.createElement('div')
			statusText.textContent = messageFromSend.loading
			statusMessage.appendChild(statusText)

			const formData = new FormData(form)

			const jsonObject: { [key: string]: FormDataEntryValue } = {};
			formData.forEach((value, key) => {
				// Проверяем, является ли значение строкой, и только тогда добавляем в jsonObject
				if (typeof value === 'string') {
					jsonObject[key] = value;
				} else {
					// Обработка файлов или других типов данных
					console.log('Найден файл или нестроковое значение:', value);
				}
			});
			const jsonData = JSON.stringify(jsonObject);
			console.log(jsonData)

			postData(urlServer, jsonData)

				.then(() => {
					statusImg.setAttribute('src', messageFromSend.ok)
					statusText.textContent = messageFromSend.success
				})

				.catch(() => {
					statusImg.setAttribute('src', messageFromSend.fail)
					statusText.textContent = messageFromSend.failure
				})
				.finally(() => {
					setTimeout(() => {
						clearInputs();
						statusMessage.remove();
						form.style.display = 'block'
						form.classList.remove('fadeOutUp')
						form.classList.add('fadeInUp')
					}, 4000);
				})
		})
	})
}
