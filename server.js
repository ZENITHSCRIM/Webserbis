const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

// MongoDB Atlas connection
mongoose.connect('your_mongodb_atlas_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    icon: String,
    posts: [String]
});

const User = mongoose.model('User', userSchema);

// ユーザープロフィールを取得するエンドポイント
app.get('/user/:username', async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username }).exec();
    if (user) {
        res.json({ username: user.username, icon: user.icon });
    } else {
        res.status(404).send('User not found');
    }
});

// ユーザーポストを取得するエンドポイント
app.get('/user/:username/posts', async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username }).exec();
    if (user) {
        res.json(user.posts);
    } else {
        res.status(404).send('User not found');
    }
});

// 新しい投稿を作成するエンドポイント
app.post('/user/:username/posts', async (req, res) => {
    const username = req.params.username;
    const postContent = req.body.content;
    const user = await User.findOne({ username }).exec();
    if (user && postContent) {
        user.posts.push(postContent);
        await user.save();
        res.status(201).send('Post created');
    } else {
        res.status(400).send('Bad request');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
