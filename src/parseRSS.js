import Random from "./randomId";

const random = new Random(5);

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

  // post obj structure
  // const post = {
  //   id: null,
  //   title: '',
  //   link: '',
  //   description: ''
  // };

  const parser = new DOMParser();
  const html = parser.parseFromString(content, 'text/html');

  const id = random.getNext();
  const title = html.querySelector('title').textContent;
  const description = html.querySelector('description').textContent;

  const items = html.querySelectorAll('item');
  const posts = [];
  items.forEach((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').innerHTML;
    const link = item.querySelector('guid').textContent;
    posts.push({
      title,
      description,
      link,
    });
  });

  return {
    feed: {
      id,
      title,
      description,
    },
    posts,
  };
};

export { parseRSS };