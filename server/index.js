import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const users = [];
const swipes = [];

function findUser(username) {
  return users.find(u => u.username === username);
}

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (findUser(username)) {
    return res.status(400).json({ error: 'User exists' });
  }
  users.push({ username, password });
  res.json({ message: 'Registered' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);
  if (!user || user.password !== password) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login ok' });
});

app.get('/api/profile/:username', (req, res) => {
  const user = findUser(req.params.username);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ username: user.username });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/swipe', (req, res) => {
  const { fromUser, toUser, direction } = req.body;
  swipes.push({ fromUser, toUser, direction });
  res.json({ message: 'Recorded' });
});

app.get('/api/matches/:username', (req, res) => {
  const username = req.params.username;
  const likesFromUser = swipes.filter(s => s.fromUser === username && s.direction === 'right');
  const likesToUser = swipes.filter(s => s.toUser === username && s.direction === 'right');

  const matches = [];
  for (const like of likesFromUser) {
    const reciprocal = likesToUser.find(s => s.fromUser === like.toUser && s.toUser === username);
    if (reciprocal) {
      matches.push(like.toUser);
    }
  }
  res.json(matches);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
