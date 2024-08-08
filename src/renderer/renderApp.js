const renderApp = (state, i18nextInstance) => {
  const input = document.querySelector('input');
  const submitButton = document.querySelector('button[aria-label="add"]');
  const form = document.querySelector('form');
  const feedback = document.querySelector('.feedback');
  if (state.uiState.status !== 'processing') {
    submitButton.disabled = false;
    input.disabled = false;
  }
  switch (state.uiState.status) {
    case 'processing':
      submitButton.disabled = true;
      input.disabled = true;
      break;
    case 'success':
      input.classList.remove('is-invalid');
      feedback.classList.replace('text-danger', 'text-success');
      feedback.textContent = i18nextInstance.t('success');
      form.reset();
      input.focus();
      break;
    case 'error':
      input.classList.add('is-invalid');
      feedback.classList.replace('text-success', 'text-danger');
      feedback.textContent = i18nextInstance.t(`errors.${state.uiState.errorMessage}`);
      break;
    default:
      throw new Error('unknownError');
  }
};

export default renderApp;
