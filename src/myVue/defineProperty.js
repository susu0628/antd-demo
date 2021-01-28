let obj = {
  name: 'jiang'
}
Object.defineProperty(obj, 'name', {
  configurable: true, // 能否被删除 默认为false
  enumerable: true, // 能否枚举
  get: () => {
    return val
  },
  set: (newVal) => {
    console.log('监听了' + newVal)
    this.val = newVal
  }
})
obj.name = 'susu' // 监听了susu