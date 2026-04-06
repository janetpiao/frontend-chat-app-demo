const express = require('express');
const{Server} = require('socket.io');
const http = require('http');

// this code works locally
// const server = new Server({cors: {origin: 'http://localhost:4200'}});

// server.on('connection', (socket) => {
//     console.log('connected');
//     socket.on('message', (data) => {
//         console.log(data);
//         socket.broadcast.emit('received', {data: data, message: 'This is a message from the server'});
//     });
// });

// server.listen(4000);

// Code for deployment on Render.com
// create HTTP server
const app = express();
const server = http.createServer(app);

// create socket server with CORS
const io = new Server(server, {
  cors: {
    origin: "*", // allow all (simplest for now), add Vercel URL later
  }
});

// connection event
io.on('connection', (socket) => {
  console.log('connected');

  socket.on('message', (data) => {
    console.log(data);

    socket.broadcast.emit('received', {
      data: data,
      message: 'This is a message from the server'
    });
  });
});

// use environment port (VERY IMPORTANT for Render)
const PORT = process.env.PORT || 4000;

// start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// optional but helps Render detect HTTP
app.get('/', (req, res) => {
  res.send('Server is running');
});