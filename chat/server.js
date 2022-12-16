const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const messages = require('./messages');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    res.json({username}); 
  });

app.post('/api/session', (req, res) => {
    const { username } = req.body;
  
    if(!users.isValid(username)) {
      res.status(400).json({ error: 'required-username' });
      return;
    }
  
    if(username === 'dog') {
      res.status(403).json({ error: 'auth-insufficient' });
      return;
    }
  
    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
  
    if(!existingUserData) {
      users.addUserData(username);
    }

    let activeUser = [];
    Object.values(sessions.getAllsessions()).map( (session) => {
      if(!activeUser.includes(session.username)) {
        activeUser.push(session.username)
      }
    });
  
    res.cookie('sid', sid);
    res.json({users: activeUser, messages: messages.getMessages()}); 
  });

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
  
    if(sid) {
      res.clearCookie('sid');
    }
    if(username) {
      sessions.deleteSession(sid);
    }
    res.json({ username });
  });

// Chat
app.get('/api/messages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

    let activeUser = [];
    Object.values(sessions.getAllsessions()).map( (session) => {
      if(!activeUser.includes(session.username)) {
        activeUser.push(session.username)
      }
    });

    res.json({users: activeUser ,messages: messages.getMessages()});
  });

app.post('/api/messages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { text } = req.body;
    if(!text || text === '') {
      res.status(400).json({ error: 'required-message' });
      return;
    }
    messages.addMessage(username, text);
    res.json(messages.getMessages());
  });

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));