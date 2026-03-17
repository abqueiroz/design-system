import fs from 'fs';
const content = fs.readFileSync('REFACTOR.MD', 'utf8');
console.log('CONTENT_START');
console.log(content);
console.log('CONTENT_END');
