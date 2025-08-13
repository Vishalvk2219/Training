function celsiusToFahrenheit(){
    celsius = prompt('Enter Temperature in Celsius');
    let Fahrenheit = (celsius* 9/5)+32;
    document.getElementById('temp').innerText=`${celsius} celsius in Fahrenheit is ${Fahrenheit} `;
}

function factorial(){
    factorialNumber= parseInt(prompt('Enter Number to get its factorial'),10);
    if (isNaN(factorialNumber)) {
        alert("Please enter a valid number!");
    } else {
    ans=1
    for (let i=1; i<=factorialNumber;i++){
        ans *= i;
    }
    document.getElementById('factorial').innerText=ans;
    }
}


function greetWithNameAge(){
    let name=prompt('Enter your Name');
    let age=prompt('Enter you Age');

    document.getElementById('greetMain').innerText=`Hello ${name}, you are ${age} years old`;
}

    
