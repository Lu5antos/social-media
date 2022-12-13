const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: "Post has been added! Great Work!"
    });
});

app.get(`/api/posts`, (req, res, next) => {
    const posts = [
        {
            id:'1',
            title: 'First Post',
            content: 'I believe in you!'
        },
        {
            id:'2',
            title: 'Second Post',
            content: `You're doing great!`
        },
        {
            id:'3',
            title: 'Third Post',
            content: 'Look at all the progress youve made!'
        }
    ];
    res.status(200).json({
        message: `Post fetched successfully!`,
        posts: posts
    });
});

module.exports = app;