var Message = function() {

};

var app = {};

app.send = function (message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent', data, message);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


app.init = function() {

};

$('.submitbutton').on('click', function() {
  var newMessage = new Message();

  newMessage.username = window.location.search;
  newMessage.text = $('#chatterField').val();
  newMessage.roomname = $('[selected="selected"]').val();

  app.send(newMessage);
});