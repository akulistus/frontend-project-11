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
    case 'feeds': {
      if (!prevValue.length) {
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
      feedDesc.classList.add('m-0','small', 'text-black-50');
      feedDesc.textContent = newFeed.description;

      feedLi.replaceChildren(feedTitle, feedDesc);
      feeds.querySelector('ul').prepend(feedLi);
      break;
    }
    case 'posts': {
      if (!prevValue.length) {
        // create post elements
        const postCard = document.createElement('div');
        postCard.classList.add('card', 'border-0');
        const postCardBody = document.createElement('div');
        postCardBody.classList.add('card-body');
        const postCardTitle = document.createElement('h2');
        postCardTitle.classList.add('card-title', 'h4');
        postCardTitle.textContent = 'Посты';
        const postUl = document.createElement('ul');
        postUl.classList.add('list-group', 'border-0', 'rounded-0');

        // show post elements
        postCardBody.appendChild(postCardTitle);
        postCard.replaceChildren(postCardBody, postUl);
        posts.appendChild(postCard);
      }
      const newPosts = value;

      // create posts values
      const postsLi = newPosts.reduce((acc, cur) => {
        const postLi = document.createElement('li');
        postLi.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

        const a = document.createElement('a');
        a.href = cur.link;
        a.classList.add('fw-bold');
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = cur.title;
        
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        button.textContent = 'Просмотр';

        postLi.replaceChildren(a, button);
        acc.push(postLi);
        return acc;
      }, []);
      posts.querySelector('ul').replaceChildren(...postsLi);
      break;
    }
	}
};

export { render };