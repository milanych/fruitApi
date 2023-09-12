// const http = require("http") //Inbuilt to node

// const server = http.createServer((req, res) => {
//   console.log(req.url)
//   console.log(req.method)
//   res.setHeader("Content-Type", "text/html")
//   res.end("<img style='width:100%' src='https://pbs.twimg.com/media/Dj8XlmjV4AEzsvr.jpg'>")
// }) //Creates the server and sends the response

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })
// app.get('/chicken', (req, res) => {
//   res.send("Hello Chicken")
// })

// server.listen(3000, () => {
//   console.log('Server Ready')
// })

// app.use((req, res, next) => {
//   console.log("I am a piece of middleware");
//   next()
// })

//Fruit API
require('dotenv').config();
const fruits = require('./fruits.json')
const express = require("express");
const app = express()
const port = process.env.PORT

app.use(express.json())


app.get("/", (req, res) => {
  res.send("Hello Fruit API")
})
app.get("/fruits", (req, res) => {
  res.send(fruits)
})

const getFruitIndex = (name) => fruits.findIndex((fruit) => fruit.name.toLowerCase() == name)

app.post('/fruits', (req, res) => {
  const fruit = req.body
  const fruitIndex = getFruitIndex(fruit.name.toLowerCase())
  if (fruitIndex > -1) {
    res.status(409).send("The fruit already exists");
  } else {
    //create an array of all ids
    const ids = fruits.map(el => el.id)
    //get the maximum id
    let maxid = Math.max(...ids);
    console.log(maxid)
    //increment that by one
    maxid++
    //adjust id to new maxid
    fruit.id = maxid
    res.status(201).send(fruit)
  }
})

app.delete('/fruits/:name', (req, res) => {
  const fruitIndex = getFruitIndex(req.params.name.toLowerCase())
  if (fruitIndex == -1) {
    res.status(404).send('Fruit can not be found');
  } else {
    fruits.splice(fruitIndex, 1);
    res.sendStatus(200)
  }
})

app.get("/fruits/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)
  if (fruit == undefined) {
    res.status(404).send("The fruit doesn't exist")
  } else {
    res.send(fruit)
  }
})

app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`)
})
