// mock 数据
const express = require('express')
const app = express() 
app.get('/user/info', (req, res)=>{
    // 支持跨域
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT')
    res.header('Content-Type', 'application/json;chatet=utf-8')
    res.json({
        code: 0,
        data: {
            name: 'react-ssr'
        }
    })
})

app.get('/course/list', (req, res)=>{
    // 支持跨域
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT')
    res.header('Content-Type', 'application/json;chatet=utf-8')
    res.json({
        code: 0,
        list: [
            {name: 'express', id: 1},
            {name: 'koa', id: 2},
            {name: 'egg', id: 3}
        ] 
    })
})

app.listen(4000, ()=>{
    console.log('app listen 4000')
})