// 发布订阅模式
// 发布者 / 被观察目标 
function DataHub () {}
DataHub.prototype.notify = function (url, callback) {
  callback(url)
}

// 第三方  根据事件名来联系，匹配上后直接执行对应的订阅者方法即可
function DownloadManager () {
  this.events = {}  // {key: value} key为事件名 value是一个数组
  this.uid = -1
}
// 发布 传入事件名以及参数url
DownloadManager.prototype.publish = function (eventType, url) {
  if (!this.events[eventType]) {
    return false
  }
  var subscribers = this.events[eventType] || []
  subscribers.map((sub) => {
    sub.handler(sub.taskId, url) // 事件名匹配上之后，只需执行对应的订阅者方法即可
  })
}
// 订阅 传入事件名 以及触发的方法 
DownloadManager.prototype.subscribe = function (eventType, handler) {
  if (!this.events[eventType]) {
    this.events[eventType] = []
  }
  var taskId = (++this.uid).toString()
  this.events[eventType].push({  // 存入events对象对应的事件名下面
    taskId,
    handler
  })
}
var dataHub = new DataHub() // 发布者
var downloadManager = new DownloadManager() // 第三方实例

// 订阅者
var dataLoader = function (taskId, url) {
  console.log('Task' + taskId + ':' + url)
}
var downloadTask1 = downloadManager.subscribe('dataReady', dataLoader) // 订阅
var downloadTask2 = downloadManager.subscribe('dataReady', dataLoader)
var downloadTask3 = downloadManager.subscribe('dataReady', dataLoader)
dataHub.notify('http://www.baidu.com', function (url) {
  downloadManager.publish('dataReady', url) // 发布者发布方法
})
// 参考: 观察者和发布订阅模式有什么不同： https://www.zhihu.com/question/23486749
// 观察者模式vs订阅模式：https://zhuanlan.zhihu.com/p/51357583