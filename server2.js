import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// get the current module's directory path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// write, read , append and delete this text to `message.txt`
const filePath = path.join(PATH, 'message.txt');
const messageToSave = `Hello there,\nwelcome to Node.js `;

// write
fs.writeFile(filePath, messageToSave, 'utf-8', (err) => {
    if (err) {
        console.log('there is an error', err);
    } else {
        console.log('file saved success');
    }
});
// read
/*
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
        console.log('there is an error ', err);
    } else {
        console.log(data);
    }
});
*/
// append
/*
fs.appendFile(filePath, messageToSave, 'utf-8', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('data append success');
    }
});
*/
// open, read , close

// unlink
/*
fs.unlink(filePath, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('this file has deleted');
    }
});

*/
