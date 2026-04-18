
function print() {
  let count = 3;
  const intrval = setInterval(()=>{
    console.log("hello")
    count--;
    if(count === 0) clearInterval(intrval)
  }, 1000)
}
print()