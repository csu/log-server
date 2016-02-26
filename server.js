"use strict";
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false } ));
app.use(express.static('static'));

const server = app.listen(3000, () => {
  console.log('listening on *:3000');
});

const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('connected');
 
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
}); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/visualization.html');
});

app.post('/log', (req, res) => {
  let logBody = req.body.logBody;
  io.emit('log', { logBody });
  console.log(logBody);
  res.send('Log received');
});