// Will work only in HTML

/* 
let name=prompt('Enter your Name');
alert('hello,'+name);
*/

function greet(){
    let name = prompt("What is your name?");
    
    if (name !== null && name.trim() !== "") {
        let ans="Hello, " + name + "!"
      alert(ans);
      document.getElementById('greet').innerText=ans
    } else {
      alert("You didn't enter your name.");
    }
}


let name='String';
let age=28;
let salary=50000.00;
let human=true;

console.log(typeof(name));
console.log(typeof(age));
console.log(typeof(salary))
console.log(typeof(human))


let a=50;
let b=25;

console.log('Multiply',a*b);
console.log('Divide',a/b);
console.log('Modulus',a%b);
console.log('Subtraction',a-b);
