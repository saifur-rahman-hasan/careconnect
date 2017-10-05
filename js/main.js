'use strict';

//Global variables
let user_id = null;
let selfId = null, selfName = null;
let allUsers = [];
let messages = [];
let splicedMessages = [];
let index = 20;

var app = {

  chat: function(username){

    var socket = io('/', { transports: ['websocket'] });

      // When socket connects, join the current chatroom
      socket.on('connect', function () {

        socket.on('setVars', (data)=>{ 
          if(selfId === null && selfName === null){
            selfId = data.id;
            selfName = data.name;
            allUsers = data.allUsers;

            for(let user of allUsers){
              if(user._id != selfId){

                app.helpers.selectUser(`user-${user._id}`);
                $('.chat .chat-header').show();
                break;
              }
            }
          }
        });

        $('.list').on("click", ".user", function(e){

          app.helpers.selectUser(this.id)

        })

        // Update users list upon emitting updateUsersList event
        socket.on('updateUsersList', function(users, clear) {

          $('.container p.message').remove();
          if(users.error != null){
            $('.container').html(`<p class="message error">${users.error}</p>`);
          }else{
            app.helpers.updateUsersList(users, clear);
          }
        });

        // Whenever the user hits the save button, emit newMessage event.
        $("#sendMessage").on('click', function(e) {

          var textareaEle = $("textarea[name='message']");
          var messageContent = textareaEle.val().trim();
          if(messageContent !== '') {
            var message = { 
              content: messageContent, 
              username: username,
              date: Date.now()
            };

            socket.emit('newMessage', user_id, message);
            textareaEle.val('');
            app.helpers.addMessage(message, true, true);
          }
        });

        //load more messages 
        $('.chat-history').scroll(function(){
          if ($('.chat-history').scrollTop() == 0){
            app.helpers.loadMore(messages, index)
            index+=10;
          }
        })

        //send message upon ENTER click
        $("textarea[name='message']").keypress(function (e) {
          if (e.which == 13) {
            var textareaEle = $("textarea[name='message']");
            var messageContent = textareaEle.val().trim();
            if(messageContent !== '') {
              var message = { 
                content: messageContent, 
                username: username,
                date: Date.now()
              };

              socket.emit('newMessage', user_id, message);
              textareaEle.val('');
              app.helpers.addMessage(message, true, true);
            }

          }
        });

        //when a user left the chat
        socket.on('userLeft', function(userId) {
          app.helpers.userLeft(userId);
        });

        // Whenever a user leaves the current room, remove the user from users list
        socket.on('removeUser', function(userId) {
          $('li#user-' + userId).remove();
          app.helpers.updateNumOfUsers();
        });

        // Append a new message 
        socket.on('addMessage', function(fromUserId, message) {
          let isActive = $(`#user-${fromUserId}`).attr('class').indexOf('active');

          if(isActive != -1){

            app.helpers.addMessage(message, false, true);
          }
          else{

            let currentNum = $(`#user-${fromUserId} .new-msgs`).text();
            $(`#user-${fromUserId} .new-msgs`).text(parseInt(currentNum)+1);
            $(`#user-${fromUserId} .new-msgs`).css('background-color', '#86BB71');
            new Audio('../audio/beep.mp3').play();

          }
          
        });
      });
    },

    helpers: {

      encodeHTML: function (str){
        return $('<div />').text(str).html();
      },

      updateUsersList: function(onlineUsers, clear){
        for(let user of onlineUsers){
          $(`#user-${user._id} .status`).html('<i class="fa fa-circle online"></i> online');

        }
      },

      userLeft: function(userId){
        $(`#user-${userId} .status`).html('<i class="fa fa-circle offline"></i> offline');

      },

    // Adding a new message to chat history
    addMessage: function(message, isMine, scroll){
      message.date      = (new Date(message.date)).toLocaleString();
      message.username  = this.encodeHTML(message.username);
      message.content   = this.encodeHTML(message.content);
      let msgClass = isMine ? 'my-message' : 'other-message';
      let msgSender = isMine ? 'Me' : message.username;

      var html = `<li>
      <div class="message-data">
      <span class="message-data-name">${msgSender}</span>
      <span class="message-data-time">${message.date}</span>
      </div>
      <div class="message ${msgClass}" dir="auto">${message.content}</div>
      </li>`;
      $(html).hide().appendTo('.chat-history ul').slideDown(200);

      // Keep scroll bar down
      if(scroll){
        $(".chat-history").animate({ scrollTop: $('.chat-history')[0].scrollHeight}, 50);

      }
    },

    // Update number of online users in the current room
    // This method MUST be called after adding, or removing list element(s)
    updateNumOfUsers: function(){
      var num = $('.users-list ul li').length;
      $('.chat-num-users').text(num +  " User(s)");
    },

    selectUser: (id) => {

      index = 20;
      splicedMessages = [];
      messages = [];

      let elementId = $(`#${id}`);
      let image = elementId.find('img');
      user_id = id.split('-')[1];

      $('.chat-history ul').html('');

      $.post("/get_messages",
      {
        userId: selfId,
        otherId: user_id
      },
      function(data, status){
        messages = data.messages;
        $('.chat-about .chat-num-messages').text(`already ${messages.length} messages`);

        let splicedMessages = messages.length > 10 ? messages.slice(messages.length-10, messages.length) : messages;
        for(let messg of splicedMessages){
          let isMine = messg.username == selfName ? true : false;
          app.helpers.addMessage(messg, isMine, true);
        }
      });

      elementId.addClass("active").siblings().removeClass("active");
      $('.list li img').removeClass("active");
      image.addClass("active").siblings().removeClass("active");

      for(let user of allUsers){
        if(user._id == user_id){

         $('.chat-header img').attr("src", `${user.picture}`);
         $('.chat-about .chat-with').text(`Chat with ${user.username}`);
         $(`#user-${user._id} .new-msgs`).text(0);
         $(`#user-${user._id} .new-msgs`).css('background-color', 'gold');

             //Stop looping!
             break;
           }
         }
       },
       loadMore: (messages, index) => {

        console.log(messages, index)

        if(splicedMessages.length < messages.length){
          $('.chat-history ul').html('');
          splicedMessages = [];
          splicedMessages = messages.length > index ? messages.slice(messages.length-index, messages.length) : messages;
          for(let messg of splicedMessages){
            let isMine = messg.username == selfName ? true : false;
            app.helpers.addMessage(messg, isMine, false);
          }
          $('.chat-history').scrollTop(100);
       }
       else{
        return;
      }
    }
  }
};
