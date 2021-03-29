
// let a = Object.create({x: 1})
// console.log(a) // {}
// let {...b} = Object.create({x: 1}) // 解构无法继承原型链
// console.log(a.x) // 1
// console.log(b.x) // undefined



/**
 * 实现一个Object.create
 * new F().__proto__ => F.prototype => proto
 * 
 */

// Object.prototype.create = function (proto, propertiesObject) {
//   function F () {}
//   F.prototype = proto
//   return new F()
// }

// const Person = {
//   name: 'jiang',
//   sayHello: function () {
//     console.log(this.name)
//   }
// }
// Person.sayHello() // jiang
// const p1 = Object.create(Person, {
//   name: {
//     configurable: false,
//     enumerable: false,
//     get: () => {
//       return this.value
//     },
//     set: (newValue) => {
//       this.value = newValue
//     }
//   }
// })
// console.log(p1)
// p1.name = 'tlp'
// p1.sayHello() // tan

// function Animal () {
//   this.name = 'Tlp'
// }
// Animal.prototype.sayHello = function () {
//   console.log(this.name)
// }
// function Dog (age) {
//   Animal.call(this) // 执行父类的构造函数
//   this.age = age
// }
// // Dog.prototype -> {} -> {}.__proto__ -> Animal.prototype
// Dog.prototype = Object.create(Animal.prototype)
// Dog.prototype.behavior = function () {
//   console.log(`我是一只${this.name}, 我会吠`)
// }
// const d1 = new Dog()
// d1.behavior() // Tlp
// d1.sayHello() // 我是一只Tlp, 我会吠
// console.log(d1 instanceof Dog) // true
// console.log(d1 instanceof Animal) // true
