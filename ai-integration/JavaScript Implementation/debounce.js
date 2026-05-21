function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const fn = debounce((search) => {
  console.log("hello", search);
}, 1000);

fn("A");
fn("B");
fn("C");
