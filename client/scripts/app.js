var Message = function() {};

var app = {};

app.send = function (message) {
  $.ajax({
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent', data, message);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function(message) {
  $.ajax({
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages retrieved', data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to retreive messages', data);
    }
  });
};


app.init = function() {};

app.clearMessages = function() {};

app.renderMessage = function(message) {

  var $message = $("<div>", {class: "message"});
   
  $('#chats').prepend($message);
  
};

app.renderRoom = function() {};

$('.submitbutton').on('click', function() {
  var newMessage = new Message();

  newMessage.username = window.location.search;
  newMessage.text = $('#chatterField').val();
  newMessage.roomname = $('[selected="selected"]').val();

  app.send(newMessage);
  //app.fetch();
  app.renderMessage(newMessage);
});