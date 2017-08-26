var Message = function() {};

var app = {};

app.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages'

app.messages = [];

app.lastMessageID = 0;

app.send = function (message) {
  $.ajax({
    url: app.server,
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
    url: app.server,
    type: 'GET',
    //data: JSON.stringify(message),
    //contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages retrieved', data);
      if (!data.results || !data.results.length) {return};
      app.messages = data.results;

      var mostRecentMessage = data.results[data.results.length - 1];

      if (mostRecentMessage.objectId !== app.lastMessageID) {
        app.clearMessages();

        
      }
    },
    error: function (data) {
      console.error('chatterbox: Failed to retreive messages', data);
    }
  });
};


app.init = function() {};

app.clearMessages = function() {
  $('chats').html('');
};

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