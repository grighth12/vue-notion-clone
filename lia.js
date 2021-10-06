const sentence = 'Don\'t dodge, attention please!';
const indexes = [24, 1, 13, 6, 19, 2, 9, 29];

let result = '';
for(let i = 0; i < indexes.length; i++) {
  result += sentence[indexes[i]];
}

console.log(result);
