/**
 * debounce 防抖
 * @param {function} fn
 * @param {number} delay 毫秒
 */
export function debounce(func, delay) {
  let timer;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * throttle 节流
 * @param {function} fn
 * @param {number} delay 毫秒
 */
export function throttle(fn, delay) {
  let ctx;
  let args;
  let timer;
  let now;
  let previous;

  const execute = function() {
    fn.apply(ctx, args);
    previous = now;
  };

  return function() {
    ctx = this;
    args = arguments;
    now = Date.now();

    if (timer) {
      clearTimeout(timer);
    }

    const diff = now - (previous + delay);

    if (previous) {
      if (diff >= 0) {
        execute();
      } else {
        timer = setTimeout(execute, -diff);
      }
    } else {
      execute();
    }
  };
}

/**
 * 获取 query
 * @param {String} name
 */
export function getQueryString(name) {
  const res = location.search.match(
    new RegExp('[?&]' + name + '=([^&]+)', 'i')
  );

  if (res == null || res.length < 1) {
    return null;
  }

  return res[1];
}

/**
 * 去除首尾空格
 * @param {String} str
 */
export function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

/**
 * 打乱数组
 * @param {Array} array
 */
export function shuffle(array) {
  const items = array.slice();
  let t, r, i;

  for (i = items.length - 1; i > 0; i--) {
    r = Math.round(Math.random() * i);

    t = items[i];
    items[i] = items[r];
    items[r] = t;
  }

  return items;
}

export function getCookie(name) {
  name = name + '=';
  const cookies = document.cookie.split('; ');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];

    if (cookie.indexOf(name) === 0) {
      return decodeURIComponent(cookie.slice(name.length));
    }
  }

  return null;
}
