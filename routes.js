import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// get the current module's directory path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);
const filePath = path.join(PATH, 'formSubmitText.txt');

const sendResponse = (resObject) => {
    resObject.res.setHeader(resObject.headerType, resObject.headerValue);
    resObject.res.statusCode = resObject.code;
    if (resObject.writeContent) {
        resObject.res.write(resObject.writeContent);
    }
    return resObject.res.end();
};

const requestHandler = (req, res) => {
    //get the url and method from the request
    const { url, method } = req;
    if (url === '/') {
        sendResponse({
            res: res,
            code: 200,
            headerType: 'Content-Type',
            headerValue: 'text/html',
            writeContent: `
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
                </html>`
        });
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
                sendResponse({
                    res: res,
                    code: 400,
                    headerType: 'Location',
                    headerValue: '/',
                    writeContent: 'the submitted data is empty'
                });
            } else {
                fs.writeFile(filePath, onlyData, 'utf-8', (err) => {
                    if (err) {
                        console.log('there is an error', err);
                    } else console.log('data stored success');
                    //redirect the user the / directory
                    sendResponse({
                        res: res,
                        code: 302,
                        headerType: 'Location',
                        headerValue: '/'
                    });
                });
            }
        });
    } else {
        sendResponse({
            res: res,
            code: 400,
            headerType: 'Location',
            headerValue: '/',
            writeContent: 'route not found please check the url'
        });
    }
};

export default requestHandler;
