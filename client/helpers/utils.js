export function throttle(fn, delay=1000) {
  let flag = false;

  return (...args) => {
    if (!flag) fn(...args);
    flag = true;

    setTimeout(() => {
      flag = false;
    }, delay);
  }
}

export function debounce(fn, delay=1000) {
  let timeout = null;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args)
    }, delay);
  }
}