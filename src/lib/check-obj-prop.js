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

module.exports = {
  checkObjProps,
};
