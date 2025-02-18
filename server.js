const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
    { username: 'user1', password: 'password1', icon: '', posts: ['Hello World!'] },
    { username: 'user2', password: 'password2', icon: '', posts: ['My first post!'] }
];

// ユーザープロフィールを取得するエンドポイント
app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);
    if (user) {
        res.json({ username: user.username, icon: user.icon });
    } else {
        res.status(404).send('User not found');
    }
});

// ユーザーポストを取得するエンドポイント
app.get('/user/:username/posts', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);
    if (user) {
        res.json(user.posts);
    } else {
        res.status(404).send('User not found');
    }
});

// 新しい投稿を作成するエンドポイント
app.post('/user/:username/posts', (req, res) => {
    const username = req.params.username;
    const postContent = req.body.content;
    const user = users.find(user => user.username === username);
    if (user && postContent) {
        user.posts.push(postContent);
        res.status(201).send('Post created');
    } else {
        res.status(400).send('Bad request');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
