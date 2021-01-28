// 观察者模式

// 观察者
function DownLoadTask (id) {
  this.id = id
  this.url = ''
}
DownLoadTask.prototype.finish = function (url) {
  this.url = url
  console.log('Task' + this.id + ':' + this.url)
}

// 主题对象 / 被观察目标
function DataHub () {
  this.downloadTasks = []
}
DataHub.prototype.add = function (task) {
  this.downloadTasks = this.downloadTasks.concat(task)
}
DataHub.prototype.notify = function (url) {
  this.downloadTasks.map((item) => {
    item.finish(url)
  })
}
const dataHub = new DataHub()
const task1 = new DownLoadTask(1)
const task2 = new DownLoadTask(2)
dataHub.add(task1)
dataHub.add(task2)
dataHub.notify('http://www.baidu.com')


