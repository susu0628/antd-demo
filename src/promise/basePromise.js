class Promise {
  constructor (fn) {
    this.cb = []
    this.state = 'pending'
    this.val = ''
    fn(this._resolve.bind(this)) // 将resolve函数当作参数传出
  }
  then (onFulfilling) { // 注册异步操作完成后的onFulfilling
    if (this.state === 'pending') {
      this.cb.push(onFulfilling)
    } else {
      onFulfilling(this.val)
    }
    // this.cb.push(onFulfilling)
    return this
  }
  _resolve (val) {
    this.state = 'fulfilling'
    this.val = val
    // setTimeout(() => {
      this.cb.forEach((fn) => {
        fn(val)
      })
    // });
  }
}
const p = new Promise ((resolve,reject) => {
  // setTimeout(() => {
    console.log('done')
    resolve('2s')
  // }, 2000);
}).then((tip) => {
  console.log('tip1', tip)
}).then((tip) => {
  console.log('tip2', tip)
})

// setTimeout(() => {
  p.then((tip) => {
    console.log('tip3', tip)
  })
// });