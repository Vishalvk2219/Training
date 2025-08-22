let s='sstringgstrings';

let seen = new Set();
// let ans=[];
let ans=0
let startPointer=0;
for (let i=0;i<s.length;i++){
    if (seen.has(s[i])){
        // ans.push(s.slice(startPointer,i));
        if (i-startPointer>ans){
            ans=i-startPointer;
        }
        startPointer=i;
        seen.clear()
        seen.add(s[i])
    }
    else{
        seen.add(s[i]);
    }
}

console.log(ans);