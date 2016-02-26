"use strict";
const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false } ));
app.use(express.static('static'));

const server = app.listen(port, () => {
  console.log('Listening on *:' + port);
});

const io = require('socket.io')(server);
// io.on('connection', (socket) => {
//   console.log('connected');
 
//   socket.on('disconnect', () => {
//     console.log('disconnected');
//   });
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/viz', (req, res) => {
  res.sendFile(__dirname + '/views/viz.html');
});

app.post('/log', (req, res) => {
  let logBody = req.body.logBody;
  io.emit('log event', { logBody });
  res.send('Log received\n');
});