// Core Module
const fs = require('fs');
const http = require('http');
const url = require('url');

// Third Party Module
const slugify = require('slugify');
// console.log(slugify('Fresh Avocado', {lower:true}));

// Own Module (Read The Template)
const replaceTemplate = require('./module_js/replaceTemplate');


// Read Template (only one time calling the template file so using synchronous )
const tempOverview = fs.readFileSync(`${__dirname}/templates/template_overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template_product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template_card.html`, 'utf-8');

// Read Data From JSON
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
// console.log(dataObj);

const slug = dataObj.map(el => slugify(el.productName),{lower: true});
console.log(slug);

// Create Server
const server = http.createServer((req, res) => {
    // console.log(req.url);
    // console.log(url.parse(req.url, true)); // true parameter is( url's query convert object eg /product?id=2 => {id: '2'})

    const {query, pathname: pathName } = url.parse(req.url, true);
    // console.log(query);
    console.log(url.parse(req.url, true));

    // const pathName = req.url;

    // Home Page
    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        // const cardHTML = dataObj.map((el => replaceTemplate(tempCard, el))); // array html template (so we need to convert array to string)
        // console.log(cardHTML); 

        const cardHTML = dataObj.map((el => replaceTemplate(tempCard, el))).join(''); // so we need to convert array to string using 'join' method

        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardHTML);
        // console.log(cardHTML); 

        res.end(output);

    // Overview Page
    }
    else if(pathName === '/products') {
        const product = dataObj[query.id];
        // console.log(product);

        const output = replaceTemplate(tempProduct, product);
        // console.log(output);

        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.end(output);
        
     // Error Page
    } else {
        res.end('404 Not Found!')
    }
})

// Listen Request
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening To Request on port 8000');
})