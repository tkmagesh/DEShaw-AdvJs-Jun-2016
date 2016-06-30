let Employee = (function(){
  let idSymbol = Symbol(),
    nameSymbol = Symbol(),
    salarySymbol = Symbol();
  class Employee{
     constructor(id, name, salary){
        this[idSymbol] = id;
        this[nameSymbol] = name;
        this[salarySymbol] = salary;
     }  
     get id(){
        console.log('returning id');
        return this[idSymbol];
     }
     set id(value){
        if (value < 0) return;
        this[idSymbol] = value;
     }
     display(){
         console.log(this[idSymbol], this[nameSymbol], this[salarySymbol]);
     }
     static isEmployee(obj){
         return obj instanceof Employee;
     }
  }
  return Employee;
})();