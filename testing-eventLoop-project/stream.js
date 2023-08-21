const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // Solution 1
    // fs.readFile('test-file.txt', (err, data) => { // read the whole file and keep the 'data' variable in the computer memory
    //     if(err) console.log(err);
    //     res.end(data);
    // });

    // Solution 2
    // 
    
    // Solution 3
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
})

server.listen(8000,'127.0.0.1', () => {
    console.log('Listen...');
})