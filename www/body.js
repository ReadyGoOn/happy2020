const queryString = require('querystring');

module.exports = (req, res, next) =>{
    let arr = [];
    req.on('data', data =>{
        console.log('data', data);
        arr.push(data);
    });
    req.on('end', () => {
        req.body = queryString.parse(Buffer.concat(arr).toString());
        next();
    });
}