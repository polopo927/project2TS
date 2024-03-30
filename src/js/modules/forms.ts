
//функция отправки форм
export const formsFeedback = () => {
	//получаем все формы на странице
	const forms = document.querySelectorAll('form')
	//получаем все поля ввода на странице
	const inputs = document.querySelectorAll('input')
	//получаем поля ввода с name upload
	const inputsUpload = document.querySelectorAll<HTMLInputElement>('[name="upload"]')

	const messageFromSend = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро с Вами свяжемся!',
		failure: 'что-то пошло не так...',
		spinner: '/src/assets/img/spinner.gif',
		ok: '/src/assets/img/ok.png',
		fail: '/src/assets/img/fail.png'
	}

	//создаём асинхронную функцию отправки данных пользователем
	const postData = async (url: string, data: string) => {
		const result = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: data
		})
		return await result.text()
	}

	//функция очистки инпутов 
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

	//функция отображения загруженного пользователем файла
	inputsUpload.forEach(input => {
		input.addEventListener('input', () => {
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
		})
	})

	//перебираем все формы
	forms.forEach(form => {
		//вешаем обработчик события на отправку формы
		form.addEventListener('submit', event => {
			//отключаем обычную работу бразуера, обновление страницы
			event.preventDefault()

			//создаём переменную в которую помещаем новый элемент div
			const statusMessage = document.createElement('div')
			//его стилям присваеваем селектор status(какая-то стилизация)
			statusMessage.classList.add('status')
			//и добавляем этот див в конец родителя
			form.parentNode?.appendChild(statusMessage)

			//добавляем форме стили анимации и исчезновения
			form.classList.add('animated', 'fadeOutUp')
			//и ставим таймер на переключение формы дисплея в none
			setTimeout(() => {
				form.style.display = 'none'
			}, 400)

			//создаём переменную и помещаем в неё новый элемент с тэгом img
			const statusImg = document.createElement('img')
			//получаем атрибут src у этого элемента и присваеваем ему путь который у нас хранится в переменной гифки спинера
			statusImg.setAttribute('src', messageFromSend.spinner)
			//добавляем элементу стили анимации и появления
			statusImg.classList.add('animated', 'fadeInUp')
			//пушим в наш верхний див новую переменную с картинкой
			statusMessage.appendChild(statusImg)

			//создаём переменную в которую помещаем новый элемент div 
			const statusText = document.createElement('div')
			//меняем её текст на сообщение загрузки
			statusText.textContent = messageFromSend.loading
			//и тоже пушим в наш первый новый див
			statusMessage.appendChild(statusText)

			//создаём новую форму
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

			const url = 'https://simple-server-2ow5.onrender.com/api/data'
			postData(url, jsonData)

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
