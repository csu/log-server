var socket = io();

socket.on('event', function(data) {
  var li = document.createElement('li');
  li.textContent = JSON.stringify(data);
  var source = data.source || 'main'
  document.getElementById(data.source + '-events').appendChild(li);
});

socket.on('state', function(state) {
  document.getElementById('state').textContent = JSON.stringify(state);
});

socket.on('error', function(error) {
  var li = document.createElement('li');
  li.textContent = JSON.stringify(error);
  document.getElementById('errors').appendChild(li);
})
