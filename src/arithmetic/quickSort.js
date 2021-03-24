/**
 * 快速排序 -- 双数组
 * 实现思路：
 * 1. 选定一个pivot中心轴，在这里我们选择数组的第一个元素
 * 2. 将大于pivot的值放入right数组中
 * 3. 将小于pivot的值放入left数组中
 * 4. 分别对左右子序列重复前三步操作
 */
function quickSort1 (arr) {
  let pivot = arr[0]
  let left = []
  let right = []
  if (arr.length <= 1) { // 当数组的的元素只有一个的时候，不再进行递归了，此时需要跳出循环
    return arr
  }
  for (let i = 1; i < arr.length; i ++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort1(left).concat(pivot, quickSort1(right))
}
let arr = [5, 1, 3, 8, 9, 2, 12]
console.log(quickSort1(arr))


/**
 * 快速排序 -- 双指针
 */
function quickSort2 (arr, low = 0, high = arr.length - 1) {
  if (low >= high) {
    return
  }
  let pivot = arr[low]
  let start = low
  let end = high
  while (start < end) {
    if (arr[end] < pivot) {
      console.log(1);
      [arr[start], arr[end]] = [arr[end], arr[start]]
      // arr[start] = arr[end] // 这种方法会造成死循环
      start ++
    }
    if (arr[end] >= pivot) { // 需加上等于的情况，这样上面的方法就不会造成死循环了
      console.log(2)
      end --
    }
    if (arr[start] > pivot) {
      console.log(3);
      [arr[start], arr[end]] = [arr[end], arr[start]]
      // arr[end] = arr[start]
      end --
    }
    if (arr[start] <= pivot) {
      console.log(4)
      start ++
    }
  }
  console.log(start, end)
  quickSort2(arr, low, start - 1)
  quickSort2(arr, end + 1, high)
  return arr
}
let arr2 = [5, 1, 3, 8, 9, 2, 12]
console.log(quickSort2(arr2))