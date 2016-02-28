var socket = io();

socket.on('event', function(data) {
  var li = document.createElement('li');
  li.textContent = JSON.stringify(data);
  document.getElementById('events').appendChild(li);
});

socket.on('state', function(state) {
  document.getElementById('state').textContent = JSON.stringify(state);
});
