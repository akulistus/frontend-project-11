import renderApp from './renderApp';
import renderFeeds from './renderFeeds';
import renderPosts from './renderPosts';

const render = (originPath, value, prevValue, i18nextInstance, state) => {
  if (originPath === 'uiState.status') {
    renderApp(state, i18nextInstance);
  } else if (originPath === 'uiState.currentPostId') {
    const post = state.posts.find((item) => item.id.toString() === value);
    document.querySelector('.modal-title').textContent = post.title;
    document.querySelector('.modal-body').textContent = post.description;
    document.querySelector('.full-article').href = post.link;
  } else if (originPath === 'feeds') {
    renderFeeds(value);
  } else if (originPath === 'posts') {
    renderPosts(state, i18nextInstance);
  } else if (originPath === 'uiState.seenPosts') {
    value.forEach((id) => {
      const link = document.querySelector(`a[data-id="${id}"]`);
      link.classList.replace('fw-bold', 'fw-normal');
    });
  }
};

export default render;
