let arr=[1,4,5,9,6];
let ans=[];
const target = 9;

function sum(tempArray){
    let tempSum=0;
    for (let o=0;o<tempArray.length;o++){
        tempSum+=tempArray[o];
    }
    return tempSum;

}
for (let i=0;i<arr.length;i++){
    for (let j=i;j<arr.length; j++){
        let tempSum=sum(arr.slice(i,j))
        if (tempSum===target){
            ans.push(arr.slice(i,j))
        }
    }
}

console.log(ans.length)
