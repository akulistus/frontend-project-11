import axios from "axios";

const requestRSS = (url) => {
  return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
    .then((response) => response.data)
    .catch(() => {
      throw new Error('error4');
    });
};

export { requestRSS };