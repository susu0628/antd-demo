// 自定义的promise

/**
 * Promise 是一个拥有then方法的对象或函数，其行为符合promise/A+规范
 * 1. 接收一个函数(executor), 该函数接收两个参数resolve(成功的回调) 和 resolve(失败的回调)
 * 2. Promise有三个状态，且一旦从pending变为了fulfilled 或 rejected的任何一个，都不可再次更改了
 *    pending    等待态
 *    fulfilled  成功态
 *    rejected   失败态
 * 3. Promise有一个then方法，里面有两个可选参数：onFulfilled, onRejected, 且必须返回一个Promise对象
 */
class Promise {
  constructor (executor) {
    // Promise初始话的状态
    this.state = 'pending';
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    // 存储成功的回调函数
    this.onResolvedCallbacks = [];
    // 存储失败的回调函数
    this.onRejectedCallback = [];
    // 成功的回调
    let resolve = (value) => {
      if (this.state === 'pending') {
        this.value = value;
        this.state = 'fulfilled';
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach((fn) => {
          fn()
        })
      }
    };
    // 失败的回调
    let reject = (reason) => {
      if (this.state === 'pending') {
        this.reason = reason
        this.state = 'rejected'
        this.onRejectedCallback.forEach((fn) => {
          fn()
        })
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err)
    }
  }
  then (onFulFilled, onRejected) {
    /**
     * onFulFilled 和 onRejected是可选参数，当未传递的时候，我们需做默认处理 透传
     */
    if (typeof onFulFilled !== 'function') {
      onFulFilled = () => {
        return this.value
      }
    }
    if (typeof onRejected !== 'function') {
      onRejected = () => {
        throw this.reason
      }
    }
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        let x = onFulFilled(this.value)
        resolvePromise(promise2, x, resolve, reject)
      }
      if (this.state === 'rejected') {
        let x = onRejected(this.reason)
        resolvePromise(promise2, x, resolve, reject)
      }
      /**
       * ###考虑到异步的情况，当执行到then的时候，可能我们的状态还是pending
       * 此时我们应该将成功和失败的回调存储到各自的数组,一旦reject或resolve的时候，就调用数组里的回调函数
       */
      if (this.state === 'pending') {
        this.onRejectedCallback.push(() => {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        })
        this.onResolvedCallbacks.push(() => {
          let x = onFulFilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        })
      }
    })
    return promise2
  }
}
/**
 * 判断x的函数
 * 1. 首先，要看x是不是promise
 * 2. 如果是promise，则取它的结果，作为新的promise2成功的结果
 * 3. 如果是普通值，直接作为promise2成功的结果
 * 4. resolvePromise的参数有promise2（默认返回的promise）、x（我们自己return的对象）、resolve、reject
 */
function resolvePromise (promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      if (typeof x.then === 'function') {
        console.log(222, x)
        x.then((y) => {
          resolvePromise(promise2, y, resolve, reject)
        }, (err) => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      reject(e)
    }
  } else {
    resolve(x)
  }
}

// 测试
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 500);
}).then((value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value + '23')
    }, 2000);
  })
}).then((value) => {
  console.log('then2', value)
})