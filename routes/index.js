const express = require(`express`)
const router = express.Router()



//proses fungsi yang di trigger lewat index.pug
router.get(`/`,(req, res)=>{
    
    //cek ada cookie atau tidak,jika tidak redirect ke helo.pug
    if (req.cookies.username == null){
        res.redirect("/helo")
    }
    
    //ambil cookie dan simpan di locals
    res.locals.username = req.cookies.username
    //render index dengan variable yang ada
    res.render("index")
})

//proses fungsi yang di trigger lewat helo.pug
router.get(`/helo`,(req, res)=>{
    if(req.cookies.username != null){
        res.redirect('/')
    }
    else{
    console.log(req.cookies)
    res.render("helo")}
})

//proses post lewat tombol submit
router.post(`/helo`,(req, res)=>{
    // res.json(req.body)
//    res.locals.username=req.body.username
    res.locals = req.body
    res.cookie("username",req.body.username)
    res.redirect("/")
    // res.send(req.body.username)
    // res.redirect("/")
    // res.send("keluar....")
})

router.post(`/`,(req, res)=>{
    console.log("masuk")
    res.clearCookie("username")
    res.redirect("/helo")
})



router.get("/makasihloh",(req,res,next)=>{
    console.log("one")
    next()
})
router.get("/makasihloh",(req,res,next)=>{
    console.log("two")
    res.send("muke gile")
})

module.exports = router