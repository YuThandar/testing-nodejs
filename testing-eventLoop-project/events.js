const EventEmitter = require('events');
const http = require('http');

const server = http.createServer(); //creating the server

server.on('request', (req,res) => { // listening the request
    console.log('request received');
    console.log(req.url);
    res.end('Request Received');
});

server.on('request', (req,res) => {
    console.log('Another Request');
});

server.on('close', () => {
    console.log('Server Close, You are Offline');
});

server.listen(8000, '127.0.01', () => { // listening the server
    console.log('Waiting For Request...');
});

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
    console.log('There was a new sale');
});

myEmitter.on('newSale', () => {
    console.log('Customer Name: John');
});

myEmitter.on('newSale', stock => {
    console.log(`Ther are now ${stock} items left the stock`);
});

myEmitter.emit('newSale', 5);