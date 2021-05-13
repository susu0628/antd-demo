// console.log(a)
// let a = 123
// console.log(b)

// {
//   let a = 1
// }
// console.log(a) // a is not defined
// {
//   var b = 2
// }
// console.log(b) // 2

// var txt = '外部'
// function test () {
//   console.log(txt) // 外部
//   if (false) {
//     let txt = '内部'
//   }
// }
// test()

// for (var i = 0; i <= 5; i++) {
//   setTimeout(() => {
//     console.log(i) // 6个6
//   }, 1000);
// }

// let 块级作用域
// {
//   (function () {
//     var a = 1
//     console.log('内部', a)
//   })();
//   console.log('外部', a)
// }


// function MyLet(value) {
//   var i = value;
//   return () => {
//     console.log(i) // 23
//     return i
//   }
// }
// {
//   var a = MyLet(23)()
//   console.log(a) // 23
// }
// console.log(a) // 23
function _const (key, value) {
  window[key] = value
  Object.defineProperty(window, key, {
    enumerable: false,
    configurable: false,
    get: function () {
      return value
    },
    set: (newValue) => {
      if (newValue !== value) {
        throw TypeError('只读变量，不可修改')
      } else {
        value = newValue
      }
    }
  })
}
