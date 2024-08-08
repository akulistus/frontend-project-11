import * as _ from 'lodash';
import { string } from 'yup';

import requestRSS from './requestRSS';
import parseRSS from './parseRSS';

import './styles.scss';

const app = (watchedState) => {
  const form = document.getElementById('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const urlChecker = string().url().notOneOf(watchedState.feeds.map((feed) => feed.link));
    const formData = new FormData(e.target);
    const url = formData.get('url');

    watchedState.uiState.status = 'processing';

    urlChecker.validate(url)
      .then(() => requestRSS(url))
      .then((data) => {
        const { title, description, items } = parseRSS(data.contents);
        items.forEach((post) => { post.id = _.uniqueId(); });

        watchedState.feeds.push({ title, description, link: url });
        watchedState.posts.push(...items);
        watchedState.uiState.errorMessage = '';
        watchedState.uiState.status = 'success';
      })
      .catch((err) => {
        watchedState.uiState.errorMessage = err.message;
        watchedState.uiState.status = 'error';
      });
  });

  const mainContainer = document.querySelector('.container-xxl');
  mainContainer.addEventListener('click', (e) => {
    const { tagName } = e.target;
    if (tagName === 'BUTTON') {
      const { id } = e.target.previousElementSibling.dataset;
      watchedState.uiState.currentPostId = id;
      watchedState.uiState.seenPosts.add(id);
    } else if (tagName === 'A') {
      const { id } = e.target.dataset;
      watchedState.uiState.seenPosts.add(id);
    }
  });
};

const comparator = (value, otherValue) => {
  const v1 = _.omit(value, ['id']);
  const v2 = _.omit(otherValue, ['id']);
  return _.isEqual(v1, v2);
};

const checkRssForUpdates = (watchedState) => {
  const links = watchedState.feeds.map((feed) => feed.link);
  const promises = links.map((link) => requestRSS(link)
    .then((data) => {
      const rss = parseRSS(data.contents);
      return _.differenceWith(rss.posts, watchedState.posts, comparator);
    }));

  Promise.all(promises)
    .then((values) => {
      if (values.flat().length) {
        watchedState.posts.push(...values.flat());
      }
    })
    .finally(() => {
      setTimeout(() => checkRssForUpdates(watchedState), 5000);
    });
};

export { app, checkRssForUpdates };
