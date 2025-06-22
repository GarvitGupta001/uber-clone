const mongoose = require('mongoose')

const connect = async () => {
    try {

        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection
        connection.on('connected', ()=> {
            console.log("connected to MongoDB")
        })
        connection.on('error', (error)=> {
            console.log({
                error: error
            })
            process.exit(1)
        })
    } catch (error) {
        console.log({
            error: error.message
        })
        process.exit(1)
    }
}

module.exports = connect