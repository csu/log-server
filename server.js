"use strict";
const port = process.env.PORT || 3000;
const serverSecret = "bN525JGfxoQ561o3K58Ng6E6vnY3ROd9";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false } ));
app.use(express.static('static'));

const server = app.listen(port, () => {
  console.log('Listening on *:' + port);
});

const state = {};

const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.emit('state', state);

  socket.on('log', function(logBody) {
    emitLog(logBody);
  });
});

var emitLog = function(content) {
  const logBody = JSON.parse(content);
  if (logBody.type === 'event') {
    io.emit('event', logBody);
  } else if (logBody.type === 'error') {
    io.emit('error', logBody);
  } else {
    updateState(logBody);
    io.emit('state', state);
  }
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// pre: state = {}
// body: { type: 'stat', data: { mem:... }}
// post: state = { stat: { mem: ... }}
const updateState = (body) => {
  if (!body.data || !body.type) {
    return;
  }
  state[body.type] = body.data;
  state[body.type]['router'] = body['router'];
};

app.post('/log', (req, res) => {
  let secret = req.body.secret;
  if (secret !== serverSecret) {
    res.status(401).send('Wrong secret\n');
    return
  }
  emitLog(logBody);
  res.send('Log received\n');
});
