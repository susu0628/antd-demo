class Promise {
  constructor(exactor) {
    this.value = undefined;
    this.reason = undefined;
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    this.state = Promise.PENDING
    this.resolve = (value) => {
      if (this.state === Promise.PENDING) {
        this.value = value
        this.state = Promise.FULFILLED
        this.resolveCallbacks.forEach((fn) => {
          fn()
        })
      }
    };
    this.reject = (reason) => {
      if (this.state === Promise.PENDING) {
        this.reason = reason
        this.state = Promise.REJECTED
        this.rejectCallbacks.forEach((fn) => {
          fn()
        })
      }
    };
    try {
      exactor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err)
    }
  }
  then(onResolved, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === Promise.FULFILLED) {
        let value = onResolved(this.value)
        console.log('then', promise2)
        Promise.resolvePromise(promise2, value, resolve, reject)
      }
      if (this.state === Promise.REJECTED) {
        let value = onRejected(this.reason)
        Promise.resolvePromise(promise2, value, resolve, reject)
      }
      if (this.state === Promise.PENDING) {
        this.resolveCallbacks.push(() => {
          let value = onResolved(this.value)
          Promise.resolvePromise(promise2, value, resolve, reject)
        })
        this.rejectCallbacks.push(() => {
          let value = onRejected(this.reason)
          Promise.resolvePromise(promise2, value, resolve, reject)
        })
      }
    })
    return promise2
  }
}
Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'
Promise.resolve = (value) => {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}
Promise.reject = (err) => {
  return new Promise((resolve, reject) => {
    reject(err)
  })
}
Promise.race = (promiseArray) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArray.length; i++) {
      promiseArray[i].then((value) => {
        resolve(value)
      })
    }
  })
}
Promise.all = (promiseArray) => {
  return new Promise((resolve, reject) => {
    let allData = []
    let length = 0;
    const getPromiseAllData = (index, value) => {
      allData[index] = value
      ++length
      if (length === promiseArray.length) {
        resolve(allData)
      }
    }
    for (let i = 0; i < promiseArray.length; i++) {
      promiseArray[i].then((value) => {
        getPromiseAllData(i, value)
      }, (err) => {
        reject(err)
      })
    }
  })
}
Promise.resolvePromise = (promise2, value, resolve, reject) => {
  if (value === promise2) {
    reject(new TypeError('Chaining cycle detected for promise'))
  }
  if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
    try {
      if (typeof value.then === 'function') {
        value.then((y) => {
          Promise.resolvePromise(promise2, y, resolve, reject)
        }, (e) => {
          reject(e)
        })
      }
    } catch(err) {
      reject(err)
    }
  } else {
    resolve(value)
  }
  
}
// 测试
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000);
}).then((value1) => {
  console.log('value1', value1)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 800);
  })
}).then((value2) => {
  console.log('value2', value2)
})
Promise.resolve(3).then((value) => {
  console.log('resolve', value)
})
Promise.reject('XXX').then(null, (error) => {
  console.log('reject', error)
})

// 测试race
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('500ms')
  }, 500);
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('800ms')
  }, 800);
})
Promise.race([p2, p1]).then((value) => {
  console.log('race', value)
})

// 测试all
Promise.all([p2, p1]).then((all) => {
  console.log('all', all)
})