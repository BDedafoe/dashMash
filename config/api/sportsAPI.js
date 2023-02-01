const express = require('express')
require('dotenv').config()
const router = express.Router()
const axios = require('axios')


const api_key = process.env.apiKey || 'YOUR_API_KEY'
const sport_key = 'upcoming' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports
const regions = 'uk' // uk | us | eu | au
const oddsFormat = 'decimal' // decimal | american
const dateFormat = 'iso' // iso | unix
const market = 'h2h' // h2h | spreads | totals


axios.get('https://api.the-odds-api.com/v4/sports', {
    params: {
        api_key
    }
})
.then(response => {
    console.log(response.data)
})
.catch(error => {
    console.log('Error status', error.response.status)
    console.log(error.response.data)
})

axios.get(`https://api.the-odds-api.com/v4/sports/${sport_key}/odds`, {
    params: {
        api_key,
        regions,
        market,
        oddsFormat,
        dateFormat,
}
})
.then(response => {
console.log(JSON.stringify(response.data))

// Check your usage
console.log('Remaining requests',response.headers['x-requests-remaining'])
console.log('Used requests',response.headers['x-requests-used'])

})
.catch(error => {
console.log('Error status', error.response.status)
console.log(error.response.data)
})

module.exports = router;