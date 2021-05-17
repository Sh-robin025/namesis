const express = require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const { ObjectID } = require('mongodb');
const app = express()
const port = process.env.APP_PORT || 8080;

app.use(cors())
app.use(express.json())

const admin = {
    email: process.env.APP_EMAIL,
    password: process.env.APP_PASSWORD
}

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // authenticate user
    if (email === admin.email && password === admin.password) {
        const accessToken = jwt.sign({ email: admin.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
        return res.send(accessToken)
    } else {
        return res.sendStatus(403)
    }
})

const uri = `mongodb+srv://${process.env.APP_DB_USER}:${process.env.APP_DB_PASS}@cluster0.yrwhe.mongodb.net/${process.env.APP_DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log("connection error", err)
    const userCollection = client.db("Namesis").collection("users");

    app.post('/addUser', (req, res) => {
        console.log(req.body.body)
        userCollection.insertOne(req.body.body)
            .then(result => {
                result.insertedCount > 0 && res.sendStatus(200)
            })
            .catch(err => console.log("user add err : ", err))
    })

    app.get('/users', (req, res) => {
        userCollection.find()
            .toArray((err, items) => res.send(items))
    })
    app.delete('/deleteUser/:id', (req, res) => {
        console.log(req.params.id)
        userCollection.deleteOne({ _id: ObjectID(req.params.id) })
            .then(result => {
                result.deletedCount === 1 && res.send("delete success")
            })
            .catch(err => console.log("delete err : ", err))
    })
    // client.close();
});


// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token === null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
// }

// app.get('/user', authenticateToken, (req, res) => {
//     res.json(admin)
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})