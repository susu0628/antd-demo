if (!Function.prototype.softBind) {
  Function.prototype.softBind = function (obj) {
    var fn = this
    var args = Array.prototype.slice.call(arguments, 1)
    console.log('arguments', arguments, args)
    var bound = function () {
      return fn.apply((!this || this === (window || global)) ? obj : this, args.concat.apply(args, arguments))
    }
    bound.prototype = Object.create(fn.prototype)
    return bound
  }
}
function foo () {
  console.log(`name ${this.name}`)
}
var obj1 = {name: 'obj1'},
    obj2 = {name: 'obj2'},
    obj3 = {name: 'obj3'}

var fooOBJ = foo.softBind(obj1)
fooOBJ()

obj2.foo = foo.softBind(obj1)
obj2.foo()

fooOBJ.call(obj3)

setTimeout(obj2.foo, 1000);
/**
 * 软绑定
 * 参考：关于js重this的软绑定：https://juejin.cn/post/6844903609126092813
 */
