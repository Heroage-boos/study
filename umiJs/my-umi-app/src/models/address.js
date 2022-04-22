// import services from '@services/home';
import { requestApi } from '../utils/requestApi';
import services from '@services/home';

export default {
  namespace: 'pageAddress', //命名约定
  state: {
    id: '1',
  },
  //   effects: {
  //     *testEffect(action, { call, put, select }) {
  //       yield requestApi(call, services[action.strUrl], action);
  //     },
  //   },
  effects: {
    testEffect: (action, { call, put, select }) =>
      requestApi(call, services[action.strUrl], action),
  },
};
