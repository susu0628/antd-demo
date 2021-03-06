foo() // 打印什么？
var a = true
if (a) {
  function foo () {
    console.log('a')
  }
} else {
  function foo () {
    console.log('b')
  }
}
