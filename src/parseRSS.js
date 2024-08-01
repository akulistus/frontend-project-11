const parseRSS = (content) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(content, 'application/xml');
  const errorNode = html.querySelector('parsererror');
  if (errorNode) {
    throw new Error('notValidRSS');
  }

  const feedTitle = html.querySelector('title').textContent;
  const feedDescription = html.querySelector('description').textContent;
  const feedItems = html.querySelectorAll('item');

  const posts = [];
  feedItems.forEach((item) => {
    const postTitle = item.querySelector('title').textContent;
    const postDescription = item.querySelector('description').innerHTML;
    const postLink = item.querySelector('guid').textContent;
    posts.push({
      title: postTitle,
      description: postDescription,
      link: postLink,
    });
  });

  return {
    feedTitle,
    feedDescription,
    posts,
  };
};

export default parseRSS;
