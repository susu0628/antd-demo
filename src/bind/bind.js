var name = 'jiang'
function sayHello () {
  console.log(`hello ${this.name}`)
}
sayHello()
let obj1 = { name: 'tan' }
let obj2 = { name: 'xiao' }
sayHello.call(obj1)
sayHello.apply(obj2)

setTimeout(() => {
  sayHello()
}, 1000);
