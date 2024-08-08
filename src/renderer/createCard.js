import createElement from './createElement';

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

export default createCard;
