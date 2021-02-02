// function Person(firstName, lastName) {
//   this.firstName = firstName
//   this.lastName = lastName
// }

// const lydia = new Person('Lydia', 'Hallie')
// const sarah = Person('Sarah', 'Smith') // 没有返回值得函数，执行后输出undefined

// console.log(lydia) // Person {firstName: 'Lydia', lastName: 'Hallie'}
// console.log(sarah) // undefined


function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
/**
 * 从js原型链角度看
 * getFullName是Person这个function变量的一个属性，而member是new出来的对象，其__proto__属性是Person.prototype。
 * 调用member的getFullName方法，先从member身上找，找不到就去member.__proto__也就是Person.prototype上去找，然而找不到
 * so 会抛出异常 TypeError member.getFullName is not a function
 */
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}

console.log(member.getFullName()); // TypeError member.getFullName is not a function
console.log(Person.getFullName()); // undefined undefined