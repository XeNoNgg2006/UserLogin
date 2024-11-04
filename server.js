const express = require('express')
const app = express()
const bcrypt = require("bcrypt")

const users = []


app.set("view-engine","ejs")
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('index.ejs', {name: 'Kyle'})
})

app.get("/login", (req,res) => {
    res.render('login.ejs')
})

app.post("/login", (req, res) => {

})

app.get("/register", (req,res) => {
    res.render('register.ejs')
})

app.post("/register", async (req, res) =>{
    try { // try and catch=> 
                //try= tries a piece of code which might throw an error 
                     //(ex. here= no name(only worked if the name wasnt required by form)
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // takes the inputed password and encrypts it
        users.push( {
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect("/login")
    } catch { // catch = what to do if the code throws an error
        res.redirect("/register")
    }
    console.log(users)
})


app.listen(3000)