class Promise {
  constructor (fn) {
    this.cb = []
    this.state = 'pending'
    this.val = ''
    fn(this._resolve.bind(this), this._reject.bind(this)) // 将resolve函数当作参数传出
  }
  then (onFulfilling, onRejected) { // 注册异步操作完成后的onFulfilling
    return new Promise((resolve, reject) => {
      this._handle({
        onFulfilling: onFulfilling || null,
        onRejected: onRejected || null,
        resolve,
        reject
      })
    })
  }
  catch (onError) {
    return this.then(null, onError)
  }
  finally (onDone) {
    if (typeof onDone !== 'function') {
      return this.then()
    }
    let Promise = this.constructor
    return this.then((value) => {
      return Promise.resolve(onDone()).then(() => {
        return value
      })
    }, (reason) => {
      return Promise.resolve(onDone()).then(() => {
        throw reason
      })
    })
  }
  _handle (callback) {
    if (this.state === 'pending') { // 在resolve之前， 跟之前的逻辑一样，添加到cb中
      this.cb.push(callback)
      return
    }
    let cb = this.state === 'fulfilling' ? callback.onFulfilling : callback.onRejected
    if (!cb) {
      cb = this.state === 'fulfilling' ? callback.resolve : callback.reject
      cb(this.val)
      return 
    }
    let ret
    try {
      ret = cb(this.val)
      cb = this.state === 'fulfilling' ? callback.resolve : callback.reject
    } catch (error) {
      cb = callback.reject
    } finally {
      cb(ret)
    }
  }
  _resolve (val) {
    if (val && (typeof val === 'object' || typeof val === 'function')) {
      // console.log(val)
      var then = val.then
      if (typeof then === 'function') {
        then.call(val, this._resolve.bind(this), this._reject.bind(this))
        return 
      }
    }
    this.state = 'fulfilling'
    this.val = val
    this.cb.forEach((callback) => {
      this._handle(callback)
    })
  }
  _reject (error) {
    this.state = 'rejected'
    this.val = error
    this.cb.forEach((callback) => {
      this._handle(callback)
    })
  }
}

const mockAjax = (url, s, callback) => {
  setTimeout(() => {
    callback(url + '异步请求耗时' + s + '秒')
  }, 1000*s);
}
const p = new Promise ((resolve,reject) => {
  // setTimeout(() => {
    console.log('done')
    // resolve('2s')
    reject('error')
  // }, 2000);
}).then((tip) => {
  console.log('tip1', tip)
  // return '3s'
  return new Promise((resolve) => {
    resolve('3s')
  })
}, (error) => {
  console.log('error', error)
}).finally(() => {
  console.log('tip2')
  return '4s'
})