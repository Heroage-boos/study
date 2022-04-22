export function* requestApi(call, url, action) {
  console.log(call, url, action);
  const result = yield call(url);
  // 真实接口用这个
  // if (result && result.code === 1) {
  //   action.onSuccess(result.data);
  // } else {
  //   action.onFailure(result && result.message);
  // }

  //mock接口用这个;
  if (result && result.status === 200) {
    action.onSuccess(result.data);
  } else {
    action.onFailure(result && result.statusText);
  }
  console.log(result);
}
