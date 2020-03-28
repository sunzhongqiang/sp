import { get, payload, deleteUrl, post } from '@/lib/baseapi'
export default class BaseApi {
  constructor(path) {
    this.path = path;
  }

  query(params) {
    return get(this.path, params)
  }
  loadData(page) {
    return this.query({ page })
  }
  save(data) {
    return payload(this.path, data)
  }
  find(id) {
    return get(`${this.path}/${id}`)
  }
  delete(id) {
    return deleteUrl(`${this.path}/${id}`)
  }
  toggle(id) {
    return post(`${this.path}/toggle/${id}`)
  }

  post(url, data) {
    return post(url, data)
  }

  get(url, params) {
    return get(url, params)
  }
}
