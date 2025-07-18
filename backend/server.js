const http = require('http')
const app = require('./app')
const { initialiseSocketIO } = require('./socket')
const port = process.env.PORT || 3000

const server = http.createServer(app)
initialiseSocketIO(server)

server.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})