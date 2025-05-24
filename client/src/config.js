const BASE_FETCH_URL = window.location.protocol === 'https:' 
    ? 'https://adriandeharo.es:8001/api' 
    : 'http://adriandeharo.es:8001/api';

export const config = {
  BASE_FETCH_URL
};
