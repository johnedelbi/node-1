import dotenv from 'dotenv';
import http from 'http';
import requestHandler from './routes.js';

dotenv.config();

const PORT = process.env.PORT || 3005;
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log('we are listen to the server ...');
});
