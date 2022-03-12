if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')

const userRoute = require('./routes/user')

// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected Sucessfully'))

app.use('/api/users', userRoute)

app.listen(process.env.PORT || 3000)