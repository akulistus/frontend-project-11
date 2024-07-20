import axios from 'axios';

const requestRSS = (url) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
  .then((response) => response.data)
  .catch(() => {
    throw new Error('networkError');
  });

export default requestRSS;
