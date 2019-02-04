export const encodeqs = (obj) => {
  return '?' + Object
    .keys(obj)
    .map((key) => {
      return `${key}=${obj[key]}`;
    })
    .join('&');
};
