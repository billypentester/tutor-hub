const socketIO = require('socket.io');
const Chat = require('./../model/chatSchema');

function setupSocket(server) {

  const io = socketIO(server);
  var clients = [];

  io.on('connection', (socket) => {
    
    console.log('A new user connected: ', socket.id);
  
    socket.on('disconnect', () => {
      clients = clients.filter(client => client.socketId !== socket.id);
      console.log('A user disconnected: ', socket.id);
    });

    socket.on('associateId', async(data) => {
      const { username } = data;
      const client = clients.find(client => client.username === username);
      if (client) {
        client.socketId = socket.id;
      }
      else
      {
        clients.push({ username: username, socketId: socket.id });
      }
      console.log(clients);
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

      // send message to only sender and receiver

      const senderClient = clients.find(client => client.username == messages.participants[0].username);
      const receiverClient = clients.find(client => client.username == messages.participants[1].username);

      if (senderClient) {
        io.to(senderClient.socketId).emit('syncMessages', messages.messages[messages.messages.length - 1]);
        console.log(`Message sent to ${senderClient.socketId} successfully: ` + messages.messages[messages.messages.length - 1])
      }

      if (receiverClient) {
        io.to(receiverClient.socketId).emit('syncMessages', messages.messages[messages.messages.length - 1]);
        console.log(`Message sent to ${receiverClient.socketId} successfully: ` + messages.messages[messages.messages.length - 1])
      }
      
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
