let API_HOST

switch (process.env.VUE_APP_ENV) {
  // 测试线上环境
  case 'master':
    API_HOST = '/'
    break
  case 'test':
    API_HOST = ''
    break
  // 本地环境
  default:
    API_HOST = '/manageApi'
    break
}

export default API_HOST
