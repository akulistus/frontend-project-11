import createCard from './createCard';
import createElement from './createElement';

const renderFeeds = (value) => {
  const feeds = document.querySelector('.feeds');
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
};

export default renderFeeds;
