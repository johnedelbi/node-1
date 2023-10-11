import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// get the current module's directory path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);
const filePath = path.join(PATH, 'formSubmitText.txt');

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
    } else if (url === '/message' && method === 'POST') {
        const formData = [];

        //listen to the data event
        req.on('data', (chunk) => {
            formData.push(chunk);
        });
        req.on('end', () => {
            const stringFormData = Buffer.concat(formData).toString();
            const onlyData = stringFormData.split('=')[1];
            if (!onlyData) {
                res.statusCode = 400;
                res.setHeader('Location', '/');
                res.write('the submitted data is empty');
                return res.end();
            } else {
                fs.writeFile(filePath, onlyData, 'utf-8', (err) => {
                    if (err) {
                        console.log('there is an error', err);
                    }
                    console.log('data stored success');
                    //redirect the user the / directory
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                });
            }
        });
    } else {
        res.statusCode = 400;
        res.setHeader('Location', '/');
        res.write('route not found please check the url');
        return res.end();
    }
};

export default requestHandler;
