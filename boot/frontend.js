const fs = require('fs');
const path = require('path');

const publicPath = path.join('.', 'HTML-Seiten');

const readPublic = (url) => {
    const file = path.join(publicPath, url);
    if (!file.normalize().startsWith('HTML-Seiten')) return false;
    if (fs.existsSync(file) && fs.statSync(file).isFile())
        return fs.readFileSync(file);
    return false;
};

module.exports = {readPublic} ; // p5js 