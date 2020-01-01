const express = require('express');
const path = require('path');

let server = express();
server.listen(8090);

server.get('/a', (req, res, next) => {
    console.log('a');
    // res.write('qwertyuiop');// 字符串，butter
    // res.send({a:1,b:2})
    let a = 0;
    if(!a){
        console.log('绝对路径');
        // res.sendFile('笔记.txt')//绝对路径
        res.sendFile(path.resolve('note.txt'))//绝对路径
    } else {
        res.send('')
    }
    // res.end();
});
server.post('/b', (req, res, next) => {
    console.log('b');
    res.send({a:1,b:2})
    res.end();
});
server.use('/c', (req, res, next) => {
    console.log('c');
    res.send({a:1,b:2})
    res.end();
});

server.use(express.static('www/'));