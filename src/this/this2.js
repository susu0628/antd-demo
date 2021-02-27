
function foo (num) {
  console.log('foo:' + num)
  /**
   * 注意this的指向
   * foo(i)调用的时候，this指向window
   * 所以此时this.count ++ 不是在foo.count上加，而是在window中创建了一个全局变量
   */
  // console.log('this', this)
  this.count ++
}
foo.count = 0
var i;
for (i = 0; i < 10; i++) {
  if (i > 5) {
    // foo(i)
    foo.call(foo, i) // 解决方法① 改变this的指向
  }
}
console.log(foo.count) // 0
/**
 * 如何改变这个情形？
 * 改变this的指向
 */
