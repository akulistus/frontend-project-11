import i18n from 'i18next';
import * as _ from 'lodash';
import { string, setLocale } from 'yup';
import onChange from 'on-change';

import resources from './locales/index';
import render from './renderer';
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

    watchedState.parseProcess.state = 'processing';

    urlChecker.validate(url)
      .then(() => requestRSS(url))
      .then((data) => {
        const { feedTitle, feedDescription, posts } = parseRSS(data.contents);
        posts.forEach((post) => { post.id = _.uniqueId(); });

        watchedState.feeds.push({ feedTitle, feedDescription, link: url });
        watchedState.posts.push(...posts);
        watchedState.parseProcess.error = null;
        watchedState.parseProcess.error = '';
      })
      .catch((err) => {
        watchedState.parseProcess.error = err.message;
      })
      .finally(() => { watchedState.parseProcess.state = 'processed'; });
  });

  const mainContainer = document.querySelector('.container-xxl');
  mainContainer.addEventListener('click', (e) => {
    const { tagName } = e.target;
    if (tagName === 'BUTTON') {
      const { id } = e.target.previousElementSibling.dataset;
      const post = watchedState.posts.find((item) => item.id.toString() === id);
      document.querySelector('.modal-title').textContent = post.title;
      document.querySelector('.modal-body').textContent = post.description;
      document.querySelector('.full-article').href = post.link;
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
  if (links.length) {
    const totalNewEntries = [];
    const promises = links.map((link) => requestRSS(link)
      .then((data) => {
        const rss = parseRSS(data.contents);
        totalNewEntries.push(..._.differenceWith(rss.posts, watchedState.posts, comparator));
      }));

    Promise.all(promises)
      .then(() => {
        if (totalNewEntries.length) {
          watchedState.posts.push(...totalNewEntries);
        }
      })
      .finally(() => {
        setTimeout(() => checkRssForUpdates(watchedState), 5000);
      });
  }
};

const run = () => {
  setLocale({
    string: {
      url: 'notValidLink',
    },
    mixed: {
      notOneOf: 'RSSAleradyExists',
    },
  });

  const state = {
    parseProcess: {
      state: 'processed', // processing
      error: null,
    },
    uiState: {
      seenPosts: new Set(),
    },
    feeds: [],
    posts: [],
  };

  const i18nextInstance = i18n.createInstance();

  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  })
    .then(() => {
      const watchedState = onChange(state, (path, value, prevValue) => {
        render(path, value, prevValue, i18nextInstance, state);
      });

      app(watchedState);
      checkRssForUpdates(watchedState);
    });
};

export default run;
