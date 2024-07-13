const render = (state) => {
	const input = document.querySelector('input');
	const form = document.getElementById('form');
	if (state.validInput) {
		input.classList.remove('is-invalid');
		form.reset();
		input.focus();
	} else {
		input.classList.add('is-invalid');
	}
};

export { render };