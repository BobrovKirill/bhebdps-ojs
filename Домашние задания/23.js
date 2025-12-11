const exampleObject = {
    items: [
        {
            child: {
            colors: [
                { name: 'red' },
                { name: 'green' }
            ]
                }
            }
        ]
};
console.log(getValueByPath(exampleObject, "items.0.child.colors.1.name")); // "green"
console.log(getValueByPath(exampleObject, "items.0.child.colors.0")); // "{ name: 'red' }"
function getValueByPath(object, path) {
    // const items = path.split('.');
    // let result = object

    // for (let i = 0; i < items.length; i++) {
    //     const item = items[i];
    //
    //     if (result[item]) {
    //         result = result[item];
    //     } else {
    //         return null
    //     }
    // }
    //
    // const items = path.split('.');
    // const item = items.shift();
    //
    // if (!path) {
    //     return object
    // }
    //
    // if (!object[item]) {
    //     return null
    // }
    //
    // return getValueByPath(object[item], items.join('.'));
}

/**
 * Дан массив. Отсортируйте нечётные по значению числа по возрастанию,
 * а чётные оставьте на своих местах
 */
// function oddSort(array) {
//     const filterArray = array.filter(item => item % 2).sort((a, b) => a - b);
//
//     return array.map(item => {
//         if (!(item % 2)) {
//             return item;
//         }
//
//         return filterArray.shift()
//     });
// }
// // [ 2, 1, 3, 4, 6, 5, 7, 8, 9 ]
// console.log(oddSort([ 2, 3, 7, 4, 6, 1, 5, 8, 9 ]));

/*
Напишите функцию, которая находит уникальный элемент в массиве чисел,
где все числа повторяются дважды, за исключением одного.
*/
// function findUniqueElement(arr) {
//     const result = []
//     const obj = arr.reduce((acc, element) => {
//             if (acc[element]) {
//                 acc[element] += 1;
//             } else {
//                 acc[element] = 1;
//             }
//
//             return acc;
//     }, {})
//
//     Object.entries(obj).forEach(([key, value]) => {
//         if (value === 1) {
//             result.push(key);
//         }
//     })
//
//     return result.length ? result : null;
// }
// console.log(findUniqueElement([1, 2, 3, 4, 1, 2, 3])); // [4]
// console.log(findUniqueElement([1, 2, 3, 4, 1, 2, 3, 4])); // []
// console.log(findUniqueElement([1, 2, 3, 1, 2, 3, 4, 5])); // [ 4, 5 ]