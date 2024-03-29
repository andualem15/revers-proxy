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

function getData() {
    axios
      .get("https://api.github.com/users/social-collab")
      .then(function (response) {
        console.log("Response: ", response.data);
        return response.data;
      })
      .catch(function (handleError) {
        console.log("Error: ", handleError);
      }, []);
  }
  
  const myData = function (data) {
    name = data.name;
    console.log(name);
  };
  
  getData().then((data) => {
    myData(data);
  });
  
  //start server
app.listen(PORT)
