const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const HOST = process.env.SERVER_HOST || 'localhost'
const PORT = process.env.SERVER_PORT || 3000

global.xsrfToken = 'non'

app.use(cors({
    origin: '*'
}))

function getXsrfToken() {
    //  console.log('get XSRF-TOKEN')
    return axios.get('http://localhost:8080/server/api')
    x
    return returnValue
}
let r
getXsrfToken().then(response => {
    console.log(response.headers['dspace-xsrf-token'].toString()+Date().toString());
    r = response.headers['dspace-xsrf-token']
})

console.log('r='+r+Date().toString())
//start server
app.listen(PORT)
