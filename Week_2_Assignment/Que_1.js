let arr=[1,2,2,3,4,5]
let ans=new Set();

let left=0;
let right=arr.length-1;
const target=5;

while (left<right){
    tempSum=arr[left]+arr[right];
    if (tempSum===target){
        ans.add([left,right].join(','));
        left+=1;
    }
    else if (tempSum>target){
        right-=1;
    }
    else{
        left+=1;
    }
}
console.log(ans);


