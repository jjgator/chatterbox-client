const Message = function() {};

const app = {};

app.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages'
app.messages = [];
app.lastMessageID = 0;

app.send = function (message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: message,
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
    success: function (data) {
      // console.log('chatterbox: Messages retrieved', data);
      if (!data.results || !data.results.length) {return};
      app.messages = data.results;

      const mostRecentMessage = data.results[data.results.length - 1];

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
  $('#chats').html('');
};

app.renderMessage = function(message) {
  const messageDiv = '<div class="message"><span class="username">' + message.username + '</span>: ' + message.text + '</div>';
  $('#chats').html(messageDiv);

  $('.username').on('click', function(e) {
    app.handleUsernameClick();
  });
};

app.renderRoom = function(room) {
  const roomOption = '<option class="roomname">' + room + '</option>';
  $('#roomSelect').append(roomOption);
};

app.handleUsernameClick = function() {
 return;
};

app.handleSubmit = function() {
 return;
};

$( document ).ready(function() {
  $('.submitbutton').on('click', function(e) {
    const newMessage = new Message();

    newMessage.username = decodeURI(window.location.search.split('=')[1]);
    newMessage.text = $('#chatterField').val();
    newMessage.roomname = $('[selected="selected"]').val();

    app.send(newMessage);
    //app.fetch();
    app.renderMessage(newMessage);

    return false;
  });

  $('#send .submit').submit(function(e) {
    app.handleSubmit();
  });
});
