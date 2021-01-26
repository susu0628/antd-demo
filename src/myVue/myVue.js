function observe (data) { // 监听器 利用Object.defineProperty() 来监听每个数据的变动
  if (!data || typeof data !== 'object') {
    return 
  }
  Object.keys(data).map((key) => {
    defineReactive(data, key, data[key])
  })
}
function defineReactive (data, key, value) {
  observe(value)
  const dep = new Dep()
  Object.defineProperty(data, key, {
    get: () => {
      console.log('target', Dep.target)
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set: (newVal) => {
      if (newVal === value) return
      console.log('监听了' + newVal) // 可以监听到数据的变化，所以在这里可以通知订阅者数据变化了
      value = newVal
      dep.notify()
    }
  })
}
// var data = {
//   name: 'jiang'
// }
// observe(data)
// data.name = 'tan'
// data.name = 'tlp'
// console.log(data.name)

// 消息订阅器 -- 维护一个数组，用来收集所有的订阅者
function Dep () {
  this.subs = []
}
Dep.prototype = {
  addSub: (sub) => {
    (this.subs || []).push(sub)
  },
  notify: () => {
    console.log('subs', this)
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null
// 实现订阅者
function Watcher (vm, key, cb) {
  this.vm = vm
  this.key = key
  this.cb = cb
  this.value = this.get() 
}
Watcher.prototype = {
  update: () => {
    this.run()
  },
  run: () => {
    var value = this.vm.data[this.key];
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  get: function() {
    Dep.target = this;  // 缓存自己
    var value = this.vm.data[this.key]  // 强制执行监听器里的get函数
    Dep.target = null;  // 释放自己
    return value;
  }
}
function myVue (data, el, key) {
  this.data = data
  observe(data)
  console.log('el', el, key, data[key], data.name)
  el.innerHTML = this.data.key
  new Watcher(this, key, (val) => { // name属性 就是这里的订阅器，
    console.log('val', val)
    el.innerHTML = val
  })
  return this
}