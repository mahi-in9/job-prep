

const sum = (...args) => {
    let values = args;
    let res = values.reduce((acc, a)=> acc+a, 0)
    return res;
}

console.log(sum(3,4, 7 , 8))
