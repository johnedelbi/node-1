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

// read

// append

// open, read , close

// unlink
