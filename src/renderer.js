const render = (path, value, prevValue, i18nextInstance) => {
	const input = document.querySelector('input');
	const form = document.querySelector('form');
  const feedback = document.querySelector('.feedback');
  const posts = document.querySelector('.posts');
  const feeds = document.querySelector('.feeds');
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
    case 'contents':
      if (!prevValue.length) {
        const postsUl = document.createElement('ul');
        const feedsUl = document.createElement('ul');
      }

	}
};

export { render };