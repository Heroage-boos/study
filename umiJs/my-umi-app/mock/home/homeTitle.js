import Mock from 'mockjs';

//mock课程数据
var result = Mock.mock('/api/mock/homeTitle', 'get', {
  title: '@ctitle', //模拟中文标题
  name: '天下一品',
});

export default result;
