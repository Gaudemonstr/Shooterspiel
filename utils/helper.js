const parseQuery = function (url) {
    const query = {};
    if (url.includes('?')) {
        const routePath = url.split('?')[0];
        const queryString = url.split('?')[1];
        const querySplitted = queryString.split('&');
        querySplitted.forEach(part => {
            const params = part.split('=');
            query[params[0]] = params[1];
        });
    }
    return query;
};

module.exports = { parseQuery };