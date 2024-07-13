const render = (path, value, i18nextInstance) => {
	const input = document.querySelector('input');
	const form = document.querySelector('form');
  const feedback = document.querySelector('.feedback');
	switch (path) {
		case 'errors':
      if (value === '') {
        input.classList.remove('is-invalid');
        feedback.textContent = '';
        form.reset();
        input.focus();
      } else {
        input.classList.add('is-invalid');
        feedback.textContent = i18nextInstance.t(`errors.${value}`);
      }
      break;
    case 'error':

	}
};

export { render };