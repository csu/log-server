var socket = io();

socket.on('log event', function(log){
  var li = document.createElement('li');
  li.textContent = log.logBody;
  document.getElementById('log-entries').appendChild(li);
});