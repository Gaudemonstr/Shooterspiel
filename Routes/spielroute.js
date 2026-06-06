const http = require('http');
const fs = require('fs');
const path = require('path');
const spielRouter = fs.readFileSync('HTML-Seiten/index.html','utf-8');

const routes = {...spielRouter}



module.exports = routes