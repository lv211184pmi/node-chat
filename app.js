const express = require('express')
const app = express()

// set template engine ejs
app.set('view engine', 'ejs')

// middleware
app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
    res.render('index')
})

// port to listen
server = app.listen(3000)

const io = require('socket.io')(server)
// listen fro connections
io.on('connection', (socket) => {
    console.log("New connection added")
    socket.username = "Anonymous"

    // listen on change username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    // listen for new message
    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {
            message: data.message,
            username: socket.username
        })
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username: socket.username})
    })
})
