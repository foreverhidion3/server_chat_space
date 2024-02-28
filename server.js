const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// Configure CORS
const corsOptions = {
  origin: 'https://chat-space-jx4c.onrender.com', // Replace with the actual origin of your React app
  methods: ['GET', 'POST'],
  credentials: true, // If you need to pass cookies along with the request
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const io = socketIo(server, {
  cors: corsOptions,
});

const port = 3001;

io.on('connection', (socket) => {
  console.log('A user connected'); // Add this line

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    console.log('Received message:', msg); // Add this line
    io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Express route
app.get('/', (req, res) => res.send('Hello World! chat_space is listening'));

server.listen(port, () => {
  console.log(`chat_space is listening on port ${port}`);
});








