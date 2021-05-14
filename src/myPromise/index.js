// 进行原生promise演示
new Promise((resolve, reject) => {
  console.log(234234)
  setTimeout(() => {
    resolve(1)
  }, 500);
}).then((value) => {
  console.log(454545)
  return value + 'then'
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(value + '23')
  //   }, 2000);
  // })
}).then((value) => {
  console.log('then2', value)
})

// 测试resolve
Promise.resolve(2).then((value) => {
  console.log('resolve', value)
})
Promise.reject(2).then((value) => {
  console.log('reject', value)
}, (err) => {
  console.log('error', err)
})