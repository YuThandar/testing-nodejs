const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();

crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
});

crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
});

crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
});

crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
});

setTimeout(() => console.log('Timer 1 Finished'),0);

setImmediate(() => console.log('Immediate 1 Finished'));

fs.readFile('test-file.txt', () => {
    console.log('I/O Finished');

    console.log('---------------------------------');
    console.log('Working in the event loop');

    setTimeout(() => console.log('Timer 2 Finished'),0);

    setTimeout(() => console.log('Timer 3 Finished'),3000);

    setImmediate(() => console.log('Immediate 1 Finished'));

    process.nextTick(() => console.log('Next Tick Finished'));

});
console.log("Hello from the top-level code");