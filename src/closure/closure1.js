// function foo () {
//   var a = 2;
//   function bar () {
//     console.log(a)
//   }
//   return bar
// }
// var baz = foo()
// baz()


function foo () {
  var a = 1
  a++
  console.log('a', a)
  return function () {
    console.log(a)
  }
}


function foo () {
  var a = 1
  console.log('a', a)
  return function () {
    a++
    console.log(a)
  }
}
const f1 = foo()
f1()
f1()
f1()
f1()
