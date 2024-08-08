import i18n from 'i18next';
import { setLocale } from 'yup';
import onChange from 'on-change';

import { app, checkRssForUpdates } from './app';
import resources from './locales/index';
import render from './renderer';

const initApp = () => {
  setLocale({
    string: {
      url: 'notValidLink',
    },
    mixed: {
      notOneOf: 'RSSAleradyExists',
    },
  });

  const state = {
    uiState: {
      status: 'input', // processing, success, error
      errorMessage: null,
      seenPosts: new Set(),
      currentPostId: null,
    },
    feeds: [],
    posts: [],
  };

  const i18nextInstance = i18n.createInstance();

  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  }).then(() => {
    const watchedState = onChange(state, (path, value, prevValue) => {
      render(path, value, prevValue, i18nextInstance, state);
    });

    app(watchedState);
    checkRssForUpdates(watchedState);
  });
};

export default initApp;
