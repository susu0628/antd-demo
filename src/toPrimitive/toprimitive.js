
// let a = 1 + [1, 2]
// console.log([1, 2].valueOf()) // [1, 2]
// console.log([1, 2].toString()) // 1, 2
// console.log(a)  // 11, 2

// let b = 1 + {c: 1}
// console.log(b) // 1[object, object]

// let d = 1 - [1, 2]
// console.log(d) // NaN

// let e = 1 - {f: 1}
// console.log(e) // NaN

// let g = 1 * [1, 2]
// console.log(g) // NaN

// let a = 42
// let b = [42]
// console.log(a == b) // true

// var c = "abc"
// var d = Object(c) // 类似new String(c) "abc"
// console.log(c == d) // true

// var e = null
// var f = Object(e) // 类似Object() {}
// console.log(e == f) // false

// var g = undefined
// var h = Object(g) // 类似Object() {}
// console.log(g == h) // false

// var i = NaN
// var j = Object(i) // new Nubmer(i) NaN
// console.log(i == j) // false  NaN == NaN 

// let m = new String("abc")
// let n = Object("abc")

// console.log(typeof m, typeof n) // "object" "object"
// console.log(m instanceof String, n instanceof String) // true true
// // "[object, String]" "[object String]"
// console.log(Object.prototype.toString.call(m), Object.prototype.toString.call(n))
// alert([1, 2])

// let a = [1, 2, 3]
// a.valueOf = function () {
//   return 'hello' // 返回的是基本类型
// }
// console.log(a.toString()) // "1, 2, 3"
// let c = {}
// c[a] = 234
// console.log(c) // {"1, 2, 3": 234}

var date = new Date()
console.log(date.valueOf())
console.log(date.toString())
console.log(+ date)