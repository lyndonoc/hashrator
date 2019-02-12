export const encodeqs = (obj) => {
  const querystring = Object
    .keys(obj)
    .map((key) => {
      return `${key}=${obj[key]}`;
    })
    .join('&');

  return querystring
    ? `?${querystring}`
    : '';
};
