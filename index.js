const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const axios = require('axios').default;
const port = process.env.PORT || 1111;
let app = express();
let server = http.createServer(app)
const io = socketIO(server, {cors: {origin: "*"}});


server.listen(port);

io.on('connection', (socket)=>{

    socket.on('sales-joined', (data) => {
        console.log('sales-joined', data);

        axios.put('https://v1.nocodeapi.com/bikayi/google_sheets/OmujpjHVhltIsTfP?tabId=Leads', { "row_id": data.id, "Sales Person Joined": "Yes" });

        io.sockets.in(data.clientEmail).emit('sales-joined', { message: 'Sales person has joined. Kindly join the meet now.' });

    });

    socket.on('client-waiting', (data) => {
        console.log('client-waiting', data);
        if (data.email) {
            socket.join(data.email);
        }
    });
});

