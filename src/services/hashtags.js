import config from '../config';
import { encodeqs } from '../lib/querystring';
import { get } from './request';

export const getTopHashtags = (query) => {
  const url = `${config.SERVICE_URL}/hashtags/top/${query}`;

  return get(url).then((response) => response.json());
};

export const getMoreHashtags = (query, options = {}) => {
  const url = `${config.SERVICE_URL}/hashtags/more/${query}${encodeqs(options)}`;

  return get(url).then((response) => response.json());
};
