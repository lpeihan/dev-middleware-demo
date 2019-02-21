import axios from 'axios';

const CODE_OK = 200;

const request = axios.create({
  timeout: 5000,
  params: {},
  _loading: false, // 是否显示 loading
  _toast: true // 报错后是否显示 toast
});

request.interceptors.request.use(
  config => {
    if (config._loading) {}

    return config;
  },
  err => {
    Promise.reject(err);
  }
);

request.interceptors.response.use(
  res => {
    if (res.config._loading) {}

    // success
    if (res.data.code === CODE_OK) {
      return res.data;
    }

    if (res.config._toast) {}

    return Promise.reject(res.data);
  },
  err => {
    if (err.config._loading) {}

    if (err.config._toast) {}

    // 请求超时处理
    if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') > -1) {
      // todo
    }

    return Promise.reject(err);
  }
);

export default request;
