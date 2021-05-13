// 进行原生promise演示
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