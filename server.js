const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
    // Sample data
    { username: 'user1', password: 'password1', icon: '', posts: ['Hello World!'] },
    { username: 'user2', password: 'password2', icon: '', posts: ['My first post!'] }
];

// Endpoint to get user profile
app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);
    if (user) {
        res.json({ username: user.username, icon: user.icon });
    } else {
        res.status(404).send('User not found');
    }
});

// Endpoint to get user posts
app.get('/user/:username/posts', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);
    if (user) {
        res.json(user.posts);
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
