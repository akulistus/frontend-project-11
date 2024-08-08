const parseRSS = (content) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(content, 'application/xml');
  const errorNode = html.querySelector('parsererror');
  if (errorNode) {
    throw new Error('notValidRSS');
  }

  const title = html.querySelector('title').textContent;
  const description = html.querySelector('description').textContent;
  const rawItems = [...html.querySelectorAll('item')];

  const items = rawItems.map((item) => {
    const itemTitle = item.querySelector('title').textContent;
    const itemDescription = item.querySelector('description').innerHTML;
    const itemLink = item.querySelector('guid').textContent;
    return {
      title: itemTitle,
      description: itemDescription,
      link: itemLink,
    };
  });

  return {
    title,
    description,
    items,
  };
};

export default parseRSS;
