const checkObjProps = (obj = {}, props = []) => {
  let target = obj;

  for (let i = 0; i < props.length; i++) {
    if (!target.hasOwnProperty(props[i])) {
      return false;
    }
    target = target[props[i]];
  }

  return target;
};

const mapObjToProps = (obj = {}, mappings = {}, mapper = checkObjProps) => {
  return Object.keys(mappings).reduce(
    (acc, value) => ({
      ...acc,
      [value]: mapper(obj, mappings[value]),
    }),
    {},
  );
};

module.exports = {
  checkObjProps,
  mapObjToProps,
};
