const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const versionCrud = '/crud/c1'
let randomProfile = require('random-profile-generator');
const users =[]
for (let index = 0; index < 10; index++) {
    users.push({
        nom:randomProfile.name(),
        email:randomProfile.email(),
    })
    
}

console.log(users)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get(`${versionCrud}/users`,(req,res)=>{
    res.json({
        data:users
    })
})

app.get(`${versionCrud}/users/:id`,(req,res)=>{
    const id =req.params.id-1;
    res.json({
        data:users[id] || undefined
    })
})
app.post(`${versionCrud}/users`,(req,res)=>{
    const data = req.body;
    users.push(data)
    res.json({
        index:users.length,
        data:users[users.length - 1]
    })
})

app.listen(3000,()=>{
    console.log("connecter")
})