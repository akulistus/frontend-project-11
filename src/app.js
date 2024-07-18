import i18n from 'i18next';
import * as _ from 'lodash';
import { string, setLocale } from "yup";
import onChange from "on-change";

import resources from './locales/index';
import { render } from "./renderer";
import { requestRSS } from './requestRSS';
import { parseRSS } from './parseRSS';

import './styles.scss';

const state = {
  validInput: true,
  links: [],
  feeds: [],
  posts: [],
  error: '',
};

setLocale({
  string: {
    url: 'error1',
  },
});

const urlChecker = string().url().test('is-new', 'error2', (value) => new Promise((resolve) => {
  if (!state.links.includes(value)) {
    resolve(true);
  }
  resolve(false);
}));

const app = (watchedState) => {
  const form = document.getElementById('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const url = formData.get('url');
  
    urlChecker.validate(url)
    .then(() => {
      watchedState.errors = '';
      watchedState.links.push(url);
    })
    .then(() => {
      return requestRSS(url);
    })
    .then((data) => {
      const rss = parseRSS(data.contents);
      watchedState.feeds.push(rss.feed);
      watchedState.posts.push(...rss.posts);
    })
    .catch((err) => {
      watchedState.errors = err.message;
    });
  });

  document.addEventListener('show.bs.modal', (e) => {
    const id = e.relatedTarget.dataset.id;
    const post = watchedState.posts.find((item) => item.id == id);
    e.target.querySelector('.modal-title').textContent = post.title;
    e.target.querySelector('.modal-body').textContent = post.description;
    e.target.querySelector('.full-article').href = post.link;
    post.seen = true;
  });
};

const comparator = (value, otherValue) => {
  const v1 = _.omit(value, ['id', 'seen']);
  const v2 = _.omit(otherValue, ['id', 'seen']);
  return _.isEqual(v1, v2);
}

const checkRssForUpdates = (watchedState) =>{
  if (state.links.length) {
    const totalNewEntries = [];
    const promises = state.links.map((link) => {
      return requestRSS(link)
      .then((data) => {
        const rss = parseRSS(data.contents);
        totalNewEntries.push(..._.differenceWith(rss.posts, state.posts, comparator));
      });
    });

    Promise.all(promises)
    .then(() => {
      if (totalNewEntries.length) {
        watchedState.posts.push(...totalNewEntries);
      }
    })
  }
  setTimeout(() => checkRssForUpdates(watchedState), 5000);
};

const runAsync = async () => {
  const i18nextInstance = i18n.createInstance();

  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  const watchedState = onChange(state, (path, value, prevValue) => render(path, value, prevValue, i18nextInstance, state));

  app(watchedState);
  setTimeout(() => checkRssForUpdates(watchedState), 5000);
};

export default runAsync;