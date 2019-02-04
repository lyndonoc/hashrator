export const isMobile = () => {
  const match = window.matchMedia || window.msMatchMedia;
  return match && match('(pointer:coarse)')
    ? match('(pointer:coarse)').matches
    : false;
};
