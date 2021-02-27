var obj = {
  id: 'aaa',
  cool: function () {
    console.log(this.id)
  }
}
var id = 'bbb'
obj.cool()
setTimeout(obj.cool, 100); // 此时，this的指向是指向window
setTimeout(obj.cool.bind(obj), 100) // 利用bind改变this的指向