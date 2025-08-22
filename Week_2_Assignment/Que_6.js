let s = "(())))))";

let open = s.split("(").length - 1;
let close = s.split(")").length - 1;

console.log(Math.abs(open - close));
