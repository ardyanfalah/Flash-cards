// inisiasi plugin
const express = require (`express`)
const  app = express()

app.use(`/public`,express.static(`public`))

const bodyParser = require (`body-parser`)
const cookieParser= require (`cookie-parser`)

const mainRoutes = require(`./routes/index.js`)
const cardsRoute = require(`./routes/cards.js`)

//inisiasi port
const port = 14052

//manggil fungsi untuk baca url dan cookie
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

//masang mesin template pug
app.set(`view engine`,`pug`)

app.use(mainRoutes)
app.use(`/cards`,cardsRoute)

app.use((req,res,next)=>{
    res.locals.username=req.cookies.username
    let error = new Error("error lah!")
    error.status=404
    next (error)
})


app.use((err,req,res,next)=>{
    res.locals.status = err.status
    res.locals.errorMessage = err.message
    res.render(`error`)
    // res.send(`error error!balik lagi sana`)
})

app.listen(port,() => {
    console.log("dah nyala")
})

