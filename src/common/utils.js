export function getSearchParams(location) {
  try {
    return new URLSearchParams(location.search);
  }
  catch (e) {
    return { get() {} }
  }
}

export function getSearchParam(location, param) {
  return getSearchParams(location).get(param);
}
