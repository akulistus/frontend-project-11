import { createElement } from "./createElement";

const render = (originPath, value, prevValue, i18nextInstance, state) => {
  // получим имя измененного параметра для вложенных структур
  const input = document.querySelector('input');
  const submitButton = document.querySelector('button[aria-label="add"]');
  const form = document.querySelector('form');
  const feedback = document.querySelector('.feedback');
  const posts = document.querySelector('.posts');
  const feeds = document.querySelector('.feeds');
  switch (originPath) {
    case 'uiState.status': {
      if (value !== 'processing') {
        submitButton.disabled = false;
        input.disabled = false;
      }
      if (value === 'success') {
        input.classList.remove('is-invalid');
        feedback.classList.replace('text-danger', 'text-success');
        feedback.textContent = i18nextInstance.t('success');
        form.reset();
        input.focus();
      } else if (value === 'error') {
        input.classList.add('is-invalid');
        feedback.classList.replace('text-success', 'text-danger');
        feedback.textContent = i18nextInstance.t(`errors.${state.uiState.errorMessage}`);
      } else if (value === 'processing') {
        submitButton.disabled = true;
        input.disabled = true;
      }
      break;
    }
    case 'uiState.currentPostId': {
      const post = state.posts.find((item) => item.id.toString() === value);
      document.querySelector('.modal-title').textContent = post.title;
      document.querySelector('.modal-body').textContent = post.description;
      document.querySelector('.full-article').href = post.link;
      break;
    }
    case 'feeds': {
      const mainUl = feeds.querySelector('ul');
      if (!mainUl) {
        const feedCard = createCard('Фиды');
        feeds.appendChild(feedCard);
      }
      const newFeed = value.at(-1);
      const feedLi = createElement('li', ['list-group-item', 'border-0', 'border-end-0']);

      const feedTitle = createElement('h3', ['h6', 'm-0']);
      const feedDesc = createElement('p', ['m-0', 'small', 'text-black-50']);
      feedTitle.textContent = newFeed.title;
      feedDesc.textContent = newFeed.description;

      feedLi.replaceChildren(feedTitle, feedDesc);
      feeds.querySelector('ul').prepend(feedLi);
      break;
    }

    case 'posts': {
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

        const button = document.createElement('button', ['btn', 'btn-outline-primary', 'btn-sm']);
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
      break;
    }

    case 'uiState.seenPosts': {
      value.forEach((id) => {
        const link = document.querySelector(`a[data-id="${id}"]`);
        link.classList.replace('fw-bold', 'fw-normal');
      });
      break;
    }
  }
};

const createCard = (name) => {
  const card = createElement('div', ['card', 'border-0']);
  const cardBody = createElement('div', ['card-body']);
  const cardTitle = createElement('h2', ['card-title', 'h4']);
  const ul = createElement('ul', ['list-group', 'border-0', 'rounded-0']);
  cardTitle.textContent = name;

  cardBody.appendChild(cardTitle);
  card.replaceChildren(cardBody, ul);
  return card;
};

export default render;
