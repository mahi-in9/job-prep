function setCount(a) {
  return (a = a);
}

let count = 3;

console.log(setCount((c) => c + 1, count));
