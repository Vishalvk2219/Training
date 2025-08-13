function oddOrEven(){
    let num=document.getElementById('num');
    if (num % 2 === 0){
        document.getElementById('oe').innerText='Even';
    }
    else{
        document.getElementById('oe').innerText='Odd';
    }
}


function oneTwoTwenty() {
    const container = document.getElementById('onTwoTwenty');
    container.textContent = ''; 
    let nums = '';
    
    for (let i = 1; i <= 20; i++) {
        nums += i + ' ';
    }
    
    container.textContent = nums.trim(); 
}


function table(){
    const container = document.getElementById('table');
    let tableNumber = parseInt(document.getElementById('tab').value, 10);
    container.textContent='';
    let ans='';
    for (let i=1; i<=10; i++){
        ans +=  (i*tableNumber) + ' '
    }
    container.textContent = ans.trim()
}


