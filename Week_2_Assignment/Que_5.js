let arr = ["string", "trings", "even", "eveen"];

const dict = new Map();

for (str of arr) {
  const key = str.split("").sort().join("");

  if (!dict.has(key)) {
    dict.set(key, []);
  }
  dict.get(key).push(str);
}

console.log(Array.from(dict.values()));
