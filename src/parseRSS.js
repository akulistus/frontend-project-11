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

  let title;
  let description;
  let items;
  try {
    title = html.querySelector('title').innerText.replace('<![CDATA[', '').replace(']]>', '');
    description = html.querySelector('description').innerHTML.replace('<!--[CDATA[', '').replace(']]-->', '');

    items = html.querySelectorAll('item');
  } catch (e) {
    throw new Error('error3');
  }
  const posts = [];
  items.forEach((item) => {
    const uniqueId = Math.random() * 1000;
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').innerHTML;
    const link = item.querySelector('guid').textContent;
    posts.push({
      id: uniqueId,
      title,
      description,
      link,
    });
  });

  return {
    feed: {
      title,
      description,
    },
    posts,
  };
};

export default parseRSS;
