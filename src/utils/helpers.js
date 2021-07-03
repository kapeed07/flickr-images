export const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const get = (object, pathString, defaultValue) => {
  // Coerce pathString to a string (even it turns into "[object Object]").
  var parts = (pathString + '').split('.');
  var length = parts.length;
  var i = 0;

  // In case object isn't a real object, set it to undefined.
  var value = object === Object(object) ? object : undefined;

  while (value != null && i < length) {
    value = value[parts[i++]];
  }
  return i && i === length && value !== undefined && value !== null
    ? value
    : defaultValue;
};
