// let me = {
//   name: 'tom',
//   age: '12',
//   gender: 'F'
// }
// me[Symbol.iterator] = function () {
//   var nextIndex = 0
//   let keys = Object.keys(me)
//   return {
//     next: () => {
//       if (nextIndex < keys.length) {
//         return {
//           value: keys[nextIndex++],
//           done: false
//         }
//       }
//       return {
//         done: true
//       }
//     }
//   }
// }

// for (let key of me) {
//   console.log(key)
// }



let generate = function* () {
  yield 1
  yield 2
  yield 3
}

let func = generate()
console.log(func.next().value)
console.log(func.next().value)
console.log(func.next().value)