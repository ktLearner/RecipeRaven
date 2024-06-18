export function throttle(fn, delay=1000) {
  let timer = null;
  let latestArgs = null;

  return (...args) => {
    let returnValue;

    if (timer !== null) {
      latestArgs = [...args];
      return returnValue;
    }

    returnValue = fn(...args);
    
    timer = setTimeout(() => {
      if (latestArgs !== null) fn(...latestArgs);

      timer = null;
    }, delay);
    
    return returnValue;
  }
}

export function debounce(fn, delay=1000) {
  let timeout = null;

  return (...args) => {
    clearTimeout(timeout);
    let returnValue;

    timeout = setTimeout(() => {
      returnValue = fn(...args);
    }, delay);

    return returnValue;
  }
}

export function imgToObjectURL(imgUrl) {
  const view = new Uint8Array(imgUrl);
  const blob = new Blob([view], {type: "image"});
  const url = URL.createObjectURL(blob);

  return url;
}