import Api from './Api'

export default {
  register (a) {
    return Api.post('/employer/register', a)
  }
}
