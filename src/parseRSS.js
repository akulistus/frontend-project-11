const parseRSS = (content) => {
  // general return struct
  // const data = {
  //   feed: {
  //     id: null,
  //     title: '',
  //     description: '',
  //   },
  //   posts: [],
  // };

  // general post structure
  // const post = {
  //   id: null,
  //   title: '',
  //   link: '',
  //   description: '',
  //   seen: false,
  // };

  const parser = new DOMParser();
  const html = parser.parseFromString(content, 'text/html');

  let feedTitle;
  let feedDescription;
  let feedItems;
  try {
    feedTitle = html.querySelector('title').innerText;
    feedDescription = html.querySelector('description').innerHTML;

    feedItems = html.querySelectorAll('item');
  } catch (e) {
    throw new Error('notValidRSS');
  }
  const posts = [];
  feedItems.forEach((item) => {
    const uniqueId = Math.random() * 1000;
    const postTitle = item.querySelector('title').textContent;
    const postDescription = item.querySelector('description').innerHTML;
    const postLink = item.querySelector('guid').textContent;
    posts.push({
      id: uniqueId,
      title: postTitle,
      description: postDescription,
      link: postLink,
    });
  });

  return {
    feed: {
      title: feedTitle,
      description: feedDescription,
    },
    posts,
  };
};

export default parseRSS;
