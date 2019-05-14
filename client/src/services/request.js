import queryString from 'query-string';
import url from 'url';

export const get = (endpoint, options = {}) => {
  return requestWithOptions(
    endpoint,
    {
      ...options,
      method: 'GET'
    }
  );
};

export const put = (endpoint, options = {}) => {
  return requestWithOptions(
    endpoint,
    {
      ...options,
      method: 'PUT'
    }
  );
};

export const post = (endpoint, options = {}) => {
  return requestWithOptions(
    endpoint,
    {
      ...options,
      method: 'POST'
    }
  );
};

export const restDelete = (endpoint, options = {}) => {
  return requestWithOptions(
    endpoint,
    {
      ...options,
      method: 'DELETE'
    }
  );
};

export const requestWithOptions = (endpoint, options = {}) => {

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  const req = new Request(
    endpoint,
    {
      ...options,
      headers,
    }
  );

  return fetch(req)
    .then((resp) => {
      if (resp.redirected) {
        const urlParsed = url.parse(resp.url);
        const redirectUrl = `${urlParsed.protocol}//${urlParsed.host}${urlParsed.pathname}`;
        let qs = queryString.parse(urlParsed.search);
        qs.redirect = window.location.href;
        qs = queryString.stringify(qs);
        window.location.href = `${redirectUrl}?${qs}`;
      } else {
        return resp;
      }
    })
    .catch((err) => console.log(`Failed while fetching from endpoint '${endpoint}'`, err));
};

export default {
  get,
  put,
  post,
  restDelete
};
