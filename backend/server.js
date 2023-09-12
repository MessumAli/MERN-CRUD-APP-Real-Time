const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
dotenv.config()
const { createServer } = require("http");
const { Server } = require("socket.io");

const userRoute = require('./routes/userRoute')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

mongoose.connect(process.env.URI).then(() => {
    console.log('Database Connected')

    const server = createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.on("connection", (socket) => {
        socket.on("userCreated", (data) => {
            io.emit("userUpdated", data);
        });

        socket.on("singleUserUpdated", (data) => {
            io.emit("userDataUpdated", data);
        });

        socket.on("deleteUser", (id) => {
            io.emit("userDeleted", id);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });

    server.listen(process.env.PORT || 8000, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Runnung Successfully At", process.env.PORT)
        }
    })
}).catch((error) => {
    console.log('error', error)
})

app.use('/user', userRoute) 