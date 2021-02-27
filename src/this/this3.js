// var a = 2
// function foo () {
//   // "use strict"
//   console.log(this.a) // 只有在非严格模式下，this才能默认绑定到全局对象中
// }
// foo() // 直接使用不带任何修饰的函数引用进行调用，因此只能使用默认绑定，无法应用其他规则

// function foo () {
//   console.log(this.a)
// }
// // function bindFoo () {
// //   return foo.apply(obj)
// // }
// function bind (fn, obj) { // es5中的bind方法
//   return function () {
//     fn.apply(obj, arguments)
//   }
// }
// var obj = {
//   a: 'a',
//   // foo: bind(foo, obj)
// }
// // var bar = obj.foo
// var bar = bind(foo, obj)
// var a = 'window a'
// bar()
function foo (el) {
  console.log(el, this.id)
}
var obj = {
  id: 'awesome'
};
[1, 2, 3].forEach(foo, obj) // foo不可用箭头函数