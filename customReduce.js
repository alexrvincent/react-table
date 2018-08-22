

// const customReduce = (arr, callback, startingValue) => {

//     // Clean up the input!

//     const gaveArray = Array.isArray(arr);
//     const gaveFunction = (typeof callback === 'function')
//     const gaveNumber = !isNaN(startingValue);

//     if(!gaveArray || !gaveFunction || !gaveNumber ) {
//         throw TypeError("Invalid argument type");
//     }

//     let accValue = startingValue;

//     for(let item in arr) {
//         accValue = callback(arr[item], accValue);
//     }

//     return accValue;
// }

const customReduceAsync= (arr, callback, startingValue) => {

    // Clean up the input!

    const gaveArray = Array.isArray(arr);
    const gaveFunction = (typeof callback === 'function')
    const gaveNumber = !isNaN(startingValue);

    if(!gaveArray || !gaveFunction || !gaveNumber ) {
        throw TypeError("Invalid argument type");
    }

    let accValue = startingValue;

    for(let item in arr) {
        accValue = callback(arr[item], accValue);
    }

    return accValue;
}

console.log(customReduceAsync(
    [   () => {
            new Promise().resolve(1).then(value => value);
        },
    ], (a, b) => a + b, 0));


