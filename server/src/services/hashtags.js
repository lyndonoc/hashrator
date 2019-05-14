import config from '../config';
import { encodeqs } from '../lib/querystring';
import { get } from './request';

export const getHashTags = (query, options = {}) => {
  const url = `${config.SERVICE_URL}/hashtags/${query}${encodeqs(options)}`;

  return get(url).then((response) => response.json());
};
