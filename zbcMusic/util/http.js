import {
  config
} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误'
}

class HTTP {
  request({
    url,
    data = {},
    method = 'GET'
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url,
      method,
      data,
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        if (res.data.code == config.resCode) {
          resolve(res.data)
        } else {
          reject()
          this._show_error(1)
        }
      },
      fail: (err) => {
        reject(err)
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }

}

export { HTTP }