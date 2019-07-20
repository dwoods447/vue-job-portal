import axios from 'axios'
import store from '../store'
const instance = axios.create({
  baseURL: 'https://vue-job-portal.herokuapp.com',
  headers: {
    Authorization: `Bearer ${store.state.token}`
  }
})
export default instance
