import services from '@services/home';

export default {
  namespace: 'pageModel', //命名约定
  state: {
    title: "Welcome to Wise.Wrong's Bolg",
    name: 'wise',
  },

  effects: {
    //Action 处理器，处理异步动作，基于 Redux-saga 实现。Effect 指的是副作用。根据函数式编程，计算以外的操作都属于 Effect，典型的就是 I/O 操作、数据库读写。
    // call: 执行异步函数
    // put: 发出一个 Action，类似于 dispatch
    // select: 返回 model 中的 state
    *testEffect({ payload }, { call, put, select }) {
      // 获取 state 中的值
      const { name } = yield select(state => state.pageModel);
      // 接口入参
      const params = { name, ...payload };
      console.log(params);
      const { data } = yield call(services.getHomeTitle);
      console.log(data);
      //请求成功之后，调用 reducer 同步方法更新 state
      yield put({
        // 调用当前 model 的 action 不需要添加 namespace
        type: 'changeTitle',
        payload: data,
      });
    },
  },
  reducers: {
    //调用方法 里面传入新值和旧值两个参数，只有调用reducers中的方法才能更新state中的数据
    changeTitle(state, { payload }) {
      return {
        ...state,
        title: payload,
      };
    },
  },
};
