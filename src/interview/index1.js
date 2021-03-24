var a = {
  i: 1,
  valueOf: function () {
    console.log(this.i)
    return ++this.i
  }
}
if (a == 2 && a == 3) {
  console.log('123')
} else {
  console.log('234')
}