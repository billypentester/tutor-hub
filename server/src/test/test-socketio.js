const io = require('socket.io-client');
const socket = io.connect('http://localhost:5000');

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
});

socket.on('connect_error', (error) => {
    console.error('Error connecting to Socket.IO server:', error);
});
