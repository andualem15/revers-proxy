const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

app.use(cors({
    origin: '*'
}))

const HOST = process.env.SERVER_HOST || 'localhost'
const PORT = process.env.SERVER_PORT || 3000
const odk_api_username = process.env.ODK_API_USERNAME
const odk_api_password = process.env.ODK_API_PASSWORD
var authenticationData;
var yourJWTToken;
var expiresAt;
var isUserLoggedInToOdkApi = false;
var projects;
var yourConfig;
var dspaceXsrfToken;

/* app.get('/example', (req, res) => {
    res.send("Example Route" + req.params.endpoint)
})


*/
app.get('/projects', function (req, res) {
    //let endpoint = 
    // Get Authentication
    if (isNotLoggedIn()) {
        var yourConfig = getUserAccount()
        console.log(yourConfig)
    }
    let endpoint = 'https://odk.aphi.gov.et/v1/projects'
    //console.log(yourConfig)
    axios.get(endpoint, yourConfig).then(response => {
        res.json(response.data)
    }).catch(error => {
        res.json(error)
    })
})

app.get('/dspace', function (req, res) {
    console.log(getXsrfToken())
    //console.log(`X-XSRF-TOKEN: ${returnValue}`)
  /*   
    if (!isDSpaceLogin()) {
        console.log('DSpace User not loged in \n' + dspaceXsrfToken)
    }
    console.log('set dsConfig - DSpace 7.2')
    let dsConfig = {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlaWQiOiJiYjY4MWFjMC0yYTczLTQ2MGYtYTgwZC0xNDA1YmE4OTBiODUiLCJzZyI6W10sImF1dGhlbnRpY2F0aW9uTWV0aG9kIjoicGFzc3dvcmQiLCJleHAiOjE3MDczODE4Mzh9.pO_FYVp8DPgXN2ghbcf4gIx0Es0nRAhunCEh5oh809A',
            'X-XSRF-TOKEN': '1b224caa-7da2-4dc7-8b0d-ade4284bb470'
        }
    } */

    /* axios.post('http://localhost:8080/server/api/authn/login', dsConfig).then(response => {

        console.log(response.data)

    }).catch(error => {
        res.json(error)
    }) */

    /* axios.get('http://localhost:8080/server/api/authn/status', dsConfig).then(response => {

        console.log(response.data)

    }) *//* .catch(error => {
        res.json(error)
    }) */

})
/* app.get(':endpoint([\\/\\w\\.-]*)', function (req, res) {
    //console.log(getUserAccount())
   // console.log(`Authentication Data\n`)
    //console.log(authenticationData)
   // console.log(`Token ` + yourJWTToken)
   // console.log(`is user still loged is? ${isLoggedIn()}`)
    getProjects();
    console.log(projects)
}) */

/* app.get(':endpoint([\\/\\w\\.-]*)', function (req, res) {
    //    let endpoint = 'https://date.nager.at/api/v2'+ req.params.endpoint
    // Get Authentication
    let authenticationData = '';
  //  let yourJWTToken = 'BrcDHM2!bmgsD0Hb4Q8c3Ms3Chu6UAAyUtLAcYdTpdTiuSTStyA0n2UP!tEWFwQS'
    let yourJWTToken = ''
    // console.log(authenticationData);

    axios.post('https://odk.aphi.gov.et/v1/sessions', {
        email: "andualem15@gmail.com",
        password: "p@$$w0rd@aphi"
    })
        .then(response => {
            authenticationData = response.data;
            yourJWTToken = authenticationData.token;
          //  console.log('Authenticated' + JSON.stringify(authenticationData))
          //  jsonObj = JSON.parse(JSON.stringify(authenticationData));
           // yourJWTToken = jsonObj.map(function(x) {return x.token});
            console.log(yourJWTToken)
        })
        .catch(error => {
            res.json(error)
        })

   

    let yourConfig = {
        headers: {
            Authorization: "Bearer " + yourJWTToken
        }
    }
    let endpoint = 'https://odk.aphi.gov.et/v1' + req.params.endpoint

    axios.get(endpoint, yourConfig).then(response => {
        res.json(response.data)
    }).catch(error => {
        res.json(error)
    })
}) */

function isNotLoggedIn() {
    let currentTime = new Date().toJSON();
    if (currentTime < expiresAt)
        return false;
    else
        return true;
}

function getCoockies() {

    console.log('==================== getCoockies =================')
    var retToken = ''
    axios.get('http://localhost:8080/server/api').then(response => {
        dspaceXsrfToken = response.headers['dspace-xsrf-token']
      //  return response.headers['dspace-xsrf-token'];
    })
   // return retToken;
    console.log(dspaceXsrfToken)
}

function getXsrfToken() {
  //  console.log('get XSRF-TOKEN')
    let returnValue
    axios.get('http://localhost:8080/server/api',dsConfig).then(response => {
        returnValue = response.headers['dspace-xsrf-token'];
    })
    return returnValue
}

function isDSpaceLogin() {
    console.log('DSpace 7.2')
    let dsConfig = {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlaWQiOiJiYjY4MWFjMC0yYTczLTQ2MGYtYTgwZC0xNDA1YmE4OTBiODUiLCJzZyI6W10sImF1dGhlbnRpY2F0aW9uTWV0aG9kIjoicGFzc3dvcmQiLCJleHAiOjE3MDczODE4Mzh9.pO_FYVp8DPgXN2ghbcf4gIx0Es0nRAhunCEh5oh809A',
            'X-XSRF-TOKEN': dspaceXsrfToken
        }
    }
    var isAuthenticated = false
    axios.get('http://localhost:8080/server/api/authn/status', dsConfig).then(response => {
        //  console.log('==================== isDSpaceLogin =================')
        //  console.log(response.data)
        isAuthenticated = response.data.authenticated
    })
    return isAuthenticated
}

function getUserAccount() {
    var res = '';
    axios.post('https://odk.aphi.gov.et/v1/sessions', {
        email: "andualem15@gmail.com",
        password: "p@$$w0rd@aphi"
    }).then(response => {
        res = response.data;
        authenticationData = response.data;
        yourJWTToken = authenticationData.token;
        expiresAt = authenticationData.expiresAt;
        yourConfig = {
            headers: {
                Authorization: "Bearer " + yourJWTToken
            }
        }
        return res;
        //return yourConfig
        //  console.log('Authenticated' + JSON.stringify(authenticationData))
        //  jsonObj = JSON.parse(JSON.stringify(authenticationData));
        // yourJWTToken = jsonObj.map(function(x) {return x.token});

    }).then(resp =>{
        return resp.data
    })
    /*   .catch(error => {
          res.json(error)
      }) */
}

function getProjects() {
    let endpoint = 'https://odk.aphi.gov.et/v1/projects'

    axios.get(endpoint, yourConfig)
        .then(response => {
            projects = response.data
        })
}


app.listen(3000)