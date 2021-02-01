/**
 * es6中的class
 * 相当于是es5中的动态原型模式
 */

class Person {
  constructor (name) {
    this.name = name // 定义在对象自身上
  }
  sayHello () { // 定义在Person.prototype上
    console.log(`hello ${this.name}`)
  }
}
const p1 = new Person('jiang')
p1.sayHello()

/**
 * new 操作符 + Object创建对象
 */
// const p1 = new Object()
// p1.name = 'jiang'
// p1.sayHello = function () {
//   console.log(`hello ${this.name}`) // this指向p1,所以可以通过this访问到name
// }
// p1.sayHello()

/**
 * 字面量创建对象
 */

//  let p1 = {
//    name: 'tan',
//    sayHello: function () { // 只能为匿名函数，不可用箭头函数，否则this指向window
//      console.log(`hello ${this.name}`)
//    }
//  }
//  console.log(p1.sayHello())

/**
 * 工厂模式
 */

// function createPerson (name) {
//   const o = new Object()
//   o.name = name
//   o.sayHello = function () {
//     console.log(`hello ${this.name}`)
//   }
//   return o
// }
// const p1 = createPerson('jiang') // 无须new  createPerson只是一个普通函数，返回一个对象
// p1.sayHello()
// const p2 = createPerson('tan')
// p2.sayHello()
// console.log(p1 instanceof createPerson) // false 缺点：无法识别p1的类型 只能知道属于Object
// console.log(p1 instanceof Object) //true

/**
 * 构造函数模式
 */

// function Person (name) {
//   this.name = name
//   this.sayHello = function () {
//     console.log(`hello ${this.name}`)
//   }
// }
// const p1 = new Object()
// p1.__proto__ = Person.prototype
// Person.call(p1, 'jiang') // 调用Person函数，this指向p1

// // const p1 = new Person('tan') // 需要new Person是一个构造函数
// p1.sayHello()
// console.log(p1 instanceof Person) // true

// Person.prototype = {
//   sayHello () {
//     console.log(`hello ${this.name}`)
//   }
// }

// function Person (name) {
//   this.name = name // 每个实例自己的属性，放在构造函数中
// }
// Person.prototype = {
//   sayHello: function () {
//     console.log(`hello ${this.name}`)
//   }
// }
// const p1 = new Person('jiang')
// p1.sayHello()
// const p2 = new Person('tan')
// p2.sayHello()