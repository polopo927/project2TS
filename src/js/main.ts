import { modals, sliders, formsFeedback, mask, checkNameInputs, checkEmailInputs, showMoreStyles, calc, filter, imgSize, accordion, burger, scrolling, drop } from './modules/'
window.addEventListener('DOMContentLoaded', () => {
	modals();
	sliders({
		slides: '.feedback-slider-item',
		direction: 'horizontal',
		prev: '.main-prev-btn',
		next: '.main-next-btn'
	});
	sliders({
		slides: '.main-slider-item',
		direction: 'vertical',
		prev: '.main-prev-btn',
		next: '.main-next-btn'
	});
	formsFeedback();
	mask('[name="phone"]');
	checkNameInputs('[name="name"]');
	checkEmailInputs('[name="email"]');
	showMoreStyles('.button-styles', '#styles .row')
	calc({
		size:'#size',
	material:'#material',
	options:'#options',
	promocode:'.promocode',
	result:'.calc-price'
	})
	imgSize('.sizes-block')
	filter()
	accordion('.accordion-heading'/* , '.accordion-block' */)
	burger('.burger', '.burger-menu')
	scrolling('.pageup')
	drop()
})