let arr=[4,1,2,3,1];
let ans=[]

function multiply(tempArray){
    let tempProduct=1;
    for (let o=0;o<tempArray.length;o++){
        tempProduct*=tempArray[o];
    }
    return tempProduct;
}

for (let i=0;i<arr.length;i++){
    ans.push(multiply(arr.slice(0,i))*multiply(arr.slice(i+1,arr.length)))
}

console.log(ans)