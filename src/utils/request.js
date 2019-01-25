import axios from 'axios';

const CODE_OK = 200;

const request = axios.create({
  timeout: 5000,
  params: {},
  _loading: false // 是否显示loading
});

request.interceptors.request.use(
  config => {
    // config._loading

    return config;
  },
  err => {
    Promise.reject(err);
  }
);

request.interceptors.response.use(
  res => {
    // res.config._loading

    // success
    if (res.data.code === CODE_OK) {
      return res.data;
    }

    return Promise.reject(res.data);
  },
  err => {
    // err.config._loading

    return Promise.reject(err);
  }
);

export default request;
