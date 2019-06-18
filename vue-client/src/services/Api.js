import axios from 'axios'
import store from '../store'
const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Authorization: `Bearer ${store.state.token}`
  }
})
export default instance
