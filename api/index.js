if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')

// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected Sucessfully'))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)

app.listen(process.env.PORT || 3000)