const socketIO = require('socket.io');
const Chat = require('./../model/chatSchema');

function setupSocket(server) {

  const io = socketIO(server);

  io.on('connection', (socket) => {
    
    console.log('A new user connected');
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  
    socket.on('newMessage', async(data) => {

      const { sender, participants, text } = data;

      const participant1 = participants[0].username;
      const participant2 = participants[1].username;

      const chat = await Chat.findOne({
        $or: [
          { "participants.0.username": participant1, "participants.1.username": participant2 },
          { "participants.0.username": participant2, "participants.1.username": participant1 }
        ]
      });

      if (chat) {
        chat.messages.push({ sender: sender, text: text, time: Date.now() });
        await chat.save();
      } 
      else {
        const newChat = new Chat({
          participants: [
            {
              name: participants[0].name,
              profile: participants[0].profile,
              username: participants[0].username
            },
            {
              name: participants[1].name,
              profile: participants[1].profile,
              username: participants[1].username
            }
          ],
          messages: [{ sender, text: text, time: Date.now() }]
        });
        await newChat.save();
      }

      const messages = await Chat.findOne({
        $or: [
          { "participants.0.username": participant1, "participants.1.username": participant2 },
          { "participants.0.username": participant2, "participants.1.username": participant1 }
        ]
      });

      console.log(messages.messages[messages.messages.length - 1]);

      io.emit('syncMessages', messages);
      
    });

    socket.on('getMessages', async(data) => {
      
      const participant = data.participants

      const messages = await Chat.find({
        $or: [
          { "participants.0.username": participant },
          { "participants.1.username": participant }
        ]
      });

      socket.emit('receiveMessages', messages);
      
    });
    

  }); 

}

module.exports = setupSocket;
