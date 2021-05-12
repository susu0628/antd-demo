let arr = [9, 23, 14, 5, 25, 33, 8, 67]
/**
 * 冒泡排序
 */
function bubbling (arr) {
  for (let i = 0; i < arr.length; i ++) {
    for (let j = i + 1; j < arr.length; j ++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  console.log('arr', arr)
  return arr
}
bubbling(arr)
