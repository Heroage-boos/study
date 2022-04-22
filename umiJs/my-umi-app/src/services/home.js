// import mockRequest from '../utils/mockRequest';
import axios from 'axios';

export default {
  //获取home页标题改变的接口
  getHomeTitle() {
    return axios({
      url: '/api/mock/homeTitle',
      method: 'get',
    });
  },
  //获取address页面
  getHomeAddress() {
    return axios({
      url: '/api/mock/homeAddressList',
      method: 'get',
    });
  },
};
