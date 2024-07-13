import i18n from 'i18next';
import { string, setLocale } from "yup";
import onChange from "on-change";

import resources from './locales/index';
import { render } from "./renderer";

import './styles.scss';

const state = {
  validInput: true,
  links: [],
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
    .then((result) => {
      watchedState.errors = '';
      watchedState.links.push(url);
    })
    .catch((err) => {
      watchedState.errors = err.errors[0];
    });
  });
};

const runAsync = async () => {
  const i18nextInstance = i18n.createInstance();

  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  const watchedState = onChange(state, (path, value) => render(path, value, i18nextInstance));

  app(watchedState);
};

export default runAsync;