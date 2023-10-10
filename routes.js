import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// get the current module's directory path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);
const filePath = path.join(PATH, 'message2.txt');

const requestHandler = (req, res) => {
    //get the url and method from the request
    const { url, method } = req;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                </head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="text">
                        <button  type="submit">Send to server</button>
                    </form>
                </body>
                </html>
        `);
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const formData = [];
        //listen to the data event
        req.on('data', (chunk) => {
            formData.push(chunk);
        });
        req.on('end', () => {
            const stringFormData = Buffer.concat(formData).toString();
            console.log(stringFormData);
            const onlyData = stringFormData.split('=')[1];
            console.log(onlyData);
            fs.writeFile(filePath, onlyData, 'utf-8', (err) => {
                if (err) {
                    console.log('there is an error', err);
                }
                console.log('data stored success');
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
};

export default requestHandler;
