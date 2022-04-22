// import AjaxService from '../ajax.service'
// // import envConfig from '@env-config'
// export default {
//   // 登录接口
//   loginIn(params) {
//     return AjaxService.request({
//       url: '/api/operation/login',
//       method: 'post',
//       params
//     })
//   },
//   // 登出接口
//   loginOut(token) {
//     return AjaxService.request({
//       url: `/api/operation/login_out?token=${token}`,
//       method: 'get'
//     })
//   },
//   // 上传图片接口
//   uploadImage(params) {
//     return AjaxService.request({
//       url: `/api/api_sources/add`,
//       method: 'post',
//       params,
//       options: {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         processData: false
//       }
//     })
//   }
// }
