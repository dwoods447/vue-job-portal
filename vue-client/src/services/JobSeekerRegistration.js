import Api from './Api'

export default {
  register (a) {
    return Api.post('/jobseeker/register', a)
  }
}
