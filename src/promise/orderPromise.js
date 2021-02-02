// setTimeout(function() { 
//   console.log('setTimeout');
// }) 
// new Promise(function(resolve) { 
//    console.log('promise');
//    resolve()
// }).then(function() {
//    console.log('then'); 
// })
// console.log('console');


/**
 * 打印顺序如下
 * promise  console  then  setTimeout
 * 第一轮宏任务执行完之后才会执行微任务  当微任务执行完了之后  继续执行下一轮的宏任务
 * setTimeout 异步宏任务 
 * new Promise()定义后会立即执行 then() 是异步的微任务
 */

// console.log('打印'+1);
// setTimeout(function(){
//   console.log('打印'+2);
// })
// new Promise(function(resolve,reject){
//   console.log('打印'+3);
//   resolve()
// }).then(() => {
//   console.log('打印'+4)
// })
// console.log('打印'+10);
// new Promise(function(resolve,reject){
//   setTimeout(function () {
//     console.log('打印'+5);
//     resolve()  
//   });
//   // resolve()  // 情况1
// }).then(() => { // then方法需要状态变更为resolved或者rejected才会触发
//   console.log('打印'+6);
// })
// setTimeout(function(){
//   new Promise(function(resolve,reject){
//     console.log('打印'+7);
//   });
// })

/**
 * 打印顺序如下
 * 1 3 10 4 6 2 5 7
 * 1 3 10 4 2 5 6 7
 */


Promise.resolve().then(() => {
  console.log('then1')
  Promise.resolve().then(() => {
    console.log('then1-1')
    return Promise.resolve() // promise返回了一个promise，后续微任务会推迟两个微任务进入
  }).then(() => {
    console.log('then1-2')
  })
}).then(() => {
  console.log('then2')
}).then(() => {
  console.log('then3')
}).then(() => {
  console.log('then4')
})
/**
 * 打印顺序如下
 * 1  1-1  2  3  4  1-2
 */