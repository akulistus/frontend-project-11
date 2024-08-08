import createCard from './createCard';
import createElement from './createElement';

const renderPosts = (state, i18nextInstance) => {
  const posts = document.querySelector('.posts');
  const mainUl = posts.querySelector('ul');
  if (!mainUl) {
    const postCard = createCard('Посты');
    posts.appendChild(postCard);
  }
  const newPosts = state.posts;

  const postsLi = newPosts.reduce((acc, cur) => {
    const classes = ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0'];
    const postLi = createElement('li', classes);

    const a = document.createElement('a');
    a.href = cur.link;
    a.dataset.id = cur.id;

    if (!state.uiState.seenPosts.has(cur.id)) {
      a.classList.add('fw-bold');
    } else {
      a.classList.add('fw-normal');
    }

    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = cur.title;

    const button = createElement('button', ['btn', 'btn-outline-primary', 'btn-sm']);
    button.type = 'button';
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#modal';
    button.dataset.id = cur.id;
    button.textContent = i18nextInstance.t('button');

    postLi.replaceChildren(a, button);
    acc.push(postLi);
    return acc;
  }, []);
  posts.querySelector('ul').replaceChildren(...postsLi);
};

export default renderPosts;
