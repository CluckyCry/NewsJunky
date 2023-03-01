require('dotenv').config();
// Variables
import express from 'express'
import fetch from 'node-fetch'
const app = express()
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;

app.use(express.static('./static'))

// Endpoints
app.get('/fetch', async (req, res) => {
    let query = req._parsedUrl.query
    let url = 'https://newsapi.org/v2/everything?' + query + `&apiKey=${API_KEY}&language=en`
    let response = await fetch(url)
    let json = await response.json()

    res.json(json);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
