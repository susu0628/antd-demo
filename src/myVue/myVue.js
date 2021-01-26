// 监听器 利用Object.defineProperty() 来监听每个数据的变动
function observe (data, vm) {
  if (!data || typeof data !== 'object') {
    return 
  }
  Object.keys(data).map((key) => {
    defineReactive(vm, key, data[key])
  })
}
function defineReactive (data, key, value) {
  observe(value)
  const dep = new Dep()
  Object.defineProperty(data, key, {
    get: () => {
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

// 消息订阅器 -- 维护一个数组，用来收集所有的订阅者
function Dep () {
  this.subs = []
}
Dep.prototype = {
  addSub: function (sub) {
    (this.subs || []).push(sub)
  },
  notify: function () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null


// 实现订阅者
function Watcher (vm, node, name) {
  Dep.target = this // 缓存自己
  this.vm = vm
  this.node = node
  this.name = name
  this.update()
  Dep.target = null // 释放自己
}
Watcher.prototype = { // 原型中的方法，不可更改为箭头函数，不然this的指向是window，而不是当前构造函数
  update: function () {
    this.get()
    this.node.nodeValue = this.value
  },
  get: function () {
    this.value = this.vm[this.name]
  }
}

// 解析器 解析Dom节点
// 对Dom节点的操作频繁，所以将所有的dom节点存入fragment片段里再进行处理
function nodeToFragment (node, vm) {
  let fragment = document.createDocumentFragment()
  let child = node.firstChild
  while (child) {
    compile(child, vm)
    fragment.appendChild(child)
    child = node.firstChild
  }
  return fragment
}
// 处理每个节点的函数，如果有Input绑定v-model属性或者有{{XXX}}的文本节点出现，就替换vm实例中data中的内容
function compile (node, vm) {
  var reg = /\{\{(.*)\}\}/ // 匹配{{XXX}}中的XXX
  // 元素节点
  if (node.nodeType === 1) {
    let attr = node.attributes
    // 解析元素节点的所有属性
    for (let i = 0; i < attr.length; i++) {
      if (attr[i].nodeName === 'v-model') {
        let name = attr[i].nodeValue
        node.addEventListener('input', function (e) {
          vm[name] = e.target.value
        })
        node.value = vm[name]
        node.removeAttribute('v-model')
      }
    }
  }
  // 文本节点
  if (node.nodeType === 3) {
    console.log('name')
    if (reg.test(node.nodeValue)) {
      let name = RegExp.$1
      name = name.trim()
      // node.nodeValue = vm[name]
      new Watcher(vm, node, name) // 不直接赋值，而是绑定一个订阅者
    }
  }
}


// vue的构造函数
function Vue (options) {
  const {el, data} = options
  this.data = data
  let id = el
  observe(data, this)
  let dom = nodeToFragment(document.getElementById(id), this)
  document.getElementById(id).appendChild(dom)
  return this
}
