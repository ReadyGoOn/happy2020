const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const queryString = require('querystring')
// const bodys = require('./www/body')

const multer = require('multer');

let server = express();
server.listen(8090);
server.use(multer({dest: 'upload/'}).any())
// 中间件引入，引入后才可使用。
// 1
server.use(bodyParser.urlencoded({extended: false}))
// 2
// server.use(bodys)
// 3
// server.use((req, res, next) =>{
//     let arr = [];
//     req.on('data', data =>{
//         console.log('data', data);
//         arr.push(data);
//     });
//     req.on('end', () => {
//         req.body = queryString.parse(Buffer.concat(arr).toString());
//         next();
//     });
// })

server.get('/get', (req, res, next) => {
    console.log('响应方面：');
    // res.write('qwertyuiop');// 字符串，butter
    // res.send({a:1,b:2})
    // let a = 1;
    console.log('req.query=>', req.query);
    console.log('req.url=>', req.url);
    let { a, url } = req.query;
    
    if(!(+a)){
        console.log('读取文件： 绝对路径=>', path.resolve(url + '.txt'));
        if (url) {
            // res.sendFile(path.resolve(url + '.txt'))//绝对路径
            res.sendFile(path.resolve(url))//绝对路径
        } else {
            res.sendFile(path.resolve('note.txt'))//绝对路径
        }
    } else if(+a == 1){
        console.log('返回错误码： =>');
        // res.writeHeader(404);
        // res.write('404 Not Found!')
        res.sendStatus(404); 
    } else if(+a == 2){
        console.log('重定向： =>');
        //express
        res.redirect('http://www.baidu.com/');
        //原生1
        // res.setHead(301, {'location': 'http://www.baidu.com/'});
        //原生2
        // res.setHeader('location', 'http://www.baidu.com/');
        // res.writeHeader(301);
    } else {
        res.send('只争朝夕，不负韶华')
    }
});
server.post('/formdata', (req, res, next) => {
    console.log('req.url=>', req.url);
    console.log('req.body=>', req.body);
    console.log('req.files=>', req.files);
    res.send({a:1,b:2})
    res.end();
});
server.use('/c', (req, res, next) => {
    console.log('c');
    res.send({a:1,b:2})
    res.end();
});

// server.use(express.static('www/'));