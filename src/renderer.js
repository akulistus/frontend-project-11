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
        const feedCard = document.createElement('div');
        feedCard.classList.add('card', 'border-0');
        const feedCardBody = document.createElement('div');
        feedCardBody.classList.add('card-body');
        const feedCardTitle = document.createElement('h2');
        feedCardTitle.classList.add('card-title', 'h4');
        feedCardTitle.textContent = 'Фиды';
        const feedUl = document.createElement('ul');
        feedUl.classList.add('list-group', 'border-0', 'rounded-0');

        feedCardBody.appendChild(feedCardTitle);
        feedCard.replaceChildren(feedCardBody, feedUl);
        feeds.appendChild(feedCard);
      }
      const newFeed = value.at(-1);
      const feedLi = document.createElement('li');
      feedLi.classList.add('list-group-item', 'border-0', 'border-end-0');

      const feedTitle = document.createElement('h3');
      const feedDesc = document.createElement('p');
      feedTitle.classList.add('h6', 'm-0');
      feedTitle.textContent = newFeed.title;
      feedDesc.classList.add('m-0', 'small', 'text-black-50');
      feedDesc.textContent = newFeed.description;

      feedLi.replaceChildren(feedTitle, feedDesc);
      feeds.querySelector('ul').prepend(feedLi);
      break;
    }

    case 'posts': {
      const mainUl = posts.querySelector('ul');
      if (!mainUl) {
        const postCard = document.createElement('div');
        postCard.classList.add('card', 'border-0');
        const postCardBody = document.createElement('div');
        postCardBody.classList.add('card-body');
        const postCardTitle = document.createElement('h2');
        postCardTitle.classList.add('card-title', 'h4');
        postCardTitle.textContent = 'Посты';
        const postUl = document.createElement('ul');
        postUl.classList.add('list-group', 'border-0', 'rounded-0');

        postCardBody.appendChild(postCardTitle);
        postCard.replaceChildren(postCardBody, postUl);
        posts.appendChild(postCard);
      }
      const newPosts = state.posts;

      const postsLi = newPosts.reduce((acc, cur) => {
        const postLi = document.createElement('li');
        postLi.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

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

        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
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
    // default: {
    //   throw new Error('unknownError');
    // }
  }
};

export default render;
