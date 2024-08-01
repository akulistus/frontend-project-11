import axios from 'axios';
import proxify from './proxify';

const requestRSS = (url) => {
  const proxiedUrl = proxify(url);
  return axios.get(proxiedUrl)
    .then((response) => response.data)
    .catch(() => {
      throw new Error('networkError');
    });
};

export default requestRSS;
