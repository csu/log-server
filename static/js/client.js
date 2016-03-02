var socket = io();

socket.on('event', function(entry) {
  var el = document.createElement('div');
  var source = entry.data.source || 'main';
  delete entry.data.source;
  el.textContent = JSON.stringify(entry, null, 2);
  document.getElementById(source + '-events').appendChild(el);
});

socket.on('state', function(state) {
  for (var key in state) {
    var el = document.getElementById(key);
    if (el) {
      el.textContent = JSON.stringify(state[key], null, 2);
    }
  }
});

socket.on('error', function(error) {
  var el = document.createElement('div');
  el.textContent = JSON.stringify(error, null, 2);
  document.getElementById('errors').appendChild(el);
})
