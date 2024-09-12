
import request from './request'
// import { AxiosResponse } from 'axios'

let base_uri;

class Resource {
  constructor(uri) {
    base_uri = uri
  }

 static list(query) {
    if (query) {
      return request({
        url: `/${base_uri}?${new URLSearchParams(query).toString()}`,
        method: 'get'
      })
    } else {
      return request({
        url: `/${base_uri}`,
        method: 'get'
      })
    }
  }

 static get(id) {
    return request({
      url: `/${base_uri}/${id}`,
      method: 'get'
    })
  }

  static store(resource) {
    return request({
      url: `/${base_uri}`,
      method: 'post',
      data: resource
    })
  }

  static update(resource, id) {
    return request({
      url: `/${base_uri}/${id}`,
      method: 'put',
      data: resource
    })
  }

 static destroy(id) {
    return request({
      url: `/${base_uri}/${id}`,
      method: 'delete'
    })
  }
}

export { Resource as default }
