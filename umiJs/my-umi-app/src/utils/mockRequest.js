/*
  封装axios
    1. 定义公共的请求地址前缀
      抽取公共代码：请求地址前缀
    2. 发送请求，自动携带公共参数
      抽取公共代码：自动携带公共参数
    3. 响应数据 - 直接就是需要data数据
    4. 响应状态码200只能代表响应成功，并不能代表功能成功：
      例如：登录功能
        登录成功和登录失败，响应状态码都是200
      功能是否成功，看响应数据中的code
        code200代表功能成功，非200功能失败  

      最终目的：then方法得到的就是功能成功，catch方法得到的就是功能失败
    5. 错误提示更加友好
    6. 请求进度条提示

    axios拦截器：
      - 请求拦截器
      - 响应拦截器

    工作流程：请求拦截器 - 发送请求 - 响应拦截器 - then/catch
      默认：请求拦截器只会触发成功的回调 
              --> 发送请求
                --> 根据响应状态码来触发响应拦截器
                  --> 响应状态码2xx   触发响应拦截器成功回调
                  --> 响应状态码非2xx 触发响应拦截器失败回调
                    --> 看响应拦截器成功、失败回调的返回值决定 then/catch 触发
                      --> 如果函数报错了、返回了一个失败的Promise对象，触发catch
                      --> 没有就触发then


    请求拦截器：做一些公共的事情
      1. 发送请求，自动携带公共参数
    响应拦截器
      1. 响应数据 - 直接就是需要data数据
      2. then方法得到的就是功能成功，catch方法得到的就是功能失败
      3. 错误提示更加友好
*/

import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 去掉圈圈
NProgress.configure({ showSpinner: false });

// 简单：创建axios的实例，实例和axios功能基本一致
const request = axios.create({
  baseURL: '/mock', // 基础路径，发送请求地址组成：（baseURL + url）
  timeout: 10000, // 请求的超时时间，超过多久响应还没回来，就自动中断
});

const errorMessages = {
  401: '未授权',
  403: '禁止访问',
  404: '资源找不到',
  500: '服务器内部错误',
};

// 设置拦截器
// 请求拦截器
request.interceptors.request.use(
  // 成功回调（默认触发）
  config => {
    // config就是请求配置对象：里面包含请求地址、请求参数、请求头等请求信息
    NProgress.start(); // 进度条开始
    // 添加公共请求参数
    config.headers.token = 'token~~~';

    // 必须返回config，返回的config就是发送请求的配置对象
    return config;
  },
  // 失败回调（通常不会触发）
  // () => {}
);
// 响应拦截器
request.interceptors.response.use(
  // 成功回调（响应状态码2xx）
  response => {
    // 响应数据 - 直接就是需要data数据
    NProgress.done(); // 进度条结束
    // 判断功能是否成功
    console.log(response);
    if (response.data.code === 200) {
      // 没有返回Promise，默认就是成功状态 --> 触发then
      return response.data;
    }

    // 功能失败
    // 返回失败的Promise --> 触发catch
    return Promise.reject(response.data.message || '功能失败了~');
  },
  // 失败回调（响应状态码非2xx）
  error => {
    console.log(error); // timeout
    NProgress.done(); // 进度条结束

    if (error.response) {
      return Promise.reject(errorMessages[error.response.status] || '未知错误，请联系管理员解决');
    }

    // 响应没有回来，以下错误，都是响应没有返回导致的错误
    if (error.message.indexOf('timeout') > -1) {
      // return Promise.reject("网络超时");
      return Promise.reject('您的网速太慢，请打开Wifi试试~');
    } else if (error.message.indexOf('Network Error') > -1) {
      return Promise.reject('断网了，请重新打开网络试试');
    } else {
      return Promise.reject('未知错误，请联系管理员解决');
    }
  },
);

export default request;
