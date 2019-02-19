import request from '@/utils/request';

export function getBanners() {
  return request({
    url: '/api/banner'
  });
}

export function getDiscs() {
  return request({
    url: '/api/personalized'
  });
}
