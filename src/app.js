import './styles.scss';
import { watchedState, urlChecker } from './state';

const app = () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    urlChecker.isValid(url)
    .then((result, err) => {
      if (result && !watchedState.links.includes(url)) {
        watchedState.links.push(url);
        watchedState.validInput = true;
      } else {
        watchedState.validInput = false;
      }
    });
  });
};

export default app;