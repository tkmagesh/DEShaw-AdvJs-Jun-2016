import Employee from './Employee.js'

console.log('Welcome to es6');
console.log([10,20,30,40].reduce((n1,n2) => n1 + n2));



let emp = new Employee(100, 'Magesh', 120000)
emp.display();