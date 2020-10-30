//main for calculator module

const calculator = require('./calculator')

const testFunc = () => {
  let a = 3
  let b = 2

  console.log(calculator.add(a,b));
  console.log(calculator.substract(a,b));
  console.log(calculator.multiply(a,b));
  console.log(calculator.divide(a,b));
}

testFunc();